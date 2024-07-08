from flask import Blueprint, request, jsonify
import requests

bp = Blueprint('gateway', __name__)

@bp.route('/<service>/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def gateway(service, path):
    service_urls = {
        'user_service': 'http://localhost:5001/',
        'competition_service': 'http://localhost:5002/',
        # Add other services here
    }
    
    if service not in service_urls:
        return jsonify({'error': 'Service not found'}), 404

    service_url = f"{service_urls[service]}{path}"
    response = requests.request(
        method=request.method,
        url=service_url,
        headers={key: value for (key, value) in request.headers if key != 'Host'},
        data=request.get_data(),
        cookies=request.cookies,
        allow_redirects=False)

    return (response.text, response.status_code, response.headers.items())

@bp.route('/')
def home():
    return jsonify({'message': 'API Gateway is running'})
