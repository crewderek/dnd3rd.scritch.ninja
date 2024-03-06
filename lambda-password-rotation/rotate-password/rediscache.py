from redis import Redis
import boto3
from botocore.exceptions import ClientError
import json

region_name = "us-west-2"


def change_redis_cache(secret_name, ttl_seconds, credentials):
    redis_client = start_secret_session()
    secret = json.loads(get_secret(redis_client, secret_name))
    # secret_description = get_secret_rotation(redis_client, secret_name)

    redis = Redis(host=secret['host'], port=secret['port'], decode_responses=True, username=secret['username'],
                  password=secret['password'])

    # next_rotation = secret_description['RotationRules']['NextRotationDateTime']
    # print(next_rotation)
    for key, value in credentials.items():
        redis.set(key, value)
        redis.expire(key, ttl_seconds)


def start_secret_session():
    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    return client


def get_secret(secrets_client, secret_name):
    try:
        get_secret_value_response = secrets_client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        #     # For a list of exceptions thrown, see
        #     # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    return get_secret_value_response['SecretString']


# def get_secret_rotation(secrets_client, secret_name):
#     try:
#         get_secret_value_response = secrets_client.describe_secret(
#             SecretId=secret_name
#         )
#     except ClientError as e:
#         #     # For a list of exceptions thrown, see
#         #     # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
#         raise e
#
#     return get_secret_value_response
