from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import health_check, sword
import os

app = FastAPI(title="gpt4o-mini API Middleware", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #for now, it allows all domains to access api. change with sword domain in production. This is the parameter to allow access to API call
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"], #change to specific headers
)

#API routes
app.include_router(health_check.router, prefix="/health", tags=["Health Check"])
app.include_router(sword.router, prefix="/sword", tags=["SWORD Analysis"])

@app.get("/")
def root():
    return {"message": "API is ready"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))