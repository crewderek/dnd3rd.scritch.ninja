# Example usage:
# try:
#     mysql_handler = MySQLHandler(host='your_host', user='your_user', password='your_password', database='your_database')
#     mysql_handler.connect()
#     mysql_handler.insert_record('your_table', {'column1': 'value1', 'column2': 'value2'})
#     mysql_handler.update_record('your_table', {'column1': 'new_value'}, 'column2 = "value2"')
#     mysql_handler.call_stored_procedure('your_stored_procedure', [param1, param2])
# finally:
#     if mysql_handler:
#         mysql_handler.disconnect()
import logging

import pymysql
import json
import uuid

from user_exceptions import *
from http_response import http_response


class MySQLHandler:
    def __init__(self, db_config):
        self.host = db_config['host']
        self.user = db_config['user']
        self.password = db_config['password']
        self.database = db_config['database']
        self.connection = None
        self.cursor = None

    def connect(self):
        try:
            self.connection = pymysql.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
                cursorclass=pymysql.cursors.DictCursor
            )
            self.cursor = self.connection.cursor()
            logging.info("Connected to MySQL database")
        except pymysql.Error as e:
            logging.exception(f"Error connecting to MySQL database: {e}")
            raise

    def disconnect(self):
        try:
            if self.connection:
                self.connection.close()
                logging.info("Disconnected from MySQL database")
        except pymysql.Error as e:
            logging.exception(f"Error disconnecting from MySQL database: {e}")
            raise

    def execute_query(self, query, params=None):
        try:
            self.cursor.execute(query, params)
            self.connection.commit()
            result = self.cursor.fetchall()
            return http_response(200, result)
        except pymysql.Error as pe:
            self.connection.rollback()
            sqlErrorState = pe.args[0]
            sqlErrorMessage = pe.args[1]
            if sqlErrorState == 404:
                raise MySQLItemsNotFound(sqlErrorMessage)
            elif sqlErrorState == 403:
                raise MySQLUserNotFound(sqlErrorMessage)
            elif sqlErrorState == 400:
                raise MySQLRequestFailed(sqlErrorMessage)
        except Exception as e:
            self.connection.rollback()
            raise e



    def insert_record(self, table, data):
        try:
            columns = ', '.join(data.keys())
            values = ', '.join(['%s' for _ in data])
            query = f"INSERT INTO {table} ({columns}) VALUES ({values})"
            return self.execute_query(query, tuple(data.values()))
        except Exception as e:
            logging.exception(f"Error inserting record: {e}")
            raise

    def update_record(self, table, data, condition):
        try:
            set_clause = ', '.join([f"{key}=%s" for key in data])
            query = f"UPDATE {table} SET {set_clause} WHERE {condition}"
            return self.execute_query(query, tuple(data.values()))
        except Exception as e:
            logging.exception(f"Error updating record: {e}")
            raise

    def call_stored_procedure(self, procedure_name, params=None):
            param_string = ', '.join(['%s' for _ in params]) if params else ''
            query = f"CALL {procedure_name}({param_string})"
            result = self.execute_query(query, params)
            return result

    # def convert_binary_to_uuid_string(self, obj):
    #     if isinstance(obj, dict):
    #         # Recursively iterate through dictionary items
    #         return {key: self.convert_binary_to_uuid_string(value) for key, value in obj.items()}
    #     elif isinstance(obj, list):
    #         # Recursively iterate through list items
    #         return [self.convert_binary_to_uuid_string(item) for item in obj]
    #     elif isinstance(obj, bytes):
    #         # Convert binary data to UUID string
    #         return str(uuid.UUID(bytes=obj))
    #     else:
    #         return obj