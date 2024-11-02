from flask import Blueprint, jsonify, request
from ..recommendation.neo4j_connection import get_connection
from ..utils.neo4j_helper import Neo4jHelper
from ..models.neo_models import Player, Game

import json
from ..recommendation import game
from ..recommendation import filtering
from ..recommendation import match_make
from ..recommendation import get_games
from ..recommendation import player
from neomodel.exceptions import DoesNotExist

# Define a blueprint for recommendation routes
recommendation_blueprint = Blueprint('recommendation', __name__)

driver = get_connection()

@recommendation_blueprint.route('/')
def test():
    response = 'successful!'
    return response

# @recommendation_blueprint.route('/getGames')
# def get_data():
#     data = {'game_count': game.getGame()}
#     response = jsonify(data)
#     return response

@recommendation_blueprint.route('/addgame', methods=['POST'])
def add_game_route():
    data = request.get_json()

    game_name = data.get('game')  
    genre = data.get('genre')  

    if not game_name or not genre:
        return jsonify({'error': 'Missing parameter'}), 400

    new_game = game.add_game(game_name, genre)

    return jsonify(new_game), 201  


@recommendation_blueprint.route('/getRecommendation')
def get_recommendation():
    player_id = request.args.get('player_id', type=int)

    if not player_id:
        return jsonify({'error': 'invalid player id'}, 400)

    recommendation = filtering.collaborative_filtering(1, 10, player_id)
    return jsonify(recommendation)

@recommendation_blueprint.route('/matchmake')
def find_team():
    player_id = request.args.get('player_id', type=int)
    num_players = request.args.get('num_players', type=int)

    if player_id is None or num_players is None:
        return jsonify({"error":"Missing query parameters"}), 400

    closest_players = match_make.find_closest_ranked_players(player_id, num_players)
    return jsonify(closest_players)

@recommendation_blueprint.route('/addplayer', methods=['POST'])
def create_player():
    player_id = request.args.get('player_id', type=int)
    # first_name = request.args.get('first_name', type=str)
    # last_name = request.args.get('last_name', type=str)

    if not player_id:
        return jsonify({"error":"Missing player data"}), 400

    new_player = player.add_player(player_id)
    return jsonify(new_player), 201

@recommendation_blueprint.route('/addrelationship', methods=['POST'])
def add_relation():
    player_id = request.args.get('player_id', type=int)
    games = request.args.get('games')

    if not player_id or not games:
        return jsonify({"error":"Missing relationship details"}), 400

    try:
        games = [int(game_id) for game_id in games.split(',')]
    except ValueError:
        return jsonify({"error": "Invalid game IDs"}), 400

    relationships = player.add_player_relationships( player_id, games)
    return jsonify(relationships), 201

# @recommendation_blueprint.route('/getrelationship', methods=['GET'])
# def get_relationship():
#     player_id = request.args.get('player_id', type=int)

#     if not player_id:
#         return jsonify({"error": "Missing player ID"}), 400

#     try:
#         relationships = player.get_player_relationships(player_id)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     return jsonify(relationships), 200

@recommendation_blueprint.route('/getrelationship', methods=['GET'])
def get_relationship():
    player_id = request.args.get('player_id', type=int)

    if not player_id:
        return jsonify({"error": "Missing player ID"}), 400

    try:
        # Get the relationships for the player
        relationships = player.get_player_relationships(player_id)
        
        # Prepare a list to store relationships with game details
        detailed_relationships = []

        # Loop through each relationship to fetch game details
        for relationship in relationships:
            game_id = relationship.get("gameId")

            # Fetch the game details (assuming `get_game_details` function exists)
            game_details = game.get_game_details(game_id)  # You may need to implement this function

            # Combine relationship and game details
            detailed_relationship = {
                "gameId": game_id,
                "playerId": relationship.get("playerId"),
                "game": game_details.get("game"),
                "genre": game_details.get("genre")
            }
            detailed_relationships.append(detailed_relationship)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(detailed_relationships), 200


@recommendation_blueprint.route('/getallgames')
def get_all_games():
    games = get_games.get_all_games()
    return jsonify(games)


@recommendation_blueprint.route('/deletegame/<int:game_id>', methods=['DELETE'])
def delete_game_route(game_id):
    try:
        # Find the game by gameId
        game = Game.nodes.get(gameId=game_id)
        game.delete()  # Delete the game node
        return jsonify({'message': 'Game deleted successfully'}), 200
    except DoesNotExist:
        return jsonify({'error': 'Game not found'}), 404
    
@recommendation_blueprint.route('/updategame/<int:game_id>', methods=['PUT'])
def update_game_route(game_id):
    data = request.get_json()

    game_name = data.get('game')  # Get the new game name from the request
    genre = data.get('genre')  # Get the new genre from the request

    if not game_name and not genre:
        return jsonify({'error': 'Missing parameter'}), 400

    try:
        # Find the game by gameId
        game = Game.nodes.get(gameId=game_id)
        
        # Update only the fields that were provided
        if game_name:
            game.game = game_name
        if genre:
            game.genre = genre

        game.save()  # Save the changes

        return jsonify({
            'gameId': game.gameId,
            'game': game.game,
            'genre': game.genre,
            'message': 'Game updated successfully'
        }), 200
    except DoesNotExist:
        return jsonify({'error': 'Game not found'}), 404
