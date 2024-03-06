#!/bin/bash

# Replace the environment variables in the swagger_deployment YAML
#envsubst < ../swagger_deployment.yaml > ../swagger.yaml

#echo ${{ vars.COGNITO_AUDIENCE_1 }}

cat ../swagger_deployment.yaml > ../swagger.yaml