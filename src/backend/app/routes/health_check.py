from fastapi import APIRouter
from models.model import check_model_health

router = APIRouter()

@router.get("/")
def health_check():
    """Route handler for health check endpoint."""
    return check_model_health()