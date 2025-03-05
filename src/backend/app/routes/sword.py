from fastapi import APIRouter, HTTPException
from models.model import EmailData, analyze_email

router = APIRouter()

@router.post("/")
def analyze_email_endpoint(email: EmailData):
    """Route handler for email analysis endpoint."""
    try:
        return analyze_email(email)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
