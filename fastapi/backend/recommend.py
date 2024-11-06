from transformers import AutoTokenizer, AutoModel
import torch
from elasticsearch import Elasticsearch

# KcElectra 모델 로드
tokenizer = AutoTokenizer.from_pretrained("beomi/KcELECTRA-base-v2022")
model = AutoModel.from_pretrained("beomi/KcELECTRA-base-v2022")

# 임베딩 생성 함수
def generate_embedding(text):
    inputs = tokenizer(text, return_tensors="pt")
    print("text is ", text,"\ninputs is ", inputs)
    with torch.no_grad():
        outputs = model(**inputs)
        embedding = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    return embedding

# 임베딩을 Elasticsearch에 업데이트
def update_embedding_in_es(doc_id, embeddings, es):
    es.update(index="news-topic", id=doc_id, body={"doc": {"tokens_embedding": embeddings}})

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