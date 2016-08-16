# {{basename}}


## Deployment

Under the project root directory, type:
```
sls dash deploy
```
Select the both functions and the endpoint to deploy.
```
Serverless: Select the assets you wish to deploy:
    {{basename}}-main
      function - {{basename}}-main
    {{basename}}
      function - {{basename}}
      endpoint - slackbot/{{basename}} - POST
    - - - - -
  > Deploy
    Cancel
```
After the deployment, copy the endpoint to the integration settings page of your Slash Command.
```
Serverless: Deploying endpoints in "prod" to the following regions: us-east-1
Serverless: Successfully deployed endpoints in "prod" to the following regions:
Serverless: us-east-1 ------------------------
Serverless:   POST - slackbot/testing-cmd - https://<endpoint>.amazonaws.com/prod/slackbot/testing-cmd
```

![](https://github.com/canyousayyes/khaos-serverless-slackbot/raw/master/slash_command_settings.png)

Then, type the Slash command in your Slack to confirm. (e.g. `/test delay hello world`)

## Testing

```
npm run lint
npm test
```

## Notes
Due to the nature of AWS Lambda, the command may have timeout after a fresh deployment, since extra time is needed to bring up the containers.

Subsequent requests should be working though.

## Credit
This template is based on https://github.com/localytics/serverless-slackbot-scaffold
