

import sqlite3

from flask import request
con = sqlite3.connect("gruzoviki.db")
cur = con.cursor()
# driver
def init_DB():
    cur.execute('''CREATE TABLE IF NOT EXISTS user(user_id, access_token, name, email, telephone, date_of_birth, password, role, city)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_order(order_id, user_id, access_token, type, tonaz, a, b, type_of_machina, order_status)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_image(image_id, user_id, access_token, image)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_driver(driver_id, user_id, access_token, tonaz, marka, gosnumber)''')
    con.commit()

def add_admin():
    cur.execute(f"""
        INSERT INTO user VALUES
            (0, 32387, 'Admin', 'admin@gruzoviki.ru', '+78005553535', '01.01.2000', 'pass', 'admin', 'Москва')
        """)
    con.commit()
    
def add_manager():
    cur.execute(f"""
        INSERT INTO user VALUES
            (1, 22887, 'Manager', 'manager@gruzoviki.ru', '+78005553535', '01.01.2000', 'pass', 'manager', 'Москва')
        """)
    con.commit()

init_DB()
# add_admin()
# add_manager()

from http.server import BaseHTTPRequestHandler, HTTPServer
from json import dumps
import json
import random
import haversine as hs
from haversine import Unit

from PIL import Image



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
    print(self.path)
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
        if res is None:
            cookie['error'] = True
        else:
            cookie['role'] = res[7]
            cookie['error'] = False
            cookie['user_id'] = res[0]
            cookie['access_token'] = res[1]

        self.send_dict_response(cookie)
        
        
    elif self.path == '/user/':
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
        res = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print(res)
        if res[0] is None:
            cookie['error'] = True
        else:
            cookie['fio'] = res[2]
            cookie['error'] = False
            cookie['city'] = res[8]
            cookie['date_of_bith'] = res[5]

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
                    ({u_index}, {token}, '{data['name']}', '{data['email']}', '{data['telephone']}', '{data['date_of_birth']}', '{data['password']}', 'user', 'Москва')
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
                     ({u_index}, {data["user_id"]}, {data["access_token"]}, '{data["type"]}', {data['tonaz']}, '{data['a']}', '{data['b']}', {data['type_of_machina']}, 'wait')
                 """)
            
            con.commit()
            cookie['error'] = False


        self.send_dict_response(cookie)


    elif self.path == '/order/get/':
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
# order_id, user_id, access_token, type, tonaz, a, b, type_of_machina
        # user_id, access_token, type, tonaz, a, b, type_of_machina
        res = cur.execute(f"SELECT * FROM u_order WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchmany(5)
        print(res)
        if len(res) <= 0:
            cookie['error'] = True
        
        else:
            cookie['error'] = False
            i = 0
            for r in res:
                cookie[f'{i}'] = r
                i+=1
                cookie['len'] = i
            
        
        self.send_dict_response(cookie)




    elif self.path == '/becomed_driver/img/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        # self.send_header("Content-Type", "application/json")
        self.end_headers()

        import time
        start_time = time.time()
        content_length = int(self. headers['Content-Length'])
        # Read the binary file data sent by the client
        file_data = self.rfile.read(content_length)

        # Here you can process the received file data, such as saving to disk
        with open('uploaded_file.bin', 'wb') as file:
            file. write(file_data)

        self. send_response(200)
        self. end_headers()
        self.wfile.write(b'File uploaded successfully.')

        end_time = time. time()
        time_elapsed_ms = int((end_time - start_time) * 1000)
        print(f"Update in {time_elapsed_ms} ms")

        cookie = {}
        cookie['error'] = True

        self.send_dict_response(cookie)





    elif self.path == '/becomed_driver/':
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

        res = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print("res")
        print(res)
        if res[0] is not None:
            res1 = cur.execute("""SELECT max(driver_id) FROM u_driver""")
            res1 = res1.fetchone()
            print("res1")
            print(res1)
            if res1[0] is None: u_index = 0
            else: u_index = res1[0] + 1     
            # driver_id, user_id, access_token, tonaz, marka, gosnumber
            
            res2 = cur.execute(f"""SELECT * FROM u_driver WHERE user_id={data['user_id']}""")
            res2 = res2.fetchone()
            print("u_driver")
            print(res2)
            if res2 is None:
                print("in")
                cur.execute(f"""
                    INSERT INTO u_driver VALUES
                        ({u_index}, {data['user_id']}, {data['access_token']}, {data['tonaz']}, '{data['marka']}', {data['gosnumber']})
                    """)
                con.commit()
                cookie['error'] = False

            else: cookie['error'] = True

        else:
            cookie['error'] = True

        self.send_dict_response(cookie)

    elif self.path == '/user_data/':
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

        res = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print("res")
        print(res)
        if res[0] is not None:
            # user_id, access_token, name, email, telephone, date_of_birth, password, role
            cur.execute(f"""UPDATE user
                        SET name='{data["fio"]}', city='{data['city']}', date_of_birth='{data["date"]}'
            """)
            con.commit()
            cookie['error'] = False

        else: cookie['error'] = True

        self.send_dict_response(cookie)

    elif self.path == '/calculating/':
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

        res1 = list(map(float, data['a'].split(', ')))
        res2 = list(map(float, data['b'].split(', ')))

        result=hs.haversine((res1[0], res1[1]), (res2[0], res2[1]), unit=Unit.KILOMETERS)

        cookie['result'] = result
        cookie['error'] = False
        print(cookie)
        self.send_dict_response(cookie)


    else: print(self.path)
    
    

print("Starting server")
httpd = HTTPServer(("127.0.0.1", 8000), RequestHandler)
print("Hosting server on port 8000")
httpd.serve_forever()