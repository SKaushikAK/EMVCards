from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
from database  import *
from P3 import *
import requests
from encrypt import *

# Initialize Flask app
app = Flask(__name__, static_folder='../dist', static_url_path='')

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


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
    try:
        req_data = get_datas()
        return jsonify({"message":req_data})
    except:
        return jsonify({"message": []})

@app.route("/show_details/api", methods = ['GET'])
def show_details():
    
    batch = request.args.get("batch_no", type = int)
    created = request.args.get("created")
    
    details = get_details(batch, created)
    return jsonify(details), 200

@app.route("/generateP3", methods = ["POST"])
def generateP():
    data = request.json["main"]

    card_number = str(data["card_number"])
    expiry_date = data["expiry_date"]
    embossed_name = data["embossed_name"]
    sample1 = "0111005414000"
    cardlast = str(card_number)[-4:]
    service_code = data["service_code"]
    version = str(data["version"])
    address1 = data["address_1"]
    address2 = data["address_2"]
    address3 = data["address_3"]
    address4 = data["address_4"]
    cvv_pin = generate_cvv()
    pin_verification = generate_pin()

    emboss = emboss_data([card_number,expiry_date,embossed_name,sample1, cardlast+str(cvv_pin)])
    track = tracks([card_number, embossed_name, expiry_date, service_code, pin_verification, cvv_pin])
    print(track)
    track1, track2 = track[0], track[1]
    carrier_data = carrier([card_number, version, sample1, embossed_name, expiry_date,address1,address2,address3, address4])
    chip_data = chip([track1, track2, card_number, pin_verification])

    result = encode(emboss +"|"+ track1.strip() + track2.strip()+"|"+carrier_data + "|" + chip_data)
    return jsonify({"message": result}), 200


@app.route("/track_data", methods = ["POST"])
def track_data():
    data = request.json
    api_url = 'https://neapay.com/online-tools/card-track1-track2-generator'
    response = requests.get(api_url)
    print(response)
    return

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
