from pydantic import BaseModel


class MachineCreate(BaseModel):
    machine_name: str
    machine_type: str
    location: str
    status: str = "Active"
    machine_age: int = 0
    previous_failures: int = 0


class MachineResponse(BaseModel):
    id: int
    machine_name: str
    machine_type: str
    location: str
    status: str
    machine_age: int
    previous_failures: int

    class Config:
        from_attributes = True
