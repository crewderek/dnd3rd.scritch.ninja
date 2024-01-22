import json

class MySQLUserNotFound(Exception):
    def __init__(self, message="The specified user could not be found in the database."):
        super().__init__(message)
    pass

class MySQLItemsNotFound(Exception):
    def __init__(self, message="The specified item(s) could not be found in the database."):
        super().__init__(message)
    pass

class MySQLRequestFailed(Exception):
    def __init__(self, message="The specified item(s) could not be found in the database."):
        super().__init__(message)
    pass

class MySQLFailedOnInsert(Exception):
    def __init__(self, message="The specified item(s) could not be found in the database."):
        super().__init__(message)
    pass