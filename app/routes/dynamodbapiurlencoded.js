var express = require('express');
var router = express.Router();


// POST http://localhost:3000/api/dynamodbput
// create a new row of package information in the table
router.put('/api/urlencoded/dynamodbput', function(request, response) {
    var ddb = request.app.get('ddbsetup');
    var item = {packageId: Number(request.body.packageid),
                timestp: Date.now(),
                lastscan: Date(),
                humidity: request.body.humidity,
                userId: request.body.userid,
                temperature: request.body.temperature,
                currLocation: request.body.currlocation };
    ddb.putItem('fooddeliversystem', item, {}, function(err, res, cap) {
        if(err) {
            console.log(err);
        } else {
            console.log('Item inserted to fooddeliversystem:'+cap+'\n' + JSON.stringify(item, null, 2));
      }
    });       
    response.send('Item inserted to fooddeliversystem:\n' + JSON.stringify(item,null,2));
});

// POST http://localhost:3000/api/setuppackage
// set up a empty package in table
router.put('/api/urlencoded/setuppackage', function(request, response) {
    var ddb = request.app.get('ddbsetup');
    var item = {packageId: Number(request.body.packageid),
                timestp: Date.now(),
                lastscan: new Date(),};
    ddb.putItem('fooddeliversystem', item, {}, function(err, res, cap) {
        if(err) {
            console.log(err);
        } else {
            console.log('Item inserted to fooddeliversystem:'+cap+'\n' + JSON.stringify(item, null, 2));
      }
    });       
    response.send('Item inserted to fooddeliversystem:\n' + JSON.stringify(item,null,2));
});

// POST http://localhost:3000/api/dynamodbupdateall
// update the latest package information with all arttributes
router.post('/api/urlencoded/dynamodbupdateall', function(request, response) {
    var time = new Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('fooddeliversystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            //console.log(JSON.stringify(res,['items','timestp']).slice(21, 34));
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('fooddeliversystem', Number(request.body.packageid), lastEvaluatedKey, { 
                                                                    'temperature': { value: request.body.temperature },
                                                                    'humidity': { value: request.body.humidity },
                                                                    'userId': { value: request.body.userid },
                                                                    'currLocation': { value: request.body.currlocation},
                                                                    'lastscan': { value: Date()}}, {}, 
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('UpdateItem: ' + cap);
                        console.log('Updated all package info at:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
               });
           }
    }); 
    response.send('Updated all package info at:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
    //ddb.consumedCapacity();
});

// POST http://localhost:3000/api/dynamodbupdateuser
// update the latest package information with user ID
router.post('/api/urlencoded/dynamodbupdateuser', function(request, response) {
    var time = Date.now();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('fooddeliversystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('fooddeliversystem', Number(request.body.packageid), lastEvaluatedKey, { 
                                                                                'userId': { value: request.body.userid },
                                                                                'lastscan': { value: Date() }} , {}, 
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('UpdateItem: ' + cap);
                        console.log('Updated userID at:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
                });
        }
    }); 
    response.send('Updated userID at:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
    //ddb.consumedCapacity();
});

// POST http://localhost:3000/api/dynamodbupdatesensor
// update the latest package information with sensor info
router.post('/api/urlencoded/dynamodbupdatesensor', function(request, response) {
    var time = new Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('fooddeliversystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('fooddeliversystem', Number(request.body.packageid), lastEvaluatedKey, { 'temperature': { value: request.body.temperature },
                                                                                                    'humidity': { value: request.body.humidity },
                                                                                                    'lastscan': { value: Date() } }, {}, 
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('UpdateItem: ' + cap);
                        console.log('temp and humid updated to the package:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
            });
        }
    }); 
    response.send('temp and humid updated to the package at:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
    //ddb.consumedCapacity();
});

// POST http://localhost:3000/api/dynamodbupdatelocation
// update the latest package information with location
router.post('/api/urlencoded/dynamodbupdatelocation', function(request, response) {
    var time = new Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('fooddeliversystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('fooddeliversystem', Number(request.body.packageid), lastEvaluatedKey, { 'currLocation': { value: request.body.currlocation},
                                                                                                    'lastscan': { value: Date() } }, {}, 
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('UpdateItem: ' + cap);
                        console.log('location updated to the package:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
            });
        }
    }); 
    response.send('location updated to the package:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
    //ddb.consumedCapacity();
});

// DELETE http://localhost:3000/api/dynamodbdelete
// delete the latest package information if customer canceled?
router.delete('/api/urlencoded/dynamodbdelete', function (request, response) {
    var time = new Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('fooddeliversystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.deleteItem('fooddeliversystem', Number(request.body.packageid), lastEvaluatedKey, {},
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('deleteItem: ' + cap);
                        console.log('lastItem deleted:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
               });
        }
    }); 
    response.send('lastItem deleted:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
});





module.exports = router;