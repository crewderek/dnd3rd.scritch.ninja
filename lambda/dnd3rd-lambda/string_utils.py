import urllib.parse


def replace_placeholders(input_string, replacements):
    for key, value in replacements.items():
        # Make sure the values are encoded for URLs
        value = urllib.parse.quote(value, safe="")
        placeholder = f'{{{{{key}}}}}'
        input_string = input_string.replace(placeholder, value)
    return input_string
    
    