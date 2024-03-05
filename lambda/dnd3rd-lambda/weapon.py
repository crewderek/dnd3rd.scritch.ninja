from http_response import http_response
from user_exceptions import *
import logging

class WeaponClient:
    def __init__(self, mysql_handler):
        self.handler = mysql_handler

    def get_weapons(self, cognitoUserId, characterId):
        general_exception_message = 'An unexpected error occurred when getting the weapons.'
        storedProcedure = 'sp_getWeaponsByCharacterIdJSON'
        response = None

        try:
            response = self.handler.call_stored_procedure(storedProcedure, [characterId, cognitoUserId])
        except Exception as e:
            logging.exception(e)
            response = http_response(500, general_exception_message)

        return response

    # def create_weapon(self, abilityToInput, cognitoUserid):
    #     general_exception_message = 'An unexpected error occurred when creating the abilities.'
    #     stored_procedure = 'sp_insertAbilityUsingJSONByCharacterId'
    #     dump = json.dumps(abilityToInput)
    #     response = None
    #
    #     try:
    #         response = self.handler.call_stored_procedure(stored_procedure, [dump, cognitoUserid])
    #     except MySQLUserNotFound as munf:
    #         exception_message = 'Unauthorized user for character.'
    #         logging.info(munf)
    #         response = http_response(403, exception_message)
    #     except MySQLFailedOnInsert as mfoi:
    #         exception_message = 'Failed to insert abilities.'
    #         logging.exception(mfoi)
    #         response = http_response(400, exception_message)
    #     except Exception as e:
    #         logging.exception(e)
    #         response = http_response(500, general_exception_message)
    #     if response == None:
    #         logging.exception('The SQL query returned nothing.')
    #         response = http_response(500, general_exception_message)
    #
    #     return response.response