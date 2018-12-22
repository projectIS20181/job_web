'use strict';

const axios = require('axios');

var userModel = {};

userModel.connect = function(){
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
userModel.getUser = function(user) {
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
userModel.getUserById = function(user_id) {
    console.log("user_id on User.model: "+ user_id);
    return this.connect().then(client =>{
        return client.post(
            // todo đường dẫn
            '/users/get_user_com_by_user_id',
            {
                user_id:parseInt(user_id)
            }
        )
    })
}

// todo gửi thông tin đăng kí
userModel.signin = function(object){
    console.log("thông tin đăng kí:", object);
    return this.connect().then(client => {
        return client.post(
            '/users/register_company',
            {
                user: object.user,
                company: object.company
            }
        )
    })
}

// todo xử lý đối tượng đăng kí
userModel.infoSigin = function (object) {
    var x = {user:{}, company:{}};
    x.user.email = object.input_email || "";
    x.user.user_name = object.input_user_name ||"";
    x.user.password = object.input_password || "";
    x.company.company_name = object.input_company_name || "";
    x.company.total_employee = object.input_total_employee || "";
    x.company.intro = object.input_intro || "";
    return x;
}
module.exports = userModel;

