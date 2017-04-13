var express = require('express');
var router = express.Router();

router.get('/dynamodbput', function(req, res) {
    res.render('apisample',{
        pageTitle: 'API Sample',
        urlEncode: 'POST http://localhost:3000/api/dynamodbput',
        apiUsage: 'create a new row of package information in the table',
        pageID: 'form1'
    });
});

router.get('/setuppackage', function(req, res) {
    res.render('apisample',{
        pageTitle: 'API Sample',
        urlEncode: 'POST http://localhost:3000/api/setuppackage',
        apiUsage: 'set up a empty package in table',
        pageID: 'form2'
    });
});

router.get('/dynamodbupdateall', function(req, res) {
    res.render('apisample',{
        pageTitle: 'API Sample',
        urlEncode: 'POST http://localhost:3000/api/dynamodbupdateall',
        apiUsage: 'update the latest package information with all arttributes',
        pageID: 'form3'
    });
});

router.get('/dynamodbupdateuser', function(req, res) {
    res.render('apisample',{
        pageTitle: 'API Sample',
        urlEncode: 'POST http://localhost:3000/api/dynamodbupdateuser',
        apiUsage: 'update the latest package information with user ID',
        pageID: 'form4'
    });
});

router.get('/dynamodbupdatesensor', function(req, res) {
    res.render('apisample',{
        pageTitle: 'API Sample',
        urlEncode: 'POST http://localhost:3000/api/dynamodbupdatesensor',
        apiUsage: 'update the latest package information with sensor info',
        pageID: 'form5'
    });
});

router.get('/dynamodbupdatelocation', function(req, res) {
    res.render('apisample',{
        pageTitle: 'API Sample',
        urlEncode: 'POST http://localhost:3000/api/dynamodbupdatelocation',
        apiUsage: 'update the latest package information with location',
        pageID: 'form6'
    });
});

router.get('/dynamodbdelete', function(req, res) {
    res.render('apisample',{
        pageTitle: 'API Sample',
        urlEncode: 'POST http://localhost:3000/api/dynamodbdelete',
        apiUsage: 'delete the latest package information if customer canceled?',
        pageID: 'form7'
    });
});
module.exports = router;