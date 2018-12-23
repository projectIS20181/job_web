
var express = require("express");
var router = express.Router();
const RecruitmentModel = require('../models/Recruitment.model');
const IndustryModel = require('../models/Industry.model');
const userRouter = require('./user');
const COMPANY_CANDIDATE = require('../configs/constant').COMPANY_CANDIDATE;
const GENDER = require('../configs/constant').GENDER;
const TYPE_SALARY = require('../configs/constant').TYPE_SALARY;
const JOB_TYPE =  require('../configs/constant').JOB_TYPE;
const CONSTANT = {COMPANY_CANDIDATE, GENDER, TYPE_SALARY, JOB_TYPE}
 
// todo lấy toàn bộ bảng recruitment
router.get('/',userRouter.ensureAuthenticated, function(req, res, next ) {
    // todo lấy danh sách rec đổ ra biến rec
    // var rec = RecruitmentModel.getListRec();
    // console.log("req.user",req.user);
    var user = req.user ? req.user : undefined;
    RecruitmentModel.getListRec(user.company_user.company_id_fk,0)
    .then(result => {
        var data = result.data;
        if(data.status === "SUCCESS"){
            let listRec = data.results;
            // console.log("danh sách công việc là:",listRec);
            res.render('Rec_Mange', {
                listRec: listRec,
                user: user,
                title:" QUẢN LÝ BÀI ĐĂNG "
            });
        }else {
            res.render('Rec_Mange', {
                listRec: undefined,
                user: user,
                title:" QUẢN LÝ BÀI ĐĂNG "
            });
        }
    }).catch(err => next(err));
})

// todo get list rec by type_post
router.get('/list/:type_post',userRouter.ensureAuthenticated,function(req, res, next){
    // var type_post = req.params.type_post,
    // var rec = RecruitmentModel.getListRecByTypePost(type_post); 
    var user = req.user ? req.user : undefined;
    res.render('Rec_Mange_list',{
        user:user,
        title: "LẤY DANH SÁCH BÀI ĐĂNG THEO KIỂU "
    })
})

// todo get 1 công việc để update
router.get('/get_by_id_update/:rec_id',userRouter.ensureAuthenticated, function(req, res, next ) {
    var rec_id = req.params.rec_id;
    rec_id = parseInt(rec_id,10);
    console.log("rec_id",rec_id);
    var user = req.user ? req.user : undefined;
    if( rec_id === undefined || rec_id ==="" || rec_id <=0) {
        res.redirect('recruitment');
    } else {
        Promise.all([IndustryModel.getIndustryList(),RecruitmentModel.getRecruitmentById(rec_id)])
        // RecruitmentModel.getRecruitmentById(rec_id)
        .then(respone => {
            var resultIndustry = respone[0].data;
            var resultRec =respone[1].data;

            // console.log("data",respone[0].data);
            // console.log("data",respone[1].data);
            if(resultIndustry.status === "SUCCESS" && resultRec.status ==="SUCCESS" ){
                let listIndustry = resultIndustry.results;
                let recruitment = resultRec.result;
                // console.log("---",listIndustry,recruitment);
                res.render('Rec_Update',{
                    user: user,
                    listIndustry: listIndustry,
                    recruitment: recruitment,
                    title:" Sửa công việc",
                    constant: CONSTANT,
                });
            } else {
                res.redirect("/recruitment");
            }
        }).catch(err => next(err));
    }
})

// todo get add rec
router.get('/add_new_recruitment',userRouter.ensureAuthenticated, function(req,res, next){
    var user = req.user ? req.user : undefined;
    console.log("user", user);
    IndustryModel.getIndustryList()
    .then(result => {
        var data = result.data;
        console.log("list",data);
        if(data.status === "SUCCESS"){
            let listIndustry = data.results;
            res.render('Rec_Add',{
                constant: CONSTANT,
                user: user,
                listIndustry: listIndustry,
                recruitment: undefined,
                title:" thêm mới một công việc",
            });
        }
    }).catch(err => next(err));
});

// todo post add rec
router.post('/add_new_recuitment',userRouter.ensureAuthenticated, function(req, res, next) {
    let recruitment = req.body;
    RecruitmentModel.addNewRecruitment(recruitment).then(result => {
        var data = result.data;
        console.log("data res server ctr",data);
        // next(false);
        if (data.status === "FAILED") {
            console.log(data.message);
            res.redirect('/recruitment/add_new_recuitment');
        }
        res.redirect('/recruitment');
    }).catch( err => next(err));
});




// todo post update rec
router.post('/update_recruitment', function (req, res, next) {
    let recruitment =req.body;
    console.log("update:", recruitment);
    RecruitmentModel.updateRecById(recruitment).then(result => {
        var data = result.data;
        console.log("resutl update:",data);
        if(data.status ==="SUCCESS"){
            res.redirect('/recruitment');
        } else 
        res.redirect('/recruitment/get_by_id/'+parseInt(recruitment.recruitment_id));
    }).catch(err => next(err));
});


// todo get view rec
router.get('/get_by_id_view/:rec_id',( req, res, next) => {
    var rec_id = req.params.rec_id;
    rec_id = parseInt(rec_id,10);
    console.log("rec_id",rec_id);
    var user = req.user ? req.user : undefined;
    if( rec_id === undefined || rec_id ==="" || rec_id <=0) {
        res.redirect('recruitment');
    } else {
        Promise.all([IndustryModel.getIndustryList(),RecruitmentModel.getRecruitmentById(rec_id)])
        // RecruitmentModel.getRecruitmentById(rec_id)
        .then(respone => {
            var resultIndustry = respone[0].data;
            var resultRec =respone[1].data;

            // console.log("data",respone[0].data);
            // console.log("data",respone[1].data);
            if(resultIndustry.status === "SUCCESS" && resultRec.status ==="SUCCESS" ){
                let listIndustry = resultIndustry.results;
                let recruitment = resultRec.result;
                // console.log("---",listIndustry,recruitment);
                res.render('Rec_View',{
                    constant: CONSTANT,
                    user: user,
                    listIndustry: listIndustry,
                    recruitment: recruitment,
                    title:" Xem chi tiết bài đăng tuyển",
                });
            } else {
                res.redirect("/recruitment");
            }
        }).catch(err => next(err));
    }
});

// todo delete rec by id
router.get('/delete_by_id/:rec_id',userRouter.ensureAuthenticated, (req, res, next) => {
    let rec_id = req.params.rec_id || "";
    if(rec_id =="" || rec_id === undefined) {
        res.redirect('/recruitment');  
    } else {
        RecruitmentModel.deleteRecById(rec_id)
        .then(result => {
            var data = result.data;
            if (data.status === "SUCCESS") {
                console.log(data.message);
                res.redirect('/recruitment');
            }
            res.redirect('/recruitment');
        }).catch(err => next(err));
    }

})

// todo submit delet by id
router.get('/delete/submit/:rec_id',userRouter.ensureAuthenticated, (req,res, next) =>{
    let rec_id = req.params.rec_id;
    RecruitmentModel.deleteRecById(rec_id).then(result=> {
        var data = result.data;
        console.log("data delete rec ",data);
        if(data.status ==="FAILED"){
            console.log(data.message);
        }
        res.redirect('/recruitment');
    })
})
module.exports = router;
