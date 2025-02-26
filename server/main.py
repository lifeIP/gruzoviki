

import sqlite3

from flask import request
con = sqlite3.connect("gruzoviki.db")
cur = con.cursor()
# driver
def init_DB():
    cur.execute('''CREATE TABLE IF NOT EXISTS user(user_id, access_token, name, email, telephone, date_of_birth, password, role, city)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS u_order(order_id, user_id, access_token, type, tonaz, a, b, type_of_machina, order_status, driver_id)''')
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

def add_driver():

    # cur.execute(f"""
    #     INSERT INTO user VALUES
    #         (2, 12347, 'Driver', 'driver@gruzoviki.ru', '+78005553535', '01.01.2000', 'pass', 'driver', 'Томск')
    #     """)
    cur.execute(f"""
        INSERT INTO u_driver VALUES
            (1, 2, 12347, 25, 'Фольксваген', '458484')
        """)
    con.commit()

def add_user():
    cur.execute(f"""
        INSERT INTO user VALUES
            (3, 21345, 'User', 'user@gruzoviki.ru', '+78005553535', '01.01.2000', 'pass', 'user', 'Томск')
        """)
    con.commit()

init_DB()
# add_admin()
# add_manager()
# add_driver()
# add_user()

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
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())

        print(data)

        cookie = {}
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
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())

        print(data)

        cookie = {}
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
            cookie['raiting'] = 4

        self.send_dict_response(cookie)


    elif self.path == '/registration/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        print(data)

        cookie = {}

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


    elif self.path == '/changeOrderData/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())

        cookie = {}
        print(data)

        
        res = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()

        if res is None:
            cookie['error'] = True
        else:
            res = cur.execute(f"""SELECT * FROM u_order WHERE order_id={data['m_id']} AND order_status='wait'""")
            res = res.fetchone()
            if res is None:
                cookie['error'] = True
            else:
                res = cur.execute(f"""UPDATE u_order SET driver_id='{data['driver']}', a='{data['point_a']}', b='{data['point_b']}', type='{data['name']}' WHERE order_id={data['m_id']}""")
                con.commit()
                cookie['error'] = False


        self.send_dict_response(cookie)
    

    elif self.path == '/changeStatus/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())

        cookie = {}
        print(data)

        res = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND role='manager'")
        res = res.fetchone()

        if res is None:
            cookie['error'] = True
        
        else:
            res = cur.execute(f"""SELECT * FROM u_order WHERE order_id={data['m_id']}""")
            res = res.fetchone()
            if res is None:
                cookie['error'] = True
            else:
                res = cur.execute(f"""UPDATE u_order SET order_status='{data['order_status']}' WHERE order_id={data['m_id']}""")
                con.commit()
                cookie['error'] = False

        self.send_dict_response(cookie)
        
    elif self.path == '/order/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)


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
                     ({u_index}, {data["user_id"]}, {data["access_token"]}, '{data["type"]}', {data['tonaz']}, '{data['a']}', '{data['b']}', {data['type_of_machina']}, 'wait', 0)
                 """)
            
            con.commit()
            cookie['error'] = False


        self.send_dict_response(cookie)


    elif self.path == '/order/get/all':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        res = cur.execute(f"SELECT * FROM u_order WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchmany(50)
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

    elif self.path == '/order/get/in_progress':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        res = cur.execute(f"SELECT * FROM u_order WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND order_status='in_progress'")
        res = res.fetchmany(50)
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

    elif self.path == '/order/get/done':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        res = cur.execute(f"SELECT * FROM u_order WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND order_status='done'")
        res = res.fetchmany(50)
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

    elif self.path == '/order/get/wait':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        
        cookie = {}
        print(data)
        
        res = cur.execute(f"SELECT * FROM u_order WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND order_status='wait'")
        res = res.fetchmany(50)
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



    elif self.path == '/order/manager/get/all/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        manager = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND (role='manager' OR role='admin')")
        manager = manager.fetchone();

        if manager is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;


        res = cur.execute(f"SELECT * FROM u_order")
        res = res.fetchmany(50)
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

    elif self.path == '/order/manager/get/in_progress':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        manager = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND (role='manager' OR role='admin')")
        manager = manager.fetchone();

        if manager is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;

        res = cur.execute(f"SELECT * FROM u_order WHERE order_status='in_progress'")
        res = res.fetchmany(50)
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

    elif self.path == '/order/manager/get/done':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        manager = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND (role='manager' OR role='admin')")
        manager = manager.fetchone()

        if manager is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;

        res = cur.execute(f"SELECT * FROM u_order WHERE order_status='done'")
        res = res.fetchmany(50)
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


    #--------------------------------------------------------------------------------
    elif self.path == '/order/driver/get/all/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        res = cur.execute(f"SELECT driver_id FROM u_driver WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print(res[0])
        if res is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;

        res = cur.execute(f"SELECT * FROM u_order WHERE driver_id='{res[0]}'")
        res = res.fetchmany(50)
        print("Данные")
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


    elif self.path == '/order/driver/get/in_progress/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        res = cur.execute(f"SELECT driver_id FROM u_driver WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print(res[0])
        if res is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;

        res = cur.execute(f"SELECT * FROM u_order WHERE driver_id='{res[0]}' AND order_status='in_progress'")
        res = res.fetchmany(50)
        print("Данные")
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


    elif self.path == '/order/driver/get/done/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        res = cur.execute(f"SELECT driver_id FROM u_driver WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print(res[0])
        if res is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;

        res = cur.execute(f"SELECT * FROM u_order WHERE driver_id='{res[0]}' AND order_status='done'")
        res = res.fetchmany(50)
        print("Данные")
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

    
    elif self.path == '/order/driver/get/wait/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        cookie = {}
        print(data)

        res = cur.execute(f"SELECT driver_id FROM u_driver WHERE user_id={data['user_id']} AND access_token={data['access_token']}")
        res = res.fetchone()
        print(res[0])
        if res is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;

        res = cur.execute(f"SELECT * FROM u_order WHERE driver_id='{res[0]}' AND order_status='wait'")
        res = res.fetchmany(50)
        print("Данные")
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
    #--------------------------------------------------------------------------------

    elif self.path == '/order/manager/get/wait':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        
        cookie = {}
        print(data)
        
        manager = cur.execute(f"SELECT * FROM user WHERE user_id={data['user_id']} AND access_token={data['access_token']} AND (role='manager' OR role='admin')")
        manager = manager.fetchone();

        if manager is None: 
            cookie['error'] = True
            self.send_dict_response(cookie)
            return;

        res = cur.execute(f"SELECT * FROM u_order WHERE order_status='wait'")
        res = res.fetchmany(50)
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
        
        self.send_header("Content-type", "application/json")
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        
        print("DATA +")
        print(data)
        print("DATA -")

        with open("test.bin", 'wb') as file:
            file.write(data)

        cookie = {}
        cookie['error'] = True

        import base64
        with open("test.bin", 'rb') as output:
            cookie['img'] = base64.b64encode(output.read()).decode('utf-8')
            
        self.send_dict_response(cookie)



    elif self.path == '/becomed_driver/':
        self.send_response(200)
        self._send_cors_headers()
        
        self.send_header("Content-type", "text/html")
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
        self.end_headers()

        dataLength = int(self.headers["Content-Length"])
        data = self.rfile.read(dataLength)
        data = json.loads(data.decode())
        print(data)
        cookie = {}


        from geopy.geocoders import Nominatim #Подключаем библиотеку
        from geopy.distance import geodesic #И дополнения
        geolocator = Nominatim(user_agent="Tester")
        location_1 = geolocator.geocode(data['a']) #Получаем полное название первого города
        location_2 = geolocator.geocode(data['b']) #Получаем полное название второго города

        gps_point_1 = location_1.latitude, location_1.longitude #Выводим координаты первого города
        gps_point_2 = location_2.latitude, location_2.longitude #Выводим координаты второго города

        result=geodesic(gps_point_1, gps_point_2).kilometers

        cookie['result'] = result
        cookie['error'] = False
        print(cookie)
        self.send_dict_response(cookie)


    else: print(self.path)
    
    

print("Starting server")
httpd = HTTPServer(("127.0.0.1", 8000), RequestHandler)
print("Hosting server on port 8000")
httpd.serve_forever()