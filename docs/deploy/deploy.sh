#/bin/sh
# Reimport the API via the OpenAPI 3.0 doc
aws apigatewayv2 reimport-api \
    --body fileb://swagger.yaml \
    --fail-on-warnings \
    --region us-west-2 \
    --api-id 5t8dvdidxd \
    --output json \
    --no-cli-auto-prompt \
    --no-cli-pager

# Update an associated stage/deployment
aws apigatewayv2 update-stage \
    --api-id 5t8dvdidxd \
    --region us-west-2 \
    --stage-name api \
    --no-cli-pager