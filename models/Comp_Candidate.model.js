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
        console.log("client: ", client);
        return client;
    });
};

// search candidate 

module.exports = Comp_Candidate;



