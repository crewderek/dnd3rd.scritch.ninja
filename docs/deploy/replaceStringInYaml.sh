#!/bin/bash

original_file_path="../swagger_deployment.yaml"
temp_file_path="../swagger.yaml.tmp"
new_file_path="../swagger.yaml"

# Create the temp file
cat "$original_file_path" > "$temp_file_path"

# Change $ref to something else so the envsubst command doesn't remove them
sed -i 's/\$ref/\?ref/g; s/\$request/\?request/g' "$temp_file_path"

# Replace the environment variables in the swagger_deployment YAML
envsubst < $temp_file_path  > "$new_file_path"

# Change the $refs back
sed -i 's/\?ref/\$ref/g; s/\?request/\$request/g' "$new_file_path"

rm "$temp_file_path"