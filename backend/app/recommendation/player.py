from flask import current_app

def add_player(player_id, first_name, last_name):
    query = """
    CREATE (p:Player {playerId: $playerId, firstName: $firstName, lastName: $lastName})
    RETURN p
    """
    
    neo4j_helper = current_app.neo4j_helper  # Access neo4j_helper from the app context

    # Run the query to add the player
    result = neo4j_helper.query(query, parameters={
        'playerId': player_id,
        'firstName': first_name,
        'lastName': last_name
    })

    # Extract the result and return the new player info
    if result:
        rec = result[0]['p']
        new_player = {
            "playerId": rec['playerId'],
            "firstName": rec['firstName'],
            "lastName": rec['lastName']
        }
        return new_player
    else:
        return None  # Handle case where no player is created

        
    
def add_player_relationships(player_id, games):
    query = """
    MATCH (p:Player {playerId: $playerId})
    UNWIND $games AS game
    MATCH (g:Game {gameId: game})
    MERGE (p)-[r:PLAYS]->(g)
    SET r.hoursPlayed = 0, 
        r.recommendation = 'low', 
        r.status = 'offline', 
        r.ranking = 1
    RETURN p, r, g
    """

    neo4j_helper = current_app.neo4j_helper  # Access neo4j_helper from the app context

    relationships = []

    # Run the query to add player relationships with the provided games
    result = neo4j_helper.query(query, parameters={'playerId': player_id, 'games': games})

    # Process the result and build the relationships list
    for record in result:
        player_node = record['p']
        relationship = record['r']
        game_node = record['g']

        relationships.append({
            "playerID": player_node['playerId'],
            "gameId": game_node['gameId'],
            "relationship": {
                "hoursPlayed": relationship['hoursPlayed'],
                "recommendation": relationship['recommendation'],
                "status": relationship['status'],
                "ranking": relationship['ranking']
            }
        })

    return relationships