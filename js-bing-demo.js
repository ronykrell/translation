'use strict';

let https = require('https');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the subscriptionKey string value with your valid subscription key.
let subscriptionKey = 'd9a473a7974d425aae01cff01863c9f0';

// Verify the endpoint URI.  At this writing, only one endpoint is used for Bing
// search APIs.  In the future, regional endpoints may be available.  If you
// encounter unexpected authorization errors, double-check this host against
// the endpoint for your Bing Search instance in your Azure dashboard.
let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/images/search';

let term = 'Do you want to go to the toilet?';
term += ' icon';
let response_handler = function (response) {
    let body = '';
    let linkOne = '';
    let linkTwo = '';
    response.on('data', function (d) {
        body += d;
    });
    response.on('end', function () {
        // console.log('\nRelevant Headers:\n');
        // for (var header in response.headers)
            // header keys are lower-cased by Node.js
            // if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                 // console.log(header + ": " + response.headers[header]);
        linkOne = JSON.stringify(JSON.parse(body)["value"][0]["contentUrl"], null, '  ');
        linkTwo = JSON.stringify(JSON.parse(body)["value"][1]["contentUrl"], null, '  ');
        // print(json.dumps(json.loads(result)["value"][0]["contentUrl"], indent=4))
        // console.log('\nJSON Response:\n');
        console.log(linkOne);
        console.log(linkTwo);

    });
    response.on('error', function (e) {
        console.log('Error: ' + e.message);
    });
};

let bing_image_search = function (search) {
  // console.log('Searching images for: ' + term);
  let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(search),
        headers : {
            'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    let req = https.request(request_params, response_handler);
    req.end();
}

if (subscriptionKey.length === 32) {
    bing_image_search(term);
} else {
    console.log('Invalid Bing Search API subscription key!');
    console.log('Please paste yours into the source code.');
}