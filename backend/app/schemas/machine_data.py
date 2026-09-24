from pydantic import BaseModel


class MachineDataCreate(BaseModel):
    machine_id: int
    temperature: float
    vibration: float
    rpm: float
    pressure: float
    power: float
    current: float
    operating_hours: float


class MachineDataResponse(BaseModel):
    id: int
    machine_id: int
    temperature: float
    vibration: float
    rpm: float
    pressure: float
    power: float
    current: float
    operating_hours: float

    class Config:
        from_attributes = True
