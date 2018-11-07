// 'use strict';

var util = require('util');
var express = require('express');
var router = express.Router();
var jobs = require('../models/job_memory');
var JobsController = require('../controllers/Jobs.controller');

router.get('/add',(req, res, next) => {
    res.render('jobedit',{
        title: 'thêm công việc',
        docreate: true,
        jobkey: "",
        job: undefined
    });
});

router.post('/save', (req, res, next) => {
    
    var recruitment = {
        work_name: req.body.jobkey,
        company_id_fk: req.body.company_id,
        industry_id_fk: req.body.industry_id,
        work_id: req.body.work_id,
        position: req.body.position,
        description: req.body.description,
        requirement: req.body.requirement,
        location: req.body.location,
        min_salary: req.body.min_salary,
        max_salary: req.body.max_salary,
        type_salary: req.body.type_salary,
        type_candidate: req.body.type_candidate,
        deadline: req.body.deadline,
        job_tags: req.body.job_tags
    }

    if(req.body.docreate == 'update'){
        recruitment.recruitment_id = req.body.recruitment_id;
    }
    JobsController.saveRecruitment(recruitment, req.body.docreate).then(result => {
        console.log('Response: ', result);
        res.redirect('/jobs/view?key=' + req.body.jobkey);
    }).catch(err => {next(err);});
    
    // var p;
    // if(req.body.docreate ==="create") {
    //     p=jobs.create(
    //             req.body.jobkey
    //             ,req.body.company_id
    //             ,req.body.industry_id
    //             ,req.body.work_id
    //             ,req.body.position
    //             ,req.body.description
    //             ,req.body.requirement
    //             ,req.body.location
    //             ,req.body.min_salary
    //             ,req.body.max_salary
    //             ,req.body.type_salary
    //             ,req.body.type_candidate
    //             ,req.body.deadline
    //             ,req.body.job_tags
    //             );
    // } else {
    //     p=jobs.update(
    //             req.body.jobkey
    //             ,req.body.company_id
    //             ,req.body.industry_id
    //             ,req.body.work_id
    //             ,req.body.position
    //             ,req.body.description
    //             ,req.body.requirement
    //             ,req.body.location
    //             ,req.body.min_salary
    //             ,req.body.max_salary
    //             ,req.body.type_salary
    //             ,req.body.type_candidate
    //             ,req.body.deadline
    //             ,req.body.job_tags
    //             );
    // }
    // p.then(job => {
    //     res.redirect('/jobs/view?key='+req.body.jobkey);
    // })
    // .catch(err => {next(err);});
});

router.get('/view', (req, res, next) => {
    jobs.read(req.query.key)
    .then(job => {
        res.render('jobview',{
            title: job ? job.position : "",
            jobkey: req.query.key,
            job: job
        });
    })
    .catch(err => {next(err);});
});

module.exports = router;