var express = require('express');
var router = express.Router();
const Comp_CandidateModel = require('../models/Comp_Candidate.model');
const userRouter = require('./user');

router.get('/',userRouter.ensureAuthenticated, function(req, res, next) {
    // ? lấy danh sách quản lý ứng viên
    var user = req.user ? req.user : undefined;
    res.render('Comp_Can_Mange',{
        user: user,
        title: "Quản lý danh sách ứng viên"
    });
});


//* get tìm kiếm form 

router.get('/search',userRouter.ensureAuthenticated, function(req, res, next) {
    var user = req.user ? req.user : undefined;
    res.render('Search_Candidate',{
        user: user,
        title: "Tìm kiếm ứng viên"
    });
});

router.post('/search',userRouter.ensureAuthenticated, function(req, res, next) {
    var user = req.user ? req.user : undefined;
    var conditionSearch = req.body;
    Comp_CandidateModel.getList(conditionSearch).then( result => {
        var data = result.data;
        console.log("dữ liệu tìm kiếm: ",data );
        if(data.status = "SUCCESS") {
            let listCandidate = data.results;
            console.log("dữ liệu tìm kiếm: ",listCandidate );
            res.render('Search_Can_result',{
                user: user,
                listCandidate: listCandidate,
                title: "Kết quả tìm kiếm"
            });
        } else {
            
        } 
    }).catch( err => next(err));

    // var listCandidate = Comp_CandidateModel.getList(conditionSearch).then(result =>{ return result});
    // console.log(listCandidate);
    // next(false);
});

module.exports = router;