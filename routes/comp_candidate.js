var express = require('express');
var router = express.Router();
const Comp_CandidateModel = require('../models/Comp_Candidate.model');

router.get('/',function(req, res, next) {
    // ? lấy danh sách quản lý ứng viên
    
    res.render('Comp_Can_Mange',{
        title: "Quản lý danh sách ứng viên"
    });
});


// ! get search 

router.get('/search', function(req, res, next) {

    res.render('Search_Candidate',{
        title: "Tìm kiếm ứng viên"
    });
});


module.exports = router;