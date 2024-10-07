from flask import Blueprint, jsonify, request
from ..recommendation.neo4j_connection import get_connection

import json
from ..recommendation import game
from ..recommendation import filtering
from ..recommendation import match_make
from ..recommendation import get_games
from ..recommendation import player

# Define a blueprint for recommendation routes
recommendation_blueprint = Blueprint('recommendation', __name__)

driver = get_connection()

@recommendation_blueprint.route('/')
def test():
    response = 'successful!'
    return response

@recommendation_blueprint.route('/getGames')
def get_data():
    data = game.getGame(driver)
    response = jsonify(data)
    return response

@recommendation_blueprint.route('/addgame', methods=['POST'])
def add_game():
    game_name = request.args.get('game', type=str)
    genre = request.args.get('genre', type=str)

    if not game_name or not genre:
        return jsonify({'error': 'missing parameter'}), 400

    new_game = game.add_game(driver, game_name, genre)
    return jsonify(new_game)

@recommendation_blueprint.route('/getRecommendation')
def get_recommendation():
    player_id = request.args.get('player_id', type=int)

    if not player_id:
        return jsonify({'error': 'invalid player id'}, 400)

    recommendation = filtering.collaborative_filtering(driver, 1, 10, player_id)
    return jsonify(recommendation)

@recommendation_blueprint.route('/matchmake')
def find_team():
    player_id = request.args.get('player_id', type=int)
    num_players = request.args.get('num_players', type=int)

    if player_id is None or num_players is None:
        return jsonify({"error":"Missing query parameters"}), 400

    closest_players = match_make.find_closest_ranked_players(driver, player_id, num_players)
    return jsonify(closest_players)

@recommendation_blueprint.route('/addplayer', methods=['POST'])
def create_player():
    player_id = request.args.get('player_id', type=int)
    first_name = request.args.get('first_name', type=str)
    last_name = request.args.get('last_name', type=str)

    if not player_id or not first_name or not last_name:
        return jsonify({"error":"Missing player data"}), 400

    new_player = player.add_player(driver, player_id, first_name, last_name)
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

    relationships = player.add_player_relationships(driver, player_id, games)
    return jsonify(relationships), 201

@recommendation_blueprint.route('/getallgames')
def get_all_games():
    games = get_games.get_all_games(driver)
    return jsonify(games)