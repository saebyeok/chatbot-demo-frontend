from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 정적 파일 서빙을 위해 '/static' 경로를 '/out' 폴더와 연결합니다.
app.mount("/", StaticFiles(directory="out", html=True), name="static")


# 필요한 경우, 다른 API 엔드포인트 추가
@app.get("/api/hello")
async def read_hello():
    return {"message": "Hello, World!"}
