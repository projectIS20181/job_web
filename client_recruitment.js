var http = require('http');
var util = require('util');
[
  "/recruitment/get_by_industry_id/1"
].forEach(path => {
    util.log('requesting ' + path);
    var req = http.request({
      host: "localhost",
      port: 3000,
      path: path,
      method: 'GET'
    }, res => {
      res.on('data', chunk => {
          util.log('BODY: ' + chunk);
        // var chunkObj = JSON.parse(chunk).results;
        // util.log('BODY: ' + chunkObj);
    });
    });
    req.end();
});
