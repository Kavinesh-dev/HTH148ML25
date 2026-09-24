from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.database.models import Machine
from app.schemas.machine import MachineCreate, MachineResponse


router = APIRouter(
    prefix="/machines",
    tags=["Machines"]
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=MachineResponse)
def create_machine(
    machine: MachineCreate,
    db: Session = Depends(get_db)
):
    new_machine = Machine(
        machine_name=machine.machine_name,
        machine_type=machine.machine_type,
        location=machine.location,
        status=machine.status,
        machine_age=machine.machine_age,
        previous_failures=machine.previous_failures,
    )

    db.add(new_machine)
    db.commit()
    db.refresh(new_machine)

    return new_machine


@router.get("/", response_model=list[MachineResponse])
def get_machines(
    db: Session = Depends(get_db)
):
    machines = db.query(Machine).all()

    return machines


@router.get("/{machine_id}", response_model=MachineResponse)
def get_machine(
    machine_id: int,
    db: Session = Depends(get_db)
):
    machine = db.query(Machine).filter(Machine.id == machine_id).first()

    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")

    return machine