from fastapi import FastAPI, HTTPException
from utils import get_avg_loan_data
from pydantic import BaseModel
from KMeansService import KMeansService
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
kmeans_service = KMeansService()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 새로운 사용자 입력값 모델
class NewUserModel(BaseModel):
    deposit_ratio: float
    savings_ratio: float
    stock_ratio: float

# 대출 평균 Response
@app.get("/api/v1/avg_loan")
async def get_avg_loan():
    try:
        # 대출 이율 평균을 계산하는 함수 호출
        data = get_avg_loan_data(kmeans_service.get_spark_session())
        return data
    except Exception as e:
        return {"error": str(e)}

# K-Means 학습
@app.post("/api/v1/kmeans/train")
async def train_kmeans():
    try:
        result = kmeans_service.train_kmeans_model_from_hdfs()
        return {"message": result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 새로운 사용자 클러스터 예측 및 추천 엔드포인트
@app.post("/api/v1/recommend")
async def predict_cluster(new_user: NewUserModel):
    try:
        # 클러스터 예측
        cluster_id = kmeans_service.predict_cluster(new_user.deposit_ratio, new_user.savings_ratio, new_user.stock_ratio)
        
        # 클러스터에 따른 추천
        recommendations = kmeans_service.recommend_products(cluster_id)
        
        return {"cluster_id": cluster_id, "recommend": recommendations}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))