'use strict';

const axios = require('axios');

var user = {};

user.connect = function(){
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

// todo lấy thông tin đăng nhập
user.getUser = function(user) {
    console.log("log user model",user);
    return this.connect().then(client => {
        return client.post(
            '/users/signin_company',
            {
            email:user.username,
            password:user.password,
            role: 2
            }
        );
    });
};

// todo get_user_by_id
user.getUserById = function(user_id) {
    console.log("user_id on User.model: "+ user_id);
    return this.connect().then(client =>{
        return client.post(
            // todo đường dẫn
            '/users/get_user_by_id',
            {
                id:user_id
            }
        )
    })
}

module.exports = user;

