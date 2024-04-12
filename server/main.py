

import sqlite3
con = sqlite3.connect("gruzoviki.db")
cur = con.cursor()

def init_DB():
    cur.execute('''CREATE TABLE IF NOT EXISTS user(user_id, access_token, name, email, telephone, date_of_birth, password, role)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_order(order_id, user_id, access_token, type, tonaz, a, b, type_of_machina)''')
    con.commit()
init_DB()

from http.server import BaseHTTPRequestHandler, HTTPServer
from json import dumps
import json
from http import cookies

import random


""" The HTTP request handler """
class RequestHandler(BaseHTTPRequestHandler):

  def _send_cors_headers(self):
      """ Sets headers required for CORS """
      self.send_header("Access-Control-Allow-Origin", "*")
      self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
      self.send_header("Access-Control-Allow-Headers", "x-api-key,Content-Type")

  def send_dict_response(self, d):
      """ Sends a dictionary (JSON) back to the client """
      self.wfile.write(bytes(dumps(d), "utf8"))

  def do_OPTIONS(self):
      self.send_response(200)
      self._send_cors_headers()
      self.end_headers()

  def do_GET(self):
      self.send_response(200)
      self._send_cors_headers()
      self.end_headers()

      response = {}
      response["status"] = "OK"
      self.send_dict_response(response)


  def do_POST(self):
    
    if self.path == '/login/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        # self.send_header("Content-Type", "application/json")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())

        print(data)

        cookie = {}
        # name, email, telephone, date_of_birth, password
        res = cur.execute(f"SELECT * FROM user WHERE email='{data['email']}' AND password='{data['password']}'")
        res = res.fetchone()
        print(res)
        if res[0] is None:
            cookie['error'] = True
        else:
            cookie['role'] = res[7]
            cookie['error'] = False
            cookie['user_id'] = res[0]
            cookie['access_token'] = res[1]

        self.send_dict_response(cookie)
        
    elif self.path == '/registration/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        # self.send_header("Content-Type", "application/json")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        print(data)

        cookie = {}

        # name, email, telephone, date_of_birth, password
        res = cur.execute(f"SELECT email FROM user WHERE email='{data['email']}'")
        if res.fetchone() is None:
            u_index = 0
            token = random.randrange(10000, 99999, 1)

            res = cur.execute("""SELECT max(user_id) FROM user""")
            res = res.fetchone()
            if res[0] is None: u_index = 0
            else: u_index = res[0] + 1
            cur.execute(f"""
                INSERT INTO user VALUES
                    ({u_index}, {token}, '{data['name']}', '{data['email']}', '{data['telephone']}', '{data['date_of_birth']}', '{data['password']}', 'user')
                """)
            
            con.commit()
            
            cookie['user_id'] = u_index
            cookie['access_token'] = token
            cookie['error'] = False

        else:
            cookie['error'] = True

        self.send_dict_response(cookie)

    elif self.path == '/order/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        # self.send_header("Content-Type", "application/json")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        # user_id, access_token, type, tonaz, a, b, type_of_machina
        res = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print(res)
        if res is None:
            cookie['error'] = True
        
        else:
            u_index = 0
        
            res = cur.execute("""SELECT max(order_id) FROM u_order""")
            res = res.fetchone()
            if res[0] is None: u_index = 0
            else: u_index = res[0] + 1
            
            cur.execute(f"""
                 INSERT INTO u_order VALUES
                     ({u_index}, {data["user_id"]}, {data["access_token"]}, '{data["type"]}', {data['tonaz']}, '{data['a']}', '{data['b']}', {data['type_of_machina']})
                 """)
            
            con.commit()
            cookie['error'] = False


        self.send_dict_response(cookie)

    else: print(self.path)


print("Starting server")
httpd = HTTPServer(("127.0.0.1", 8000), RequestHandler)
print("Hosting server on port 8000")
httpd.serve_forever()