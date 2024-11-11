from transformers import AutoTokenizer, AutoModel
import torch
import openai
from datetime import datetime, timedelta
from fastapi import HTTPException

# KcElectra 모델 로드
tokenizer = AutoTokenizer.from_pretrained("beomi/KcELECTRA-base-v2022")
model = AutoModel.from_pretrained("beomi/KcELECTRA-base-v2022")

PROMPT_TEMPLATE = """
You are an AI assistant that helps in drafting a project proposal. Based on the provided information, write a concise and relevant summary for each section in 1 to 3 sentences.

- Background: {background}
- Service Introduction: {service_intro}
- Target Users: {target_users}
- Expected Effects: {expected_effects}

Please provide answers in Korean, and ensure each response is brief and to the point for easy incorporation into a proposal document.
"""

# 단어 임베딩 벡터 생성 함수
def generate_embedding(token):
    if not isinstance(token, str):
        token = str(token)

    inputs = tokenizer(token, return_tensors="pt", add_special_tokens=True)
    with torch.no_grad():
        outputs = model(**inputs)
        embedding = outputs.last_hidden_state[:, 0, :].squeeze().numpy()
    return embedding.tolist()

def hybrid_search(keyword, es, alpha=0.85):
    keyword_embedding = generate_embedding(f"{keyword}")
    
    knn_query = {
        "size": 50,  # 상위 50개 후보군 (임베딩 유사도 기반 검색)
        "query": {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'embedding_vector') + 1.0",
                    "params": {"query_vector": keyword_embedding}
                }
            }
        }
    }
    response = es.search(index="news-token", body=knn_query)
    recommended_tokens = []
    max_count = max(hit["_source"]["count"] for hit in response["hits"]["hits"])

    for hit in response["hits"]["hits"]:
        token = hit["_source"]["token"]
        
        # keyword와 동일한 단어는 제외
        if token == keyword:
            continue
        
        similarity_score = hit["_score"] - 1.0 
        
        # 빈도수 점수 계산 및 정규화
        count = hit["_source"]["count"]
        frequency_score = count / max_count if max_count > 0 else 0  # 빈도수 점수를 0과 1 사이로 정규화
        
        # 결합 점수 계산
        combined_score = alpha * similarity_score + (1 - alpha) * frequency_score
        recommended_tokens.append((token, combined_score))

    # 결합 점수로 정렬하여 상위 10개 추천
    recommended_tokens = sorted(recommended_tokens, key=lambda x: x[1], reverse=True)[:10]
    unique_recommended_tokens = list(dict.fromkeys([token for token, _ in recommended_tokens]))

    return unique_recommended_tokens[:10]  # 상위 10개의 유니크한 추천 결과 반환


def get_top_tokens_last_7_days(es):
    # 현재 시간 기준으로 7일 전 날짜 계산
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)

    query = {
            "size": 0,  # 문서 자체는 가져오지 않고 집계 결과만 필요
            "query": {
                "bool": {
                    "filter": [
                        {
                            "range": {
                                "date": {
                                    "gte": start_date.strftime("%Y%m%d"),
                                    "lte": end_date.strftime("%Y%m%d")
                                }
                            }
                        }
                    ]
                }
            },
            "aggs": {
                "top_tokens": {
                    "terms": {
                        "field": "tokens",   # 배열 내 개별 단어를 집계 대상으로 설정
                        "size": 10,         # 상위 n개 단어
                        "order": {"_count": "desc"} # 빈도수 기준 정렬
                    }
                }
            }
        }
    
    # Elasticsearch 검색 실행
    response = es.search(index="news-topic", body=query)
    # print(response)
    
    # 상위 토큰 추출
    top_tokens = [bucket["key"] for bucket in response["aggregations"]["top_tokens"]["buckets"]]
    
    return top_tokens

def createAIPlanner(OPEN_AI_KEY, payload):

    # OpenAI API 키 설정
    openai.api_key = OPEN_AI_KEY

    # 프롬프트 구성
    prompt = PROMPT_TEMPLATE.format(
        background=", ".join(payload.background),
        service_intro=", ".join(payload.service_intro),
        target_users=", ".join(payload.target_users),
        expected_effects=", ".join(payload.expected_effects)
    )

    # OpenAI API 호출
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an AI assistant that drafts concise project proposal summaries."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7,
        )
        return response.choices[0].text.strip()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI 응답 생성 중 오류 발생: {e}")