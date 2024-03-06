#!/bin/bash

# Replace the environment variables in the swagger_deployment YAML
#envsubst < ../swagger_deployment.yaml > ../swagger.yaml

echo ${{ env.COGNITO_AUDIENCE_1 }}