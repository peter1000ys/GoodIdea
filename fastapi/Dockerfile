FROM python:3.8

RUN apt-get update && apt-get install -y \
    librdkafka-dev \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -s /bin/bash -m ubuntu

WORKDIR /backend
COPY ./backend /backend
COPY ./requirements.txt .
COPY .env .env
RUN chmod 644 .env
# ubuntu 사용자로 pip3 설치
RUN chown -R ubuntu:ubuntu /backend
USER ubuntu
RUN pip3 install --user -r requirements.txt

# 포트 노출
EXPOSE 8080
EXPOSE 11000

# FastAPI 서버 실행 명령어에 python -m uvicorn 사용
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]