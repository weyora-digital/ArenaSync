from flask import current_app
from ..models.neo_models import Player, Game

def get_all_games():
    games = Game.nodes.all()
    return [{"gameId": g.gameId, "gameName": g.game} for g in games]


    
def get_next_game_id():
    max_game = Game.nodes.order_by('-gameId').first()
    return (max_game.gameId if max_game else 0) + 1

def add_game(game_name, genre):
    game_id = get_next_game_id()

    # Create and save the game node
    game = Game(gameId=game_id, game=game_name, genre=genre)
    game.save()

    return {
        "gameId": game.gameId,
        "game": game.game,
        "genre": game.genre
    }
