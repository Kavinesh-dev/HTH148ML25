from pydantic import BaseModel
from typing import Optional


class PredictionCreate(BaseModel):
    machine_id: int
    anomaly_status: str
    risk_level: str
    prediction: str
    failure_probability: Optional[float] = None


class PredictionResponse(BaseModel):
    id: int
    machine_id: int
    machine_data_id: Optional[int] = None
    anomaly_status: str
    risk_level: str
    prediction: str
    failure_probability: Optional[float] = None

    class Config:
        from_attributes = True
