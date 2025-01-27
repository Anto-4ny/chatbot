from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your actual API keys and endpoints
SUN_MOTORS_API_URL = 'https://api.sunmotors.co.uk/marketcheck/vehicles'
SUN_MOTORS_API_KEY = 'YOUR_API_KEY'

# Utility function to call the Sun Motors API
def fetch_products(query):
    params = {
        'query': query,
        'apikey': SUN_MOTORS_API_KEY,
    }
    response = requests.get(SUN_MOTORS_API_URL, params=params)

    if response.status_code == 200:
        return response.json()
    else:
        return {'error': 'Failed to fetch data from Sun Motors API'}

# Route to handle search requests
@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query', '')

    if not query:
        return jsonify({'error': 'Query not provided'}), 400

    # Fetch results from Sun Motors API
    results = fetch_products(query)
    
    if 'error' in results:
        return jsonify({'error': results['error']}), 500
    
    # Return the data (for now, we'll just send a subset of the results)
    return jsonify({
        'results': results.get('vehicles', [])
    })

if __name__ == "__main__":
    app.run(debug=True)
