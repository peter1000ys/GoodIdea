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
            "term": {
                "token": token  # token.keyword 사용 필요 시 변경
            }
        }
    }
    existing_docs = es.search(index="news-token", body=search_query)
    found_similar = False  # 중복 여부를 추적하기 위한 플래그
    # 기존 벡터들과 중복 확인
    for doc in existing_docs["hits"]["hits"]:
        doc_id = doc["_id"]
        existing_embedding = doc["_source"]["embedding_vector"]
        
        # 코사인 유사도 계산
        similarity = 1 - cosine(existing_embedding, new_embedding)
        
        # 유사도 검사 및 출력
        print(f"Checking similarity for '{token}':", similarity)
        
        # 유사도가 높으면 count 증가
        if similarity >= 0.99:
            print(f"'{token}' has similar embedding with similarity {similarity}, updating count.")
            es.update(
                index="news-token",
                id=doc_id,
                body={
                    "script": {
                        "source": "ctx._source.count += 1",  # count를 +1 증가
                        "lang": "painless"
                    }
                }
            )
            found_similar = True
            break  # 중복이 확인되면 저장 작업을 중단

    # 새로운 문서 저장 (중복이 없는 경우에만)
    if not found_similar:
        doc_id = str(uuid.uuid4())
        es.index(
            index="news-token",
            id=doc_id,
            body={
                "token": token,
                "embedding_vector": new_embedding,
                "count": 1  # 새로운 문서의 count 초기값을 1로 설정
            }
        )
        print(f"'{token}' saved with new embedding and count 1.")
    else:
        print(f"'{token}' was not saved due to similarity with existing documents.")

# KNN 검색 로직
def knn_search(keyword, es):
    keyword_embedding = generate_embedding(keyword)
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
    response = es.search(index="news-token", body=knn_query)
    recommended_tokens = []
    for hit in response["hits"]["hits"]:
        tokens = hit["_source"]["tokens"]
        recommended_tokens.extend(tokens)
    return list(set(recommended_tokens))[:10]  # 중복 제거 후 상위 10개 추천