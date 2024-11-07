from transformers import AutoTokenizer, AutoModel
import uuid
from scipy.spatial.distance import cosine
import torch
from elasticsearch import Elasticsearch

# KcElectra 모델 로드
tokenizer = AutoTokenizer.from_pretrained("beomi/KcELECTRA-base-v2022")
model = AutoModel.from_pretrained("beomi/KcELECTRA-base-v2022")

# 단어 임베딩 벡터 생성 함수
def generate_embedding(token):
    # 미리 토큰화된 단어를 ID 배열로 변환하여 모델에 입력
    inputs = tokenizer(token, return_tensors="pt", add_special_tokens=True)
    with torch.no_grad():
        outputs = model(**inputs)
        # [CLS] 벡터로 단어 임베딩을 가져옴
        embedding = outputs.last_hidden_state[:, 0, :].squeeze().numpy()
    return embedding.tolist()

# 임베딩을 Elasticsearch에 업데이트
def save_token(token, es):
    new_embedding = generate_embedding(token)
    
    # 기존 임베딩 벡터 조회
    search_query = {
        "query": {
            "term": {"token.keyword": token}
        }
    }
    existing_docs = es.search(index="news-topic", body=search_query)
    
    # 기존 벡터들과 중복 확인
    for doc in existing_docs["hits"]["hits"]:
        existing_embedding = doc["_source"]["embedding_vector"]
        # 코사인 유사도 계산
        similarity = 1 - cosine(existing_embedding, new_embedding)
        if similarity > 0.99:
            print(f"'{token}' has similar embedding, not saving.")
            return  # 유사도가 높으면 저장하지 않음
    
    # 고유 ID로 새 문서 저장
    doc_id = str(uuid.uuid4())
    es.index(
        index="news-topic",
        id=doc_id,
        body={
            "token": token,
            "embedding_vector": new_embedding
        }
    )

# KNN 검색 로직
def knn_search(keyword_embedding, es):
    knn_query = {
        "size": 10,
        "query": {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'tokens_embedding') + 1.0",
                    "params": {"query_vector": keyword_embedding}
                }
            }
        }
    }
    response = es.search(index="news-topic", body=knn_query)
    recommended_tokens = []
    for hit in response["hits"]["hits"]:
        tokens = hit["_source"]["tokens"]
        recommended_tokens.extend(tokens)
    return list(set(recommended_tokens))[:10]  # 중복 제거 후 상위 10개 추천