from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# MySQL Config
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''  # replace with your password
app.config['MYSQL_DB'] = 'room_assets_db'

mysql = MySQL(app)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM rooms")
    rooms = cursor.fetchall()
    return jsonify(rooms)

@app.route('/api/assets/<int:room_id>', methods=['GET'])
def get_assets(room_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM assets WHERE room_id = %s", (room_id,))
    assets = cursor.fetchall()
    return jsonify(assets)

@app.route('/api/assets', methods=['POST'])
def add_asset():
    data = request.get_json()
    cursor = mysql.connection.cursor()
    cursor.execute("""
        INSERT INTO assets (room_id, item_type, item_name, quantity, model)
        VALUES (%s, %s, %s, %s, %s)
    """, (data['room_id'], data['item_type'], data['item_name'], data['quantity'], data['model']))
    mysql.connection.commit()
    return jsonify({'status': 'Item added successfully'})

if __name__ == '__main__':
    app.run(debug=True)
