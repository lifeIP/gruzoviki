

import sqlite3

from flask import request
con = sqlite3.connect("gruzoviki.db")
cur = con.cursor()
# driver
def init_DB():
    cur.execute('''CREATE TABLE IF NOT EXISTS user(user_id, access_token, name, email, telephone, date_of_birth, password, role, city)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_order(order_id, user_id, access_token, type, tonaz, a, b, type_of_machina)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_image(image_id, user_id, access_token, image)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_driver(driver_id, user_id, access_token, tonaz, marka, gosnumber)''')
    con.commit()
init_DB()

from http.server import BaseHTTPRequestHandler, HTTPServer
from json import dumps
import json
from http import cookies

import random

import re
import base64
import requests
import boto3

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
        if res[0] is None:
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
                     ({u_index}, {data["user_id"]}, {data["access_token"]}, '{data["type"]}', {data['tonaz']}, '{data['a']}', '{data['b']}', {data['type_of_machina']})
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
        if res is None:
            cookie['error'] = True
        
        else:
            cookie['error'] = False
            cookie['content'] = res
            self.send_dict_response(cookie)




    elif self.path == '/becomed_driver/img/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        # self.send_header("Content-Type", "application/json")
        self.end_headers()

        # dataLength = int(self.headers["Content-Length"])
        # # data = self.rfile.read(dataLength)
        # # data = json.loads(data.decode())
        # # cookie = {}

        # payload = request.json
        # image = payload['content']
        # # before ',' symbol there will be like 'data:image/png;base64', so you can understand image file
        # image = image[image.find(",") + 1:]  # get the image data from input
        # file_content = base64.b64decode(image)

        # s3 = boto3.resource('s3')
        # result = s3.meta.client.put_object(Body=file_content,
        #                                 Bucket=BUCKET_NAME,
        #                                 Key="someimagename.png",
        #                                 Metadata={})
        
        # # u_image
        # # image_id, user_id, access_token, image
        # res = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        # res = res.fetchone()
        # print(res)
        # if res[0] is None:
        #     res = cur.execute("""SELECT max(image_id) FROM u_image""")
        #     res = res.fetchone()
        #     print(data)
        #     if res[0] is None: u_index = 0
        #     else: u_index = res[0] + 1
            
        #     res = cur.execute(f"""
        #         INSERT INTO u_image VALUES
        #             ({u_index}, {data['user_id']}, {data['access_token']}, '{data['image']}')
        #         """)
        #     print(res)
        #     con.commit()
        #     cookie['error'] = False

        # else:
        #     cookie['error'] = True

        # self.send_dict_response(cookie)





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