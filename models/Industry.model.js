'use strict';

const axios = require('axios');

var industryModel = {};

industryModel.connect = function(){
    return new Promise((resolve, reject) => {
        try{
            resolve(axios.create({
                baseURL: process.env.SERVICE_URL|| "http://localhost:3000"
            }));
        } catch(error) {
            reject(error);
        }
    }).then(client => {
        // console.log("client", client);
        return client;
    });
};

// lấy danh sách các mục trong industry 
industryModel.getIndustryList = function(){
    return this.connect().then(client => {
        return client.get(
            "/industry/get_industry_list"
        );
    });
};

module.exports = industryModel;