from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MaintenanceCreate(BaseModel):
    machine_id: int
    alert_id: Optional[int] = None
    description: str
    priority: str = "Medium"
    scheduled_date: Optional[datetime] = None
    technician: Optional[str] = None
    cost: Optional[float] = None
    notes: Optional[str] = None


class MaintenanceUpdate(BaseModel):
    status: Optional[str] = None
    technician: Optional[str] = None
    completed_date: Optional[datetime] = None
    cost: Optional[float] = None
    notes: Optional[str] = None


class MaintenanceResponse(BaseModel):
    id: int
    machine_id: int
    alert_id: Optional[int] = None
    description: str
    priority: str
    status: str
    scheduled_date: Optional[datetime] = None
    completed_date: Optional[datetime] = None
    technician: Optional[str] = None
    cost: Optional[float] = None
    notes: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
