from pyspark.sql import SparkSession
from pyspark.sql import functions as F
import time

# loan Data 평균
def get_avg_loan_data(spark):

    try:
        df = spark.read.parquet("hdfs://oracle1.mypjt.xyz:9000/user/ubuntu/loans")
        
        # loan_status가 'APPROVAL'인 행 필터링
        filtered_df = df.filter(df.loan_status == "APPROVAL")

        # loan_type별로 그룹화하고 평균값 계산
        average_df = filtered_df.groupBy("loan_type").agg(
            F.mean("loan_amount").alias("avg_loan_amount"),
            F.mean("loan_rate").alias("avg_loan_rate")
        )
        
        # 결과를 딕셔너리 형태로 변환하여 수집
        result = average_df.collect()  # 딕셔너리 변환 없이 수집
        result_dict = [row.asDict() for row in result]  # 수집한 데이터를 딕셔너리로 변환
        
        # 필요한 경우 딕셔너리 형태로 변환한 후 FastAPI에서 JSON으로 자동 변환
        return result_dict

    except Exception as e:
        raise RuntimeError(f"Error reading HDFS data: {str(e)}")