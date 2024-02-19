from http_response import http_response
from user_exceptions import *
import logging

class CharacterClient:
    def  __init__(self, mysql_handler):
        self.handler = mysql_handler

    def get_characters_associated_with_user(self, cognitoUserId):
        general_exception_message = 'An unexpected error occurred when getting the character.'
        storedProcedure = 'sp_getCharactersByCognitoUserId'
        response = None

        try:
            response = self.handler.call_stored_procedure(storedProcedure, [cognitoUserId])
        except MySQLUserNotFound as munf:
            exception_message = 'User not found.'
            logging.info(munf)
            response = http_response(403)
        except MySQLItemsNotFound as minf:
            exception_message = 'Character not found.'
            logging.info(minf)
            response = http_response(404, exception_message)
        except Exception as e:
            logging.exception(e)
            response = http_response(500, general_exception_message)

        return response.response

    def get_character_by_character_id(self, cognitoUserId, characterId):
        general_exception_message = 'An unexpected error occurred when getting the character.'
        stored_procedure = 'sp_getCharactersByCharacterId'
        response = None

        try:
            response = self.handler.call_stored_procedure(stored_procedure, [characterId, cognitoUserId])
        except MySQLUserNotFound as munf:
            exception_message = 'User not found.'
            logging.info(munf)
            response = http_response(403, exception_message)
        except MySQLItemsNotFound as minf:
            exception_message = 'Character not found.'
            logging.info(minf)
            response = http_response(404, exception_message)
        except Exception as e:
            logging.exception(e)
            response = http_response(500, general_exception_message)

        return response.response

    def create_character(self, characterToInput, cognitoUserid):
        general_exception_message = 'An unexpected error occurred when adding the character.'
        stored_procedure = 'sp_insertCharacterUsingJSONByCognitoUserId'
        dump = json.dumps(characterToInput)
        response = None

        try:
            response = self.handler.call_stored_procedure(stored_procedure, [dump, cognitoUserid])
            response.response['statusCode'] = 201
        except MySQLUserNotFound as munf:
            exception_message = 'User not found.'
            logging.info(munf)
            response = http_response(403, exception_message)
        except MySQLFailedOnInsert as mfoi:
            exception_message = 'Failed to insert character.'
            logging.exception(mfoi)
            response = http_response(400, exception_message)
        except Exception as e:
            logging.exception(e)
            response = http_response(500, general_exception_message)

        return response.response

    def update_character(self, characterId, columnName, columnValue, cognitoUserid):
        general_exception_message = 'An unexpected error occurred when updating the character.'
        stored_procedure = 'sp_dynamicCharacterUpdate'
        response = None

        try:
            response = self.handler.call_stored_procedure(stored_procedure, [columnName, columnValue, characterId, cognitoUserid])
            print(response)
            response.response['statusCode'] = 201
        except MySQLUserNotFound as munf:
            exception_message = 'User not found.'
            logging.info(munf)
            response = http_response(403, exception_message)
        except MySQLFailedOnInsert as mfoi:
            exception_message = 'Failed to updated character.'
            logging.exception(mfoi)
            response = http_response(400, exception_message)
        except Exception as e:
            logging.exception(e)
            response = http_response(500, general_exception_message)

        return response.response