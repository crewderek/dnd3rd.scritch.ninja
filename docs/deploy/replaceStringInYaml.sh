#!/bin/bash

# Replace the environment variables in the swagger_deployment YAML
envsubst < ../swagger_deployment.yaml > ../swagger.yaml


ls

ls ../