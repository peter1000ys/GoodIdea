from transformers import AutoTokenizer, AutoModel
import torch
from openai import OpenAI
from datetime import datetime, timedelta
from fastapi import HTTPException

# KcElectra 모델 로드
tokenizer = AutoTokenizer.from_pretrained("beomi/KcELECTRA-base-v2022")
model = AutoModel.from_pretrained("beomi/KcELECTRA-base-v2022")

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
    client = OpenAI(
        api_key = OPEN_AI_KEY
    )

    # 프롬프트 구성
    prompt = f"""
    You are an AI assistant that drafts a comprehensive project proposal summary in JSON format. For each section below, provide a summary in 1 to 3 full sentences that explains the purpose and key elements of the project. Ensure that each section contains meaningful content based on the provided keywords and must not be left empty. 

    Avoid repeating keywords as they are provided and focus on crafting a natural, informative summary. Please return the response in the following JSON format:

    {{
        "background": "1~3 sentence summary for background",
        "service_intro": "1~3 sentence summary for service introduction",
        "target_users": "1~3 sentence summary for target users",
        "expected_effects": "1~3 sentence summary for expected effects"
    }}

    Details for each section:

    1. **Background**: 
       - Describe the context and motivation behind this project, focusing on why this service is needed.
       - Relate the project’s background to the main purpose described in the service introduction, explaining why this service was created to address the issues at hand.

    2. **Service Introduction**: 
       - Provide a brief overview of the service offered by this project. Explain the primary goals and key features of the service, such as {", ".join(payload["service_intro"])}.
       - Describe how each main service feature contributes to the overall goals of the project without repeating the keywords.

    3. **Target Users**: 
       - Define the primary users of this service and describe how it will benefit each user group, specifically mentioning groups like {", ".join(payload["target_users"])}.
       - Ensure each target user group is explained in terms of the project’s objectives and potential benefits for them.

    4. **Expected Effects**: 
       - Summarize the expected positive outcomes or impacts of this project, explaining any specific improvements, awareness, or behaviors that the project aims to foster.
       - Each effect should directly relate to the benefits for the target users and broader societal impact, without merely listing keywords.

    Provide answers in JSON format and in Korean, ensuring each section is concise yet descriptive for direct inclusion in a professional project proposal document.
    """


    # OpenAI API 호출 (ChatCompletion 사용)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an AI assistant that drafts concise project proposal summaries. Each section (Background, Service Introduction, Target Users, Expected Effects) must be filled out with meaningful content."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
    )
    
    # 응답 텍스트를 분리하여 딕셔너리 형태로 반환
    text_response = response.choices[0].message.content.strip()

    try:
        response_dict = eval(text_response)  # JSON 문자열을 딕셔너리로 변환
    except SyntaxError:
        response_dict = {"background": "", "service_intro": "", "target_users": "", "expected_effects": ""}

    return response_dict
    