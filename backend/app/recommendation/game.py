from flask import current_app

def getGame():
    query = "MATCH (g:Game) RETURN count(g)"
    neo4j_helper = current_app.neo4j_helper
    result = neo4j_helper.query(query)
    return result[0]['count(g)']

    
def get_next_game_id():
    query = """
    MATCH (g:Game)
    RETURN MAX(g.gameId) AS maxId
    """
    neo4j_helper = current_app.neo4j_helper
    result = neo4j_helper.query(query)
    max_id = result.single().get("maxId")
    return (max_id or 0) + 1

def add_game(game_name, genre):
    query = """
    CREATE (g:Game {gameId: $gameId, game: $gameName, genre: $genre})
    RETURN g
    """
    
    
    game_id = get_next_game_id()
    neo4j_helper = current_app.neo4j_helper
    
    result = neo4j_helper.query(query, gameId=game_id, gameName=game_name, genre=genre)
    
    game_node = result[0]['g']
    return {
        "gameId": game_node["gameId"],
        "game": game_node["game"],
        "genre": game_node["genre"]
    }