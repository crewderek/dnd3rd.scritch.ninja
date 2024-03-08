import json
import os
import urllib.request
import re
import logging
from redis import Redis

from MySQLHandler import MySQLHandler
from character import CharacterClient
from ability import AbilityClient
from weapon import WeaponClient
# from ability import AbilitiesClient
from http_response import http_response

# Read the JSON file
with open('./routes.json', 'r', encoding='utf-8') as file:
    json_data = file.read()
# Parse the JSON data
parsed_data = json.loads(json_data)
region_name = "us-west-2"
redis_host = os.environ['REDIS_HOST']
redis_port = os.environ['REDIS_PORT']
redis_username = os.environ['REDIS_USERNAME']
redis_password = os.environ['REDIS_PASSWORD']

db_config = None
sql_database = os.environ['DB_NAME']


def lambda_handler(event, context):
    global db_config

    #   Check if we are cached and set, if not we need to get the data
    if db_config is None:
        redis = Redis(host=redis_host, port=redis_port, decode_responses=True, username=redis_username,
                      password=redis_password)

        db_config = {
            'host': redis.get('host'),
            'user': redis.get('username'),
            'password': redis.get('password'),
            'database': sql_database
        }

    cognito_user_id = None
    mysql_handler = None
    #   Check if we are a string or a dictionary AND if we are coming from the API gateway
    #   Dictionary comes from testing lambda
    #   String comes with an HTTP object/method
    if (is_request_from_api_gateway(event) and type(event['body']) == str):
        event['body'] = json.loads(event['body'])

    # Insert the Cognito User ID
    if 'requestContext' in event and 'authorizer' in event['requestContext']:
        # Extract Cognito User ID from the claims in the authorization context
        cognito_user_id = event['requestContext']['authorizer']['claims']['sub']
    # We CAN NOT continue if we don't have the sub
    elif is_request_from_api_gateway(event):
        logging.exception('The Cognito Authorizer could not be found or verified.')
        response = http_response(500, 'An internal error has occurred.')
        return response.response


    try:
        #   Start the MySQL call
        mysql_handler = MySQLHandler(db_config=db_config)
        mysql_handler.connect()
    except Exception as e:
        logging.exception('The connection to the MySQL database has failed.')
        response = http_response(500, 'An internal error has occurred.')
        return response.response

    functionCall = get_path_function(event)

    # We didn't find a path associated with what was sent. Return 404
    if functionCall == None:
        response = http_response(404, 'API path not found. ' + event['path'])
        return response.response

    function_to_call = globals()[functionCall]
    function_return = json.loads(function_to_call(event, mysql_handler, cognito_user_id))

    response = http_response(function_return['statusCode'], function_return['body'])

    return response.response


def is_request_from_api_gateway(event):
    if ('requestContext' in event and 'apiId' in event['requestContext']):
        return True
    else:
        False


def get_path_function(event):
    method = event['httpMethod']
    path = event['path']
    data = parsed_data['paths']

    # Loop through the JSON object and check if the variable matches
    for value in data:
        # If the RegEx isn't set, skip it
        if value["regex"] == "":
            continue

        # Check if that paths match
        match = re.search(value["regex"], path)
        if (value['method'] == method and match):
            return value['function']

    return None


# Return the character
def get_characters_for_user(event, mysql_handler, cognito_user_id):
    # query_string_parameters = event.get('queryStringParameters', {})
    character = CharacterClient(mysql_handler)
    result = character.get_characters_associated_with_user(cognito_user_id)
    return result


# Return the character
def get_character(event, mysql_handler, cognito_user_id):
    query_string_parameters = event.get('queryStringParameters', {})
    character = CharacterClient(mysql_handler)
    return character.get_character_by_character_id(cognito_user_id, query_string_parameters['characterId'])


# Create the character
def create_character(event, mysql_handler, cognito_user_id):
    character = CharacterClient(mysql_handler)
    items = event['body']
    return character.create_character(items, cognito_user_id)


def update_character(event, mysql_handler, cognito_user_id):
    character = CharacterClient(mysql_handler)
    items = event['body']
    return character.update_character(items['characterId'], items['columnName'], items['columnValue'], cognito_user_id)


# Return the abilities
def get_abilities(event, mysql_handler, cognito_user_id):
    query_string_parameters = event.get('queryStringParameters', {})
    character_id = query_string_parameters['characterId']
    ability = AbilityClient(mysql_handler)
    result = ability.get_abilities(cognito_user_id, character_id)
    return result


# Create the character
def create_ability(event, mysql_handler, cognito_user_id):
    character = AbilityClient(mysql_handler)
    items = event['body']
    return character.create_ability(items, cognito_user_id)


def create_weapon(event, mysql_handler, cognito_user_id):
    print('ima do sathing')
    # character = AbilityClient(mysql_handler)
    # items = event['body']
    # return character.create_ability(items, cognito_user_id)


def get_weapons(event, mysql_handler, cognito_user_id):
    query_string_parameters = event.get('queryStringParameters', {})
    character_id = query_string_parameters['characterId']
    weapons = WeaponClient(mysql_handler)
    result = weapons.get_weapons(cognito_user_id, character_id)
    return result
