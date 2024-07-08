from fastapi import FastAPI, Depends
from .schemas import TournamentCreate, Tournament
from .dependencies.permissions import get_tournament_creator
from .database import db_session

app = FastAPI()

@app.post("/tournaments/", response_model=Tournament)
def create_tournament(tournament: TournamentCreate, user=Depends(get_tournament_creator)):
    # Add tournament creation logic here
    pass

@app.get("/tournaments/{tournament_id}", response_model=Tournament)
def read_tournament(tournament_id: int):
    # Add tournament retrieval logic here
    pass
