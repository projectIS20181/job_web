'use strict';

module.exports =  class Job {
    constructor(key
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
                ) 
    {
        this.key = key
        ,this.company_id = company_id
        ,this.industry_id = industry_id
        ,this.work_id = work_id
        ,this.position = position
        ,this.description = description
        ,this.requirement = requirement
        ,this.location = location
        ,this.min_salary = min_salary
        ,this.max_salary = max_salary
        ,this.type_salary = type_salary
        ,this.type_candidate = type_candidate
        ,this.deadline = deadline
        ,this.job_tags = job_tags
    }
};