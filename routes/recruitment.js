
var express = require("express");
var router = express.Router();
const RecruitmentModel = require('../models/Recruitment.model');
const userRouter = require('./user');

router.get('/', function(req, res, next ) {
    // todo lấy danh sách rec đổ ra biến rec
    // var rec = RecruitmentModel.getListRec();
    console.log("req.user",req.user);
    res.render('Rec_Mange', {
        user: req.user,
        title:" QUẢN LÝ BÀI ĐĂNG "
    });
});

// todo get add rec
router.get('/add_new_recruitment',function(req,res, next){
    res.render('Rec_Add',{
        title:" thêm mới một công việc",
        recruitment: undefined,
    });
});

// todo post add rec
router.post('/add_new_recuitment', function(req, res, next) {
    let recruitment = req.body;
    RecruitmentModel.addNewRecruitment(recruitment).then(result => {
        var data = result.data;
        console.log("data res server ctr",data);
        // next(false);
        if (data.status === "FAILED") {
            console.log(data.message);
        }
        res.redirect('/recruitment');
        
        // res.redirect('/recruitment/get_rec_by_id/'+data.recruitment_id);
    }).catch( err => next(err));
});

// todo get update recruitment
router.get('/update_recruitment', function(req, res, next){

});

// todo post update rec
router.post('/update_recruitment', function (req, res, next) {

});


// todo get view rec
router.get('/get_rec_by_id/:id',( req, res, next) => {
    let recruitment_id = req.params.id;
    RecruitmentModel.getRecruitmentById(recruitment_id).then(respone => {
        res.render('Rec_view',{
            title: "xem chi tiết công việc",
            recruitment: respone.data
        })
    }).catch(err => next(err));
});

module.exports = router;
