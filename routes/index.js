var express = require('express');
var router = express.Router();
var jobs = require('../models/job_memory');


/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.get('/', function(req, res, next) {
  jobs.keylist()
  .then(keylist => {
    var keyPromise = [];
    for (const key of keylist) {
      keyPromise.push(
        jobs.read(key)
        .then(job => {
          return {key: job.key, tieu_de: job.tieu_de};
        })
      );
    }
    return Promise.all(keyPromise);
  })
  .then(joblist => {
    res.render('index', {title:'Jobs', joblist: joblist});
  })
  .catch(err => {next(err);});
});


module.exports = router;
