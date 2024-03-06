#!/bin/bash

original_file_path="../swagger_deployment.yaml"
new_file_path="../swagger.yaml"

# Change $ref to something else so the envsubst command doesn't remove them
sed -i 's/\$ref/\?ref/g' "$original_file_path"

# Replace the environment variables in the swagger_deployment YAML
envsubst < $original_file_path  > $new_file_path

# Change the $refs back
sed -i 's/\?ref/\$ref/g' "$new_file_path"