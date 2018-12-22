
var express = require("express");
var router = express.Router();
const RecruitmentModel = require('../models/Recruitment.model');
const userRouter = require('./user');

// todo lấy toàn bộ bảng recruitment
router.get('/',userRouter.ensureAuthenticated, function(req, res, next ) {
    // todo lấy danh sách rec đổ ra biến rec
    // var rec = RecruitmentModel.getListRec();
    console.log("req.user",req.user);
    var user = req.user ? req.user : undefined;
    res.render('Rec_Mange', {
        user: user,
        title:" QUẢN LÝ BÀI ĐĂNG "
    });
});

// todo get list rec by type_post
router.get('/list/:type_post',userRouter.ensureAuthenticated,function(req, res, next){
    // var type_post = req.params.type_post,
    // var rec = RecruitmentModel.getListRecByTypePost(type_post); 
    var user = req.user ? req.user : undefined;
    res.render('Rec_Mange_list',{
        user:user,
        title: "LẤY DANH SÁCH BÀI ĐĂNG THEO KIỂU "
    })
} )

// todo get add rec
router.get('/add_new_recruitment',userRouter.ensureAuthenticated, function(req,res, next){
    var user = req.user ? req.user : undefined;
    res.render('Rec_Add',{
        user: user,
        title:" thêm mới một công việc",
        recruitment: undefined,
    });
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
            res.redirect('//recruitment/add_new_recuitment');
        }
        res.redirect('/recruitment');
    }).catch( err => next(err));
});

// todo get update recruitment
router.get('/update_recruitment/:rec_id',userRouter.ensureAuthenticated, function(req, res, next){
    var user = req.user ? req.user : undefined;
    var rec_id = req.params.rec_id;
    var recruitment = RecruitmentModel.getRecruitmentById(rec_id) || undefined;
    res.render('Rec_Update',{
        user: user,
        title:" CẬP NHẬT CÔNG VIỆC",
        recruitment: recruitment,
    });
});

// todo post update rec
router.post('/update_recruitment', function (req, res, next) {
    let recruitment =req.body;
    RecruitmentModel.updateRecById(recruitment).then(result => {
        var data = result.data;
        console.log("data  update rec ",data);
        if(data.status ==="FAILED"){
            console.log(data.message);
        }
        res.redirect('/recruitment');
    }).catch(err => next(err));
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

// todo delete rec by id
router.get('/delete/:rec_id',userRouter.ensureAuthenticated, (req, res, next) => {
    let rec_id = req.params.rec_id;
    res.redirect('/recruitment/delete/submit/'+rec_id)

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
