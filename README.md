# khaos-serverless-slackbot

A Khaos Template to create a [serverless](https://github.com/serverless/serverless) project with Slack command integration.

Features:

* Write the codes in ES6 syntax (using [serverless-runtime-babel](https://github.com/serverless/serverless-runtime-babel))
* Auto routing based on the command input (using [lambda-slack-router](https://github.com/canyousayyes/lambda-slack-router))
* Resources and skeleton codes for Slash Command delayed responses, allowing more complex code execution without timeout error.

All Slash commands expect response within 3000ms, or it will show timeout error to users.

To avoid timeout error for more complex commands (e.g. accessing databse, sending another HTTP requests), we have to invoke another AWS Lambda function to process the main logic, and reply to the orignal request immediately.

This template includes an example for such pattern.


## Setup

1. Go to the [Slack custom integration page](https://slack.com/apps/manage/custom-integrations).
2. Click into "Slash Commands" and create a new Command.
3. In the integration settings page, copy the Token value.
4. Install a new project in your local environment
```
npm install -g khaos
khaos create canyousayyes/khaos-serverless-slackbot <project-name>

(Fill in the author name, Slack token, etc.)

cd <project-name>
npm install
sls project init

(Fill in the stage, profile, region, etc.)
```

## Deployment
Please refer to the README.md under the created template directory.

## TODO
* Update to use serverless v1 when it's officially released.
* Update dependent packages for testing.

## Credit
* This template is based on https://github.com/localytics/serverless-slackbot-scaffold
* The idea of invoking another Lambda function within the slack command is based on the example provided by [Claudia.js](https://github.com/claudiajs/example-projects/tree/master/slack-delayed-response)