from fastapi import FastAPI

app = FastAPI(
    title="Job Announcement CV Processor API",
    description="A minimal FastAPI backend for processing job announcements and CVs",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Announcement CV Processor API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}