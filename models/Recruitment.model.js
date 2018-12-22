"use strict"

const axios = require('axios');

var Recruitment  =  {};

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

//todo post add a rec
Recruitment.addNewRecruitment = function(recruitment)
{
    return connect().then(client => {
        console.log("rec model:  ",recruitment);
        return client.post(
            'recruitment/add_new_recuitment',
            {
                company_id_fk: recruitment.company_id,
                industry_id_fk: recruitment.industry_id,
                work_id:recruitment.work_id,
                work_name: recruitment.work_name,
                position: recruitment.position,
                description: recruitment.description,
                requirement: recruitment.requirement,
                location:recruitment.location,
                min_salary: recruitment.min_salary,
                max_salary: recruitment.max_salary,
                min_age: recruitment.min_age,
                max_age: recruitment.max_age,
                type_salary: recruitment.type_salary,
                type_candidate: recruitment.type_candidate,
                gender_requirement: recruitment.gender_requirement,
                deadline: recruitment.deadline,
                job_tags: recruitment.job_tags,
                type_post: recruitment.type_post,
                deleted: recruitment.deleted
            }
        );
    });
};


// todo get list rec
Recruitment.getListRec = function(){
    
}

// todo get list rec by type post
Recruitment.getListRecByTypePost = function(type_post){

}

//todo get a recruitment by rec_id
Recruitment.getRecruitmentById = function(rec_id){
    return connect().then(client => {
        return client.get('/recruitment/get_rec_by_id',{
            params:{
                id: rec_id,
            }
        });
    });
};

// todo post update a rec
Recruitment.updateRecById = function(recruitment) {

}

// todo delete rec by id 
Recruitment.deleteRecById = function(rec_id) {
    
}


module.exports = Recruitment;