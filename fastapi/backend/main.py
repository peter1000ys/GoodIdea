from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from github import Github, GithubException
import asyncio
from confluent_kafka import Producer, KafkaError
from dotenv import load_dotenv
import os
import httpx
from pathlib import Path
import requests
import json
from typing import Any, Dict, List

app = FastAPI()
origins = [
    "*"
]

# Kafka 설정
KAFKA_BROKER_URL = "Kafka00Service:9092"  # Kafka 브로커 URL
TOPICS = ["test_topic_1", "test_topic_2", "test_topic_3"]

# Kafka Producer 생성
conf = {'bootstrap.servers': KAFKA_BROKER_URL}
producer = Producer(conf)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# .env 불러오기
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)
GITHUB_ACCESS_TOKEN = os.getenv("GITHUB_ACCESS_TOKEN")

# Naver API 접근 설정
NAVER_API_ID = os.getenv("NAVER_API_ID")
NAVER_API_SECRET = os.getenv("NAVER_API_SECRET")

@app.get("/api/v1/hello")
async def read_root():
    return {"message": GITHUB_ACCESS_TOKEN}

@app.get("/api/v1/search")
async def search(keyword: str = Query(..., description="검색에 사용할 단일 키워드 입력")):
    # 'ssafy'와 '싸피' 각각을 포함하는 두 개의 쿼리 생성
    query_ssafy = f"{keyword} ssafy in:name,description NOT 알고리즘 NOT 스터디 NOT study NOT 특강"
    query_싸피 = f"{keyword} 싸피 in:name,description NOT 알고리즘 NOT 스터디 NOT study"

    try:
        g = Github(GITHUB_ACCESS_TOKEN)

        # 두 쿼리를 각각 검색하여 결과를 병합
        repos_ssafy = g.search_repositories(query=query_ssafy)
        repos_싸피 = g.search_repositories(query=query_싸피)

        results = []
        tasks = []

        async with httpx.AsyncClient() as client:
            # 첫 번째 쿼리 결과 처리
            if repos_ssafy.totalCount > 0:
                for repo in repos_ssafy:  # 최대 15개의 결과만 처리
                    tasks.append(fetch_repo_info(client, repo))

            # 두 번째 쿼리 결과 처리
            if repos_싸피.totalCount > 0:
                for repo in repos_싸피:  # 최대 15개의 결과만 처리
                    tasks.append(fetch_repo_info(client, repo))

            results = await asyncio.gather(*tasks)

        total_count = len(results)  # 최종 병합된 결과 수 계산

        return {"total_count": total_count, "repositories": results}

    except GithubException as e:
        return {"error": f"Failed to fetch data from GitHub: {e}"}

async def fetch_repo_info(client, repo):
    return {
        'name': repo.name,
        'full_name': repo.full_name,
        'html_url': repo.html_url,
        'description': repo.description,
        'language': repo.language,
        'stargazers_count': repo.stargazers_count,
        'forks_count': repo.forks_count,
    }

# Kafka 메시지 전송 함수
async def send_message(topic: str, message: Dict[str, Any]) -> Dict[str, Any]:
    def delivery_report(err, msg):
        if err is not None:
            raise HTTPException(status_code=500, detail=f"Kafka Error: {str(err)}")

    # 메시지 비동기 전송
    producer.produce(topic, json.dumps(message).encode("utf-8"), callback=delivery_report)
    producer.flush()  # 모든 메시지가 전송될 때까지 대기
    return {"topic": topic, "message": message}

# /kafka/test 엔드포인트
@app.post("/api/v1/kafka/test")
async def send_messages_to_kafka() -> Dict[str, Any]:
    results = {}
    for topic in TOPICS:
        results[topic] = []
        for i in range(1, 11):
            message = {"message_number": i, "content": f"This is message {i} for {topic}"}
            try:
                result = await send_message(topic, message)
                results[topic].append(result)
            except KafkaError as e:
                raise HTTPException(status_code=500, detail=f"Kafka Error: {str(e)}")
    return {"status": "Messages sent successfully", "results": results}

@app.get("/api/v1/news")
async def get_news(query: str = Query(..., description="검색할 키워드를 입력하세요")) -> Any:
    url = f"https://openapi.naver.com/v1/search/news.json?query={query}&sort=sim&display=40"
    headers = {
        "X-Naver-Client-Id": NAVER_API_ID,
        "X-Naver-Client-Secret": NAVER_API_SECRET
    }
    # Naver API에 요청
    response = requests.get(url, headers=headers)
    
    # 요청이 성공적이지 않은 경우 예외 처리
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Naver API 요청 실패")

    # JSON 형태로 결과 반환
    return response.json()