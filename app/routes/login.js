var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
    res.render('index',{
        pageTitle: 'Signin',
        pageID: 'signin'
    });
});

module.exports = router;