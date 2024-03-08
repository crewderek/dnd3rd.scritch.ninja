import os

import yaml
import re
def load_components(file_path):
    # Load the YAML file
    with open(file_path, 'r') as file:
        data = yaml.safe_load(file)

    # Extract components
    components = data
    return components

def find_and_replace(yaml, components):
    for x in yaml:
        if(x == 'x-amazon-apigateway-integration'):
            reference = yaml['x-amazon-apigateway-integration']['$ref']

            # Go through the components and check for a match
            for integration in components:
                if integration in reference:
                    yaml['x-amazon-apigateway-integration'] = components.get(integration)

        elif type(yaml) is dict and type(yaml.get(x)) is dict:
            find_and_replace(yaml.get(x), components)

    return yaml

def write_yaml(file_path, data):
    with open(file_path, 'w') as file:
        yaml.dump(data, file, default_flow_style=False)

# def escape_quotes(input_file, output_file):
#     with open(input_file, 'r') as infile:
#         content = infile.read()
#
#     # Use regex to escape quotes at the start and end of each line
#     escaped_content = re.sub(r'(^"|"$)', r'\\"', content, flags=re.MULTILINE)
#
#     with open(output_file, 'w') as outfile:
#         outfile.write(escaped_content)


# Specify the path to the OpenAPI YAML file (same file for components and OpenAPI)
# swagger.yaml.tmp gets created earlier in the deployment process
openapi_file_path = '../swagger.yaml.envSub'
# Specify the input and output file paths
output_file_path = '../swagger.yaml'

# Call the function to escape quotes
# escape_quotes(openapi_file_path, input_file_path)


yaml.Dumper.ignore_aliases = lambda *args : True
# define a custom representer for strings
# yaml.add_representer(str, quoted_presenter)


base_yaml = load_components(openapi_file_path)
find_and_replace(base_yaml['paths'], base_yaml['components']['x-amazon-apigateway-integrations'])
write_yaml(output_file_path, base_yaml)

os.remove(openapi_file_path)