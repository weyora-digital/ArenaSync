from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..utils.db import db
from ..models.sql_models import Player, Team 
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from flask_cors import cross_origin
import requests

user_blueprint = Blueprint('user', __name__)

# @user_blueprint.route('/signup', methods=['POST', 'OPTIONS'])
@user_blueprint.route('/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    nickname = data.get('nickname')
    country = data.get('country', None)
    teamid = data.get('teamid', None)

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    existing_user = Player.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = Player(email=email, password=hashed_password, nickname=nickname, country=country)
    
    if teamid is not None:
        team = Team.query.get(teamid)
        if team is None:
            return jsonify({'message': 'Invalid team ID'}), 404
        new_user.teamid = teamid  # Only set teamid if it's provided and not None
    
    db.session.add(new_user)
    db.session.commit()

    # Now call the Neo4j API to create the player in Neo4j using the new player's ID
    neo4j_url = f"http://127.0.0.1:5000/recommendation/addplayer?player_id={new_user.userid}"
    response = requests.post(neo4j_url)
    print(response)
    try:
        
        if response.status_code != 201:
            # Handle the case where the Neo4j API returns an error
            return jsonify({'message': f'Error creating player in Neo4j: {response.text}'}), response.status_code
    except requests.exceptions.RequestException as e:
        # Catch any errors that occur during the request to the Neo4j API
        return jsonify({'message': f'Failed to communicate with Neo4j API: {str(e)}'}), 500


    # Auto-login: generate access and refresh tokens
    additional_claims = {'role': 'user'}
    access_token = create_access_token(identity=new_user.userid, additional_claims=additional_claims)
    refresh_token = create_refresh_token(identity=new_user.userid, additional_claims=additional_claims)

    # Return the tokens along with the success message
    return jsonify({
        'message': 'User created successfully',
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user_id': new_user.userid,
        'username': new_user.nickname
    }), 201

@user_blueprint.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = Player.query.filter_by(email=email).first()
    print(user.userid)
    if user and check_password_hash(user.password, password):
        additional_claims = {'role': 'user'}
        access_token = create_access_token(identity=user.userid, additional_claims=additional_claims)
        refresh_token = create_refresh_token(identity=user.userid, additional_claims=additional_claims)
        return jsonify({
            'message': 'Login successful', 
            'user_id': user.userid,
            'username': user.nickname, 
            'access_token': access_token, 
            'refresh_token': refresh_token
            }), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@user_blueprint.route('/verify', methods=['GET'])
@jwt_required()
def verify_user():
    user_id = get_jwt_identity()
    player = Player.query.filter_by(userid=user_id).first()
    if player:
        return jsonify({'message': 'Player verified', 'user_id': user_id}), 200
    else:
        return jsonify({'message': 'Player not verified'}), 401
    
@user_blueprint.route('/api/validate_user/<int:user_id>', methods=['GET'])
def validate_user(user_id):
    user = Player.query.get(user_id)
    if user:
        return jsonify({'message': 'User is valid', 'user_id': user_id}), 200
    else:
        return jsonify({'message': 'User not found'}), 404
    
@user_blueprint.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_details(user_id):
    # Retrieve the user from the database
    user = Player.query.get(user_id)
    print(user.userid)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Return the user details
    return jsonify({
        'user_id': user.userid,
        'email': user.email,
        'nickname': user.nickname,
        # 'country': user.country,
        # 'teamid': user.teamid
    }), 200

@user_blueprint.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_details(user_id):
    # Ensure the user can only update their own information
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({'message': 'Unauthorized access'}), 403

    # Get the user from the database
    user = Player.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Get the update data from the request
    data = request.get_json()
    nickname = data.get('nickname')
    email = data.get('email')
    # country = data.get('country')
    # team_id = data.get('teamid')

    # Update fields if they are provided in the request
    if nickname:
        user.nickname = nickname
    if email:
        # Check if the email is already in use by another user
        existing_user = Player.query.filter_by(email=email).first()
        if existing_user and existing_user.userid != user_id:
            return jsonify({'message': 'Email is already in use'}), 409
        user.email = email
    # if country:
    #     user.country = country
    # if team_id is not None:
    #     # Validate if the team ID exists
    #     team = Team.query.get(team_id)
    #     if not team:
    #         return jsonify({'message': 'Invalid team ID'}), 404
    #     user.teamid = team_id

    # Commit the updates to the database
    db.session.commit()

    # Return the updated user details
    return jsonify({
        'user_id': user.userid,
        'email': user.email,
        'nickname': user.nickname,
        # 'country': user.country,
        # 'teamid': user.teamid
    }), 200
