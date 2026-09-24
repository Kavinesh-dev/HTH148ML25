from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AlertCreate(BaseModel):
    machine_id: int
    prediction_id: Optional[int] = None
    severity: str
    title: str
    message: str


class AlertUpdate(BaseModel):
    status: str  # Acknowledged / Resolved


class AlertResponse(BaseModel):
    id: int
    machine_id: int
    prediction_id: Optional[int] = None
    severity: str
    title: str
    message: str
    status: str
    created_at: datetime
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True
