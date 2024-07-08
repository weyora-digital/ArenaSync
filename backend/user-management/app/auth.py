from flask import current_app
from keycloak import KeycloakOpenID, KeycloakAdmin

def configure_keycloak(app):
    app.config['KEYCLOAK_URL'] = 'http://localhost:8080/auth/'
    app.config['KEYCLOAK_REALM'] = 'YourRealm'
    app.config['KEYCLOAK_CLIENT_ID'] = 'your-client-id'
    app.config['KEYCLOAK_CLIENT_SECRET'] = 'your-client-secret'
    app.config['KEYCLOAK_ADMIN_USER'] = 'admin'
    app.config['KEYCLOAK_ADMIN_PASSWORD'] = 'password'

def keycloak_openid():
    return KeycloakOpenID(server_url=current_app.config['KEYCLOAK_URL'],
                          client_id=current_app.config['KEYCLOAK_CLIENT_ID'],
                          realm_name=current_app.config['KEYCLOAK_REALM'],
                          client_secret_key=current_app.config['KEYCLOAK_CLIENT_SECRET'])

def get_keycloak_admin():
    return KeycloakAdmin(server_url=current_app.config['KEYCLOAK_URL'],
                         username=current_app.config['KEYCLOAK_ADMIN_USER'],
                         password=current_app.config['KEYCLOAK_ADMIN_PASSWORD'],
                         realm_name=current_app.config['KEYCLOAK_REALM'],
                         verify=True)
