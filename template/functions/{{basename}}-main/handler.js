'use strict';

import Promise from 'bluebird';
import rp from 'request-promise';

export let handler = (event, context) => {
    // must return a promise, a JSON.stringify compatible data, null or nothing.
    console.log(event);

    let words = event.words;
    let response_url = event.response_url;

    return Promise.delay(3000)
    .then(() => {
        let response_body = {
            "response_type" : "ephemeral",
            "attachments" : [
                {
                    "text" : `${words}`,
                    "color" : "#08C"
                }
            ]
        };
        let options = {
            method: "POST",
            uri: response_url,
            body: response_body,
            json: true
        };
        console.log(response_body);

        return rp(options)
        .then((body) => {
            return body;
        });
    })
    .then((body) => {
        console.log(body);
        return context.done(null, body);
    })
    .catch(
        (err) => { console.log(err); }
    );
}

