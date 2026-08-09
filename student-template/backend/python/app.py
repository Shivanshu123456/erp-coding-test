from flask import Flask, jsonify
import os
# TODO: Import your database connector here
import psycopg2
from psycopg2.extras import RealDictCursor
app = Flask(__name__)

# TODO: Configure database connection using os.getenv('DATABASE_URL')
DATABASE_URL = os.getenv("DATABASE_URL")


def get_db_connection():
    return psycopg2.connect(DATABASE_URL)
@app.route('/api/inventory/alerts', methods=['GET'])
def get_alerts():
    """
    TODO: Implement this function.
    1. Connect to the database.
    2. Query 'inventory' table where quantity <= reorder_level.
    3. Return JSON list of products.
    """
    # REMOVE THIS LINE AND IMPLEMENT LOGIC
    return jsonify([]), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
