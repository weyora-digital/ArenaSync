from flask import current_app

def get_all_games():
    query = """
    MATCH (g:Game)
    RETURN g.gameId AS gameId, g.game AS gameName
    """
    
    neo4j_helper = current_app.neo4j_helper  # Use the neo4j_helper from the Flask app context

    games = []
    
    # Run the query using neo4j_helper
    result = neo4j_helper.query(query)
    
    # Process the result to build the list of games
    for record in result:
        games.append({
            "gameId": record["gameId"],
            "gameName": record["gameName"]
        })
    
    return games
