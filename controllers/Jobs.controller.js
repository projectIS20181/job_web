var http = require('http');
const SERVER_API = require('../configs/constant').SERVER_API;
var JobsController = {};

JobsController.saveRecruitment = (recruitment, type) => {
    if(type == 'create'){        
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(recruitment);
            // http://localhost:3000/recruitment/add_new_recuitment
            var postOptions = {
                host: SERVER_API.HOST,
                port: SERVER_API.PORT,
                path: '/recruitment/add_new_recuitment',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(data)
                }
            }
            var postReq = http.request(postOptions, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (data) {
                    resolve(data);
                });
            });
            postReq.write(data);
            postReq.end();
        });
    }
}

module.exports = JobsController;