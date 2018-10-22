'use strict';
var jobs= [];
const Job = require('./Job');

exports.update = exports.create = function(key
                                            ,company_id
                                            ,industry_id
                                            ,work_id
                                            ,position
                                            ,description
                                            ,requirement
                                            ,location
                                            ,min_salary
                                            ,max_salary
                                            ,type_salary
                                            ,type_candidate
                                            ,deadline
                                            ,job_tags
    ) {
    return new Promise((resolve, reject) => {
        jobs[key] = new Job(key
            ,company_id
            ,industry_id
            ,work_id
            ,position
            ,description
            ,requirement
            ,location
            ,min_salary
            ,max_salary
            ,type_salary
            ,type_candidate
            ,deadline
            ,job_tags);
        resolve(jobs[key]);
    });
};



exports.read = function(key) {
    return new Promise((resolve, reject ) => {
        if(jobs[key]) resolve(jobs[key]);
        else reject(`Job ${key} does not exist`);
    }); 
};

exports.destroy = function(key) {
    return new Promise((resolve, reject) => {
        if(jobs[key]) {
            delete jobs[key];
            resolve();
        } else reject(`Job ${key} does not exist`);
    });
};

exports.keylist = function() {
    return new Promise((resolve, reject) => {
        resolve(Object.keys(jobs))
    });
};

exports.count = function() {
    return new Promise((resolve, reject) => {
        resolve(jobs.length);
    });
};