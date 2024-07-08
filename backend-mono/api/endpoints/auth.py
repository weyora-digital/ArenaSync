from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...dependencies import get_db
from ... import crud, schemas, core

router = APIRouter()

@router.post("/register", response_model=schemas.UserDisplay)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if not db_user or not core.security.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"message": "Login successful", "username": db_user.username, "is_admin": db_user.is_admin}
