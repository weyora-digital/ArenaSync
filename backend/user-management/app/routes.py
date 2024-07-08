from flask import Blueprint, request, jsonify, current_app
from .auth import get_keycloak_admin, keycloak_openid

bp = Blueprint('user', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    keycloak_admin = get_keycloak_admin()
    # Create user in Keycloak
    user_id = keycloak_admin.create_user({"username": username, "email": email, "enabled": True})
    keycloak_admin.set_user_password(user_id, password, temporary=False)

    return jsonify({"message": "User registered", "username": username}), 201

@bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    token = keycloak_openid.token(username, password)
    return jsonify({"access_token": token['access_token']}), 200
