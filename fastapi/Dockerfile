FROM python:3.8

RUN apt-get update && apt-get install -y \
    librdkafka-dev \
    && rm -rf /var/lib/apt/lists/*

# 사용자 및 작업 디렉토리 설정
RUN useradd -s /bin/bash -m ubuntu
WORKDIR /backend
COPY ./backend /backend
COPY ./requirements.txt .

# 패키지 설치를 ubuntu 사용자로 수행
RUN chown -R ubuntu:ubuntu /backend
USER ubuntu
RUN pip3 install --user -r requirements.txt

# 포트 노출
EXPOSE 8080
EXPOSE 11000

# FastAPI 서버 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
