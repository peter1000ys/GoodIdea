from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from github import Github, GithubException
import asyncio
from dotenv import load_dotenv
import os
import httpx
from pathlib import Path

app = FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)
GITHUB_ACCESS_TOKEN = os.getenv("GITHUB_ACCESS_TOKEN")

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