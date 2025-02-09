import psycopg2
from psycopg2 import sql
import os
from dotenv import load_dotenv
from env import update_env_file 
from psycopg2.extras import RealDictCursor

def load():
    load_dotenv()

    # Get database credentials from environment variables
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT")
    DB_NAME = os.getenv("DB_NAME")

    return DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME

def create_database():

    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME = load()
    conn = psycopg2.connect(
        database=DB_NAME,    # Connect to the database defined in .env
        user=DB_USER,      # Username from .env
        password=DB_PASSWORD,  # Password from .env
        host=DB_HOST,      # Host from .env
        port=DB_PORT,     # Port from .env
    )
    
    # Enable autocommit mode tforo allow CREATE DATABASE
    conn.autocommit = True

    # Create a cursor object to interact with the database
    cur = conn.cursor()

    # Define the name of the new database you want to create
    new_database_name = "emvcards"

    e = True
    # Create a new database
    try:
        cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(new_database_name)))
        update_env_file(".env", "DB_NAME", new_database_name)
        load_dotenv()

    except Exception as e:
        print(e)
        pass
    
    
    # Close the cursor and the connection
    cur.close()
    conn.close()
    
    return   


def create_main_table():
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME = load()
    print(DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER)
    conn = psycopg2.connect(
    database=DB_NAME,    # Connect to the database defined in .env
    user=DB_USER,      # Username from .env
    password=DB_PASSWORD,  # Password from .env
    host=DB_HOST,      # Host from .env
    port=DB_PORT,     # Port from .env
)
    CREATE_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS emv_cards (
    id SERIAL,
    batch_no INTEGER NOT NULL,
    branch_code INTEGER NOT NULL,
    card_seq_no INTEGER NOT NULL,
    card_number BIGINT NOT NULL,
    encoded_name VARCHAR(255) NOT NULL,
    embossed_name VARCHAR(255),
    corporate_name VARCHAR(255),
    pin_mailer_name VARCHAR(255),
    address_1 VARCHAR(255),
    address_2 VARCHAR(255),
    address_3 VARCHAR(255),
    address_4 VARCHAR(255),
    language VARCHAR(10),
    version INTEGER,
    currency_code INTEGER,
    currency_exponent INTEGER,
    begin_date VARCHAR(10),
    expiry_date VARCHAR(10),
    cash_cycle_date VARCHAR(10),
    cash_limit INTEGER,
    offline_limit INTEGER,
    network_limit INTEGER,
    sale_cycle_date VARCHAR(10),
    cash_cycle_length INTEGER,
    sale_cycle_length INTEGER,
    sale_limit INTEGER,
    manual_cash INTEGER,
    service_code INTEGER,
    sale_freq INTEGER,
    cash_freq INTEGER,
    iso_service_restriction INTEGER,
    scheme_id INTEGER NOT NULL,
    scheme_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, card_number)  -- Composite Primary Key
);
"""
    try:   
        cur = conn.cursor()
        cur.execute(CREATE_TABLE_QUERY)
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        cur.close()
        conn.close()
        print(e)
        return e

     
def create_account_details():
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME = load()
    
    
    conn = psycopg2.connect(
        database=DB_NAME,    # Connect to the database defined in .env
        user=DB_USER,      # Username from .env
        password=DB_PASSWORD,  # Password from .env
        host=DB_HOST,      # Host from .env
        port=DB_PORT,     # Port from .env
    )
    
    cur = conn.cursor()
    
    table_query = """
CREATE TABLE IF NOT EXISTS card_account_details  (
    id SERIAL PRIMARY KEY,
    card_id INT NOT NULL,
    card_number BIGINT NOT NULL,
    batch_no INT NOT NULL,
    account_no VARCHAR(50) NOT NULL,
    acc_sys_no VARCHAR(50) NOT NULL,
    acc_sys_name VARCHAR(50) NOT NULL DEFAULT 'Local System',
    desc_no INTEGER NOT NULL,
    acc_name VARCHAR(10) NOT NULL DEFAULT 'CREDIT',
    iso VARCHAR(10),
    currency_code VARCHAR(10),
    currency_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (card_id, card_number) REFERENCES emv_cards(id, card_number) ON DELETE CASCADE
);
"""

    option_query = r"""
    
    CREATE TABLE  IF NOT EXISTS account_options (
    id SERIAL PRIMARY KEY, -- Unique identifier for each option
    account_id INT NOT NULL REFERENCES card_account_details(id) ON DELETE CASCADE, -- Links to `card_account_details`
    Cash BOOLEAN NOT NULL DEFAULT FALSE,
    TCs	BOOLEAN NOT NULL DEFAULT FALSE,
    B_Eq BOOLEAN NOT NULL DEFAULT FALSE, 
    C_Rq BOOLEAN NOT NULL DEFAULT FALSE,
    S_Rq	BOOLEAN NOT NULL DEFAULT FALSE,
    Xfm	BOOLEAN NOT NULL DEFAULT FALSE,
    Xto	BOOLEAN NOT NULL DEFAULT FALSE,
    Dpos BOOLEAN NOT NULL DEFAULT FALSE,
    Bill	BOOLEAN NOT NULL DEFAULT FALSE,
    F_SR	BOOLEAN NOT NULL DEFAULT FALSE,
    M_SR	BOOLEAN NOT NULL DEFAULT FALSE,
    Draft	BOOLEAN NOT NULL DEFAULT FALSE,
    Ndr_W	BOOLEAN NOT NULL DEFAULT FALSE,
    S_Curr	BOOLEAN NOT NULL DEFAULT FALSE,
    M_Cash	BOOLEAN NOT NULL DEFAULT FALSE,
    Q_C	BOOLEAN NOT NULL DEFAULT FALSE,
    Sale BOOLEAN NOT NULL DEFAULT FALSE,
    Cash_Bk	BOOLEAN NOT NULL DEFAULT FALSE,
    Qloc BOOLEAN NOT NULL DEFAULT FALSE,
    CPn BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    """
    
    cur.execute(table_query)
    cur.execute(option_query)
    
    conn.commit()
    
    cur.close()
    conn.close()


def individual_details(data_json, formdata, options, batch):
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME = load()
    global global_account
    conn = psycopg2.connect(
        database=DB_NAME,    # Connect to the database defined in .env
        user=DB_USER,      # Username from .env
        password=DB_PASSWORD,  # Password from .env
        host=DB_HOST,      # Host from .env
        port=DB_PORT,     # Port from .env
    )
    
    cur = conn.cursor()
    data = data_json
        
    sql_query = f"""
        INSERT INTO emv_cards (
            batch_no, branch_code, card_seq_no, card_number, encoded_name, embossed_name,
            corporate_name, pin_mailer_name, address_1, address_2, address_3, address_4,
            language, version, currency_code, currency_exponent, begin_date,
            expiry_date, cash_cycle_date, cash_limit, offline_limit, network_limit,
            sale_cycle_date, cash_cycle_length, sale_cycle_length, sale_limit,
            manual_cash, service_code, sale_freq, cash_freq, iso_service_restriction, scheme_id, scheme_name
        )
        VALUES (
            {batch[-1]}, {data["branch_code"]}, {data["card_seq_no"]}, {data["card_number"]}, '{data["encoded_name"]}', '{data["embossed_name"]}',
            '{data["corporate_name"]}', '{data["pin_mailer_name"]}', '{data["address_1"]}', '{data["address_2"]}', '{data["address_3"]}', '{data["address_4"]}',
            '{data["language"]}', {data["version"]}, '{data["currency_code"]}', {data["currency_exponent"]}, '{data["begin_date"]}',
            '{data["expiry_date"]}', '{data["cash_cycle_date"]}', {data["cash_limit"]}, {data["offline_limit"]}, {data["network_limit"]},
            '{data["sale_cycle_date"]}', {data["cash_cycle_length"]}, {data["sale_cycle_length"]}, {data["sale_limit"]},
            {data["manual_cash"]}, {data["service_code"]}, {data["sale_freq"]},{data["cash_freq"]}, {data["iso_service_restriction"]}, {data["scheme_id"]}, '{data["scheme_name"]}'
        ) RETURNING id;
    """

    try: 
        cur.execute(sql_query)
        card_id = cur.fetchone()[0]
        print("card_id", card_id)
        
        global_account = card_id
    except:
        conn.commit()
        conn.close()
        cur.close()
        return e
        
    card_number = data["card_number"]
    data = {"formData" : formdata, "options" : options, "batch": batch}

    for i in range(len(data["formData"])):
        insert_1 = f"""
        INSERT into card_account_details
        (card_id ,card_number, batch_no, account_no , acc_sys_no, acc_sys_name,
        desc_no, acc_name,  iso, currency_code , currency_name)
        values 
        ({global_account}, {card_number}, {data["batch"]}, '{data["formData"][i]["accountNo"]}', '{data["formData"][i]["accSysNo"]}', '{data["formData"][i]["accSysName"]}',
        {data["formData"][i]["descNo"]}, '{data["formData"][i]["accName"]}', '{data["formData"][i]["iso"] }', '{data["formData"][i]["currencyCode"]}', '{data["formData"][i]["currencyName"]}' )
        RETURNING id;
        """
        
        try :            
            cur.execute(insert_1)
            print("Executed 2")
            
        except Exception as e:
            print(e)
            cur.close()
            conn.close()
            return e

        #reference id
        id = cur.fetchone()[0]
        
        opt = data["options"][i]
        opt.insert(0, id)
        
        tup = str(tuple(opt))
        
        
        
        insert_2 = f"""
        INSERT into account_options 
        (       Account_id,
                Cash,
                TCs,
                B_Eq,
                C_Rq,
                S_Rq,
                Xfm,
                Xto,
                Dpos,
                Bill,
                F_SR,
                M_SR,
                Draft,
                Ndr_W,
                S_Curr,
                M_Cash,
                Q_C,
                Sale,
                Cash_Bk,
                Qloc,
                CPn
                )
        values
        {tup} ;        
        """
        try:
            cur.execute(insert_2)
        except Exception as e:
            cur.close()
            conn.close()
            return e
    
    conn.commit()
    cur.close()
    conn.close()
        
    return True

def get_details(batch, created):
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME = load()
    conn = psycopg2.connect(
        database=DB_NAME,    # Connect to the database defined in .env
        user=DB_USER,      # Username from .env
        password=DB_PASSWORD,  # Password from .env
        host=DB_HOST,      # Host from .env
        port=DB_PORT,     # Port from .env
    )
    
    cur = conn.cursor()
    
    try:
        if not batch or not created:
            return Exception("Batch and created not available")
        
        elif batch and created:
            # Query to fetch card details based on batch_no and date
            query = """
            SELECT id, batch_no, branch_code, card_number, encoded_name, created_at
            FROM emv_cards
            WHERE batch_no = %s AND DATE(created_at) = %s
            """
            cur.execute(query, (batch, created))
            
        elif batch and not created:
            query = """
            SELECT id, batch_no, branch_code, card_number, encoded_name, created_at
            FROM emv_cards
            WHERE batch_no = %s AND DATE(created_at) = %s
            """
            cur.execute(query, (batch, created))
            
        elif created and not batch:
            query = """
            SELECT id, batch_no, branch_code, card_number, encoded_name, created_at
            FROM emv_cards
            WHERE batch_no = %s AND DATE(created_at) = %s
            """
            cur.execute(query, (batch, created))

        cards = cur.fetchall()


        return cards
    except Exception as e:
        return e
  
  
def get_datas():
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME = load()
    conn = psycopg2.connect(
        database=DB_NAME,    # Connect to the database defined in .env
        user=DB_USER,      # Username from .env
        password=DB_PASSWORD,  # Password from .env
        host=DB_HOST,      # Host from .env
        port=DB_PORT,     # Port from .env
    )
    
    cur = conn.cursor(cursor_factory=RealDictCursor)

    query1 = """
    SELECT E.* FROM emv_cards E, card_account_details CA, account_options OP
    where E.id = CA.card_id and CA.id = OP.account_id;"""
    
    query2 = """ 
    SELECT CA.* FROM emv_cards E, card_account_details CA, account_options OP
    where E.id = CA.card_id and CA.id = OP.account_id; """
    
    
    query3 = """
    SELECT OP.* FROM emv_cards E, card_account_details CA, account_options OP
    where E.id = CA.card_id and CA.id = OP.account_id; 
    """
    
    
    
    cur.execute(query1)
    dict1 = cur.fetchall()
    
    data1 = [dict(x) for x in dict1 ]

    cur.execute(query2)
    dict2 = cur.fetchall()
    data2 = [dict(x) for x in dict2]

    cur.execute(query3)
    dict3 = cur.fetchall()
    data3 = [dict(x) for x in dict3]

    main_result = []
    
    for i in range(len(data1)):
        account = {"main": data1[i]}
        l = []
        for j in range(len(data2)):
            options = []
            if data2[j]["card_id"] == data1[i]["id"]:
                options.append(data2[j])
                for k in range(len(data3)):
                    if data3[k]["account_id"] == data2[j]["id"]:
                        options.append(data3[k])
                        break
                l.append(options)
        account["details"] = l
        main_result.append(account)
    
    return main_result

if __name__ == '__main__':
    create_database()
    create_main_table()
    print(individual_details())