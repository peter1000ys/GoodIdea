import os
import re
import time
import requests
import json
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from konlpy.tag import Okt
from kafka_producer import send_to_kafka

# 기본 설정
target_date = (datetime.now() - timedelta(days=1)).strftime("%Y%m%d")
base_url = "https://news.daum.net/breakingnews/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
}

# JSON 파일 저장 경로 설정
save_dir = os.path.expanduser("~/news_data")
os.makedirs(save_dir, exist_ok=True)

# 불용어 로드
def load_stopwords():
    response = requests.get("https://raw.githubusercontent.com/stopwords-iso/stopwords-ko/master/stopwords-ko.txt")
    return set(response.text.splitlines())

okt = Okt()
stopwords = load_stopwords()

def extract_meaningful_tokens(text):
    tokens = [word for word, pos in okt.pos(text) if pos == "Noun" and word not in stopwords and len(word) > 1 and word not in ["포토", "사진", "종합"] ]
    return tokens

def get_last_page():
    response = requests.get(base_url, params={"page": 10000, "regDate": target_date}, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    last_page_tag = soup.select_one("span.inner_paging em.num_page")
    
    if last_page_tag:
        last_page_number = re.search(r'\d+', last_page_tag.text)
        return int(last_page_number.group()) if last_page_number else 1
    else:
        return 1

def get_article_links(page):
    print(f"{page} 페이지에서 기사 링크 수집 중...")
    response = requests.get(base_url, params={"page": page, "regDate": target_date}, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    article_tags = soup.select("ul.list_news2.list_allnews li a.link_txt")
    return [tag["href"] for tag in article_tags]

def get_article_content(url):
    print(f"기사 URL {url}에서 내용 수집 중...")
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    title_tag = soup.select_one("h3.tit_view")
    title = title_tag.text if title_tag else "제목 없음"
    
    if re.match(r'^[a-zA-Z\s]*$', title_tag.text):
        print("영문으로만 이루어진 기사 - 필터링")
        return None

    tokens = extract_meaningful_tokens(title)
    return {"title": title, "tokens": tokens}

def crawl_daum_news():
    last_page = get_last_page()
    print(f"총 {last_page} 페이지까지 크롤링을 진행합니다.")
    articles = []
    
    for page in range(1, last_page + 1, max(1, last_page // 200)):
        print(f"==== {page} 페이지 크롤링 시작 ====")
        article_links = get_article_links(page)
        
        for url in article_links:
            article = get_article_content(url)
            if article:
                send_to_kafka(article)  # Kafka에 데이터 전송
                articles.append(article)
        
        print(f"==== {page} 페이지 크롤링 완료 ====")
        time.sleep(1)
    
    output_path = os.path.join(save_dir, f"news_{target_date}.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=4)
    
    print("크롤링 및 JSON 저장 완료")
    return articles