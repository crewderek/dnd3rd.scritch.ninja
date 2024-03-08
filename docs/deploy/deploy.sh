#!/bin/sh
# Reimport the API via the OpenAPI 3.0 doc
aws apigateway put-rest-api \
  --rest-api-id v288jal5qi \
  --no-cli-pager \
  --fail-on-warnings \
  --mode overwrite \
  --body 'fileb://../swagger.yaml'


aws apigateway create-deployment \
  --rest-api-id v288jal5qi \
  --stage-name api \
  --no-cli-pager