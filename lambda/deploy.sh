aws lambda update-function-code \
--function-name=$LAMBDA_FUNCTION_NAME \
--zip-file=fileb://dnd3rd-lambda/lambdaToDeploy.zip \
--region us-west-2