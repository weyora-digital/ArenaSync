from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .auth import configure_keycloak
from .routes import bp as user_bp

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile('config.py')
    
    db.init_app(app)
    
    configure_keycloak(app)

    
    app.register_blueprint(user_bp)

    return app
