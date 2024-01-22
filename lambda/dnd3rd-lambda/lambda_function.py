import json
import os
import urllib.request
import re
import logging


from MySQLHandler import MySQLHandler
from character import CharacterClient
from ability import AbilityClient
# from ability import AbilitiesClient
from http_response import http_response


cognito_user_id = None

# Read the JSON file
with open('./routes.json', 'r', encoding='utf-8') as file:
    json_data = file.read()
# Parse the JSON data
parsed_data = json.loads(json_data)

# Replace these values with your MySQL database connection details
db_config = {
    'host': os.environ['DB_HOST'],
    'user': os.environ['DB_USER'],
    'password': os.environ['DB_PASSWORD'],
    'database': os.environ['DB_NAME']
}


def lambda_handler(event, context):
    global cognito_user_id
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
        response = http_response(404, 'API path not found.')
        return response.response

    function_to_call = globals()[functionCall]
    function_return = function_to_call(event, mysql_handler)
    return function_return


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
def get_characters_for_user(event, mysql_handler):
    global cognito_user_id
    # query_string_parameters = event.get('queryStringParameters', {})
    character = CharacterClient(mysql_handler)
    result = character.get_characters_associated_with_user(cognito_user_id)
    return result

# Return the character
def get_character(event, mysql_handler):
    global cognito_user_id
    query_string_parameters = event.get('queryStringParameters', {})
    character = CharacterClient(mysql_handler)
    return character.get_character_by_character_id(cognito_user_id, query_string_parameters['characterId'])


# Create the character
def create_character(event, mysql_handler):
    global cognito_user_id
    character = CharacterClient(mysql_handler)
    items = event['body']
    return character.create_character(items, cognito_user_id)


# Return the abilities
def get_abilities(event, mysql_handler):
    global cognito_user_id
    query_string_parameters = event.get('queryStringParameters', {})
    character_id = query_string_parameters['characterId']
    ability = AbilityClient(mysql_handler)
    result = ability.get_abilities(cognito_user_id, character_id)
    return result


# Create the character
def create_ability(event, mysql_handler):
    global cognito_user_id
    character = AbilityClient(mysql_handler)
    items = event['body']
    return character.create_ability(items, cognito_user_id)