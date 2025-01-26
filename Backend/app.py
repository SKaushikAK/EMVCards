from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from database  import *
from P3 import *

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
@app.route('/show_details/P3')
def static_files():
    return send_from_directory(app.static_folder, 'index.html')



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

@app.route("/generateP3", methods = ["POST"])
def generateP():
    data = request.json["main"]
    print("data",data)
    card_number = data["card_number"],
    expiry_date = data["expiry_date"],
    embossed_name = data["embossed_name"]
    sample1 = "0111005414000"
    cardlast = card_number[-4:]

    format_embossing([card_number,expiry_date,embossed_name,sample1, cardlast])
    
    return jsonify(data), 200

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
