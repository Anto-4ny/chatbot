from flask import Flask, request, jsonify
import requests
import openai
import os

app = Flask(__name__)

# Set your OpenAI API key (make sure to keep it secure)
openai.api_key = os.getenv("OPENAI_API_KEY")  # Set your API key as an environment variable

# Replace with your actual Sun Motors API keys and endpoints
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

# Utility function to interact with OpenAI API
def get_ai_response(query):
    try:
        # Make a request to OpenAI API
        response = openai.Completion.create(
            model="text-davinci-003",  # You can replace with a different model if needed
            prompt=query,
            max_tokens=150,  # Limit the response length
            temperature=0.7  # Control the randomness of the response
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return str(e)

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

    # Get AI response based on the query
    ai_response = get_ai_response(query)
    
    # Return both the Sun Motors data and AI response
    return jsonify({
        'results': results.get('vehicles', []),
        'ai_response': ai_response
    })

if __name__ == "__main__":
    app.run(debug=True)
