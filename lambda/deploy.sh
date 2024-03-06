#!/bin/bash

# Upload the codes to Lambda
aws lambda update-function-code \
--function-name=$LAMBDA_FUNCTION_NAME \
--zip-file=fileb://dnd3rd-lambda/lambdaToDeploy.zip \
--region us-west-2

# Secrets Manager details
SECRET_NAME="$REDIS_SECRETS_NAME"
USERNAME_ENV_VAR="REDIS_USERNAME"
PASSWORD_ENV_VAR="REDIS_PASSWORD"
HOST_ENV_VAR="REDIS_HOST"
PORT_ENV_VAR="REDIS_PORT"


# Retrieve secret value from Secrets Manager
SECRET_VALUE=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --region $AWS_REGION --output json | jq -r .SecretString)

# Extract the environment variable value from the secret
DB_USERNAME=$(echo $SECRET_VALUE | jq -r .username)
DB_PASSWORD=$(echo $SECRET_VALUE | jq -r .password)
DB_HOST=$(echo $SECRET_VALUE | jq -r .host)
DB_PORT=$(echo $SECRET_VALUE | jq -r .port)

# Update Lambda environment variables
aws lambda update-function-configuration \
  --function-name $LAMBDA_FUNCTION_NAME \
  --environment "Variables={ DB_NAME=$DB_NAME, $USERNAME_ENV_VAR=$DB_USERNAME, $PASSWORD_ENV_VAR=$DB_PASSWORD, $HOST_ENV_VAR=$DB_HOST, $PORT_ENV_VAR=$DB_PORT}" \
  --region $AWS_REGION > output.tmp

echo "Completed Lambda configuration."