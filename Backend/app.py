from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os
from database  import *
# import psycopg2
from psycopg2.extras import RealDictCursor

# Initialize Flask app
app = Flask(__name__, static_folder='../dist', static_url_path='')
CORS(app)  # Enable CORS for React frontend


# Serve the main React app (index.html)
@app.route('/')
def serve():
    create_database()
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files (JS, CSS, images)
@app.route('/add_details')
@app.route('/show_details')
@app.route('/add_details/extra_details')
def static_files():
    return send_from_directory(app.static_folder, 'index.html')


load_dotenv()

# Get database credentials from environment variables
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")



conn = psycopg2.connect(
    database=DB_NAME,    # Connect to the database defined in .env
    user=DB_USER,      # Username from .env
    password=DB_PASSWORD,  # Password from .env
    host=DB_HOST,      # Host from .env
    port=DB_PORT,     # Port from .env
)

cursor = conn.cursor(cursor_factory=RealDictCursor)

# Endpoint 1: Get list of cards
@app.route('/show_details/api/cards', methods=['GET'])
def get_cards():
    try:
        batch_no = request.args.get('batch_no', type=int)
        created_at = request.args.get('created_at')

        if not batch_no or not created_at:
            return jsonify({"error": "batch_no and created_at are required"}), 400

        # Query to fetch card number and holder name
        query = """
        SELECT id, card_number, encoded_name
        FROM emv_cards
        WHERE batch_no = %s AND DATE(created_at) = %s
        """
        cursor.execute(query, (batch_no, created_at))
        cards = cursor.fetchall()
        print(cards)
        if not cards:
            return jsonify({"message": "No cards found for the given batch and date."}), 404

        return jsonify(cards), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint 2: Get and update details of a specific card
@app.route('/api/card/<int:card_id>', methods=[ 'PUT'])
def card_details(card_id):
    try:
        if request.method == 'GET':
            # Query to fetch card details, accounts, and options
            query = """
            SELECT c.*, a.*, o.*
            FROM emv_cards c
            LEFT JOIN card_account_details a ON c.id = a.card_id
            LEFT JOIN account_options o ON a.id = o.account_id
            WHERE c.id = %s
            """
            cursor.execute(query, (card_id))
            details = cursor.fetchall()

            if not details:
                return jsonify({"message": "No details found for the given card."}), 404

            return jsonify(details), 200

        elif request.method == 'PUT':
            # Get updated data from the request body
            updated_data = request.json

            # Update emv_cards table
            card_update_query = """
            UPDATE emv_cards
            SET branch_code = %s, card_seq_no = %s, card_number = %s, encoded_name = %s
            WHERE id = %s
            """
            cursor.execute(card_update_query, (
                updated_data['branch_code'],
                updated_data['card_seq_no'],
                updated_data['card_number'],
                updated_data['encoded_name'],
                card_id
            ))

            # Commit changes
            conn.commit()
            return jsonify({"message": "Card details updated successfully!"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500



# Route to add batch details (placeholder)
@app.route('/add_details/api', methods=['POST'])
def add_details():
    # # First create a table if necessary
    create_main_table()
    
    #send the data
    data = request.json
    result = individual_details(data)
    
    return jsonify({"message" : result})
   
   
@app.route('/add_details/extra_details/api', methods=['POST'])
def extra_detailsI():
    data = request.json
    data ["batch"] = data["batch"][-1]
    print("Request",request.json)
    create_account_details()
    
    #insert details
    insert_account(data)
    
    return jsonify({"message" : False})

@app.route("/api_details", methods = ["GET"])
def get_details():
    req_data = get_datas()
    if not req_data:
        return jsonify({"message": "Error in fetching datas"})
    return jsonify({"message":req_data})

@app.route("/show_details/api", methods = ['GET'])
def show_details():
    
    batch = request.args.get("batch_no", type = int)
    created = request.args.get("created")
    
    details = get_details(batch, created)
    return jsonify(details), 200

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
