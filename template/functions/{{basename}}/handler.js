'use strict';

import SlackBot from 'lambda-slack-router';
import AWS from 'aws-sdk';
import Promise from 'bluebird';

const slackbot = new SlackBot({ token: process.env.SLACK_VERIFICATION_TOKEN });

const Lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
const main_function_name = process.env.LAMBDA_MAIN_FUNCTION_NAME;
Promise.promisifyAll(Object.getPrototypeOf(Lambda), { suffix: 'Promise' });

slackbot.addCommand('ping', 'Ping the lambda', (options, callback) => {
  callback(null, slackbot.inChannelResponse('Hello World'));
});

slackbot.addCommand('echo', ['words...'], 'Echo the given arguments', (options, callback) => {
  callback(null, slackbot.ephemeralResponse(options.args.words.join(' ')));
});

slackbot.addCommand('delay', ['words...'], 'Echo the given arguments with delay', (options, callback) => {
    console.log(options);

    let words = options.args.words.join(' ');

    let payload = JSON.stringify({
        words: words,
        response_url: options.body.response_url
    });

    return Lambda.invokePromise({
        FunctionName: main_function_name,
        InvocationType: 'Event',
        Payload: payload
    })
    .then((response) => {
      console.log(`Status code = ${response.StatusCode}`);
      return callback(null, slackbot.ephemeralResponse('A monkey has been sent to process your request.'));
    })
    .catch((err) => {
      console.error(err);
      return callback(`Error in processing request: ${err}`);
    });
});

module.exports.handler = slackbot.buildRouterWithContext();
module.exports.slackbot = slackbot;
