import json
from decimal import Decimal

class http_response:
    response = None
    
    def __init__(self, statusCode, body):
        self.response = {
                    'statusCode': statusCode,
                    'body': body
                }
        self.response = self.add_proper_return_headers(self.response)
        
        
    def add_proper_return_headers(self, lambda_return):
        json_dump = self.replace_decimals(lambda_return['body'])
        return {
            'statusCode': lambda_return['statusCode'],
            'headers': {
                "Access-Control-Allow-Origin" : "*", # Required for CORS support to work
                "Access-Control-Allow-Credentials" : 'true' # Required for cookies, authorization headers with HTTPS
            },
            'body': json.dumps(json_dump)
        }
        
    def replace_decimals(self, obj):
        if isinstance(obj, Decimal):
            # Convert Decimal to int or float based on whether the value is an integer
            return int(obj) if obj % 1 == 0 else float(obj)
        elif isinstance(obj, dict):
            # Recursively convert Decimal in nested dictionaries
            return {key: self.replace_decimals(value) for key, value in obj.items()}
        elif isinstance(obj, list):
            # Recursively convert Decimal in lists
            return [self.replace_decimals(item) for item in obj]
        return obj