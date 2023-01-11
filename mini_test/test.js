const fs = require('fs');

const request = require('request');

request('https://nodejs.org/docs/latest-v14.x/api/cluster.json',(error, response, body) => {
    fs.writeFileSync('./cluster.json',body);
})
