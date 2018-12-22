"use strict"

const axios = require('axios');

var Comp_Candidate = {}

var connect = function(){
    return new Promise((resolve, reject) => {
        try{
            resolve(axios.create({
                baseURL: process.env.SERVICE_URL|| "http://localhost:3000"
            }));
        } catch(error) {
            reject(error);
        }
    }).then(client => {
        // console.log("client: ", client);
        return client;
    });
};

// search candidate 
Comp_Candidate.getList = function(conditionSearch) {
    return connect().then(client => {
        console.log("điều kiện tìm kiếm ứng viên:", conditionSearch);
        return client.post(
            "/users/search_candidate?limit=10&offset=0",
            {
                position: conditionSearch.position,
                degree: conditionSearch.degree,
                job_type: conditionSearch.job_type,
                min_salary: conditionSearch.min_salary,
                max_salary: conditionSearch.max_salary,
                salary_type: conditionSearch.salary_type,
                experience: conditionSearch.experience,
                foreign_lang: conditionSearch.foreign_lang,
                level_foreign_lang: conditionSearch.level_foreign_lang
            }
        );
    });
};

module.exports = Comp_Candidate;



