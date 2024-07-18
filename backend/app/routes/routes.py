# from flask import request, jsonify
# from datetime import datetime
# from flask_jwt_extended import (
#     create_access_token,
#     create_refresh_token,
#     jwt_required,  # use this
#     get_jwt_identity
# )
# from werkzeug.security import generate_password_hash, check_password_hash
# from . import db
# from .models import Player, Admin, Team, Event, EventRegistration

# def init_routes(app):
#     @app.route('/signup/user', methods=['POST'])
#     def signup_user():
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')
#         nickname = data.get('nickname')
#         country = data.get('country')
#         role = data.get('role')

#         if not email or not password:
#             return jsonify({'message': 'Missing email or password'}), 400

#         existing_user = Player.query.filter_by(email=email).first()
#         if existing_user:
#             return jsonify({'message': 'User already exists'}), 409

#         hashed_password = generate_password_hash(password)
#         new_user = Player(email=email, password=hashed_password, nickname=nickname, country=country, role=role)
#         db.session.add(new_user)
#         db.session.commit()
#         return jsonify({'message': 'User created successfully'}), 201

#     @app.route('/signup/admin', methods=['POST'])
#     def signup_admin():
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')
#         organization = data.get('organization')

#         if not email or not password:
#             return jsonify({'message': 'Missing email or password'}), 400

#         existing_admin = Admin.query.filter_by(email=email).first()
#         if existing_admin:
#             return jsonify({'message': 'Admin already exists'}), 409

#         hashed_password = generate_password_hash(password)
#         new_admin = Admin(email=email, password=hashed_password, organization=organization)
#         db.session.add(new_admin)
#         db.session.commit()
#         return jsonify({'message': 'Admin created successfully'}), 201

#     @app.route('/login/user', methods=['POST'])
#     def login_user():
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')

#         if not email or not password:
#             return jsonify({'message': 'Missing email or password'}), 400

#         user = Player.query.filter_by(email=email).first()
#         print(user.userid)
#         if user and check_password_hash(user.password, password):
#             access_token = create_access_token(identity=user.userid)
#             refresh_token = create_refresh_token(identity=user.userid)
#             return jsonify({'message': 'Login successful', 'user_id': user.userid, 'access_token': access_token, 'refresh_token': refresh_token}), 200
#         else:
#             return jsonify({'message': 'Invalid username or password'}), 401

#     @app.route('/login/admin', methods=['POST'])
#     def login_admin():
#         data = request.get_json()
#         email = data.get('email')
#         password = data.get('password')

#         if not email or not password:
#             return jsonify({'message': 'Missing email or password'}), 400

#         admin = Admin.query.filter_by(email=email).first()
#         if admin and check_password_hash(admin.password, password):
#             print(admin.adminid)
#             access_token = create_access_token(identity=admin.adminid)
#             refresh_token = create_refresh_token(identity=admin.adminid)
#             return jsonify({'message': 'Login successful', 'admin_id': admin.adminid, 'access_token':access_token, 'refresh_token':refresh_token}), 200
#         else:
#             return jsonify({'message': 'Invalid username or password'}), 401
    
#     @app.route('/token/refresh', methods=['POST'])
#     @jwt_required(refresh=True)
#     def refresh():
#         current_user = get_jwt_identity()
#         new_token = create_access_token(identity=current_user)
#         return jsonify({'access_token': new_token})
    
#     @app.route('/verify/admin', methods=['GET'])
#     @jwt_required()
#     def verify_admin():
#         admin_id = get_jwt_identity()
#         admin = Admin.query.filter_by(adminid=admin_id).first()
#         if admin:
#             return jsonify({'message': 'Admin verified', 'admin_id': admin_id}), 200
#         else:
#             return jsonify({'message': 'Admin not verified'}), 401

#     @app.route('/verify/user', methods=['GET'])
#     @jwt_required()
#     def verify_user():
#         user_id = get_jwt_identity()
#         player = Player.query.filter_by(userid=user_id).first()
#         if player:
#             return jsonify({'message': 'Player verified', 'user_id': user_id}), 200
#         else:
#             return jsonify({'message': 'Player not verified'}), 401
        
#     @app.route('/api/validate_user/<int:user_id>', methods=['GET'])
#     def validate_user(user_id):
#         user = Player.query.get(user_id)
#         if user:
#             return jsonify({'message': 'User is valid', 'user_id': user_id}), 200
#         else:
#             return jsonify({'message': 'User not found'}), 404
        
#     @app.route('/api/validate_team/<int:team_id>', methods=['GET'])
#     def validate_team(team_id):
#         team = Team.query.get(team_id)
#         if team:
#             return jsonify({'message': 'Team is valid', 'team_id': team_id}), 200
#         else:
#             return jsonify({'message': 'Team not found'}), 404

#     @app.route('/api/events', methods=['POST'])
#     def create_event():
#         if not request.is_json:
#             return jsonify({"msg": "Missing JSON in request"}), 400

#         data = request.get_json()
#         # print(data['token'])

#         headers = request.headers
#         bearer = headers.get('Authorization')    # Bearer YourTokenHere
#         token = bearer.split()[1]  # YourTokenHere
#         print(bearer)

#         headers = {"Authorization": f"Bearer {token}"}  # Token passed in from the client

#         # Verify admin via the User Management Service
#         verify_response = requests.get('http://127.0.0.1:5000/verify/admin', headers=headers)
#         if verify_response.status_code != 200:
#             return jsonify({"msg": "Unauthorized to create events"}), 401

#         try:
#             event = Event(
#                 country=data['country'],
#                 organizer=data['organizer'],
#                 location=data['location'],
#                 starting_date=data['startingDate'],
#                 end_date=data['endDate'],
#                 starting_time=data['startingTime'],
#                 end_time=data['endTime'],
#                 registration_closing=data['registrationClosing'],
#                 registration_amount=data['registrationAmount']
#             )
#             db.session.add(event)
#             db.session.commit()
#             return jsonify({"message": "Event created successfully", "eventId": event.id}), 201
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500
        

#     @app.route('/api/register_event', methods=['POST'])
#     def register_event():
#         data = request.get_json()
#         event_id = data.get('event_id')
#         user_id = data.get('user_id', None)
#         team_id = data.get('team_id', None)

#         headers = request.headers
#         bearer = headers.get('Authorization')    # Bearer YourTokenHere
#         token = bearer.split()[1]  # YourTokenHere
#         print(bearer)

#         headers = {"Authorization": f"Bearer {token}"}  # Token passed in from the client

#         # Verify player via the User Management Service
#         verify_response = requests.get('http://127.0.0.1:5000/verify/user', headers=headers)
#         if verify_response.status_code != 200:
#             return jsonify({"msg": "Unauthorized to register for events"}), 401

#         # Check with User Management Service to validate user_id and team_id
#         if user_id:
#             user_response = requests.get(f'http://127.0.0.1:5000/api/validate_user/{user_id}')
#             if user_response.status_code != 200:
#                 return jsonify({'message': 'Invalid user ID'}), 404

#         if team_id:
#             team_response = requests.get(f'http://127.0.0.1:5000/api/validate_team/{team_id}')
#             if team_response.status_code != 200:
#                 return jsonify({'message': 'Invalid team ID'}), 404

#         # Proceed with event registration if all validations pass
#         new_registration = EventRegistration(
#             EventID=event_id,
#             UserID=user_id,
#             TeamID=team_id,
#             RegistrationDate=datetime.utcnow()
#         )
#         db.session.add(new_registration)
#         db.session.commit()

#         return jsonify({'message': 'Registered successfully', 'registration_id': new_registration.RegistrationID}), 201

