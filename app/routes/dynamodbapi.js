var express = require('express');
var router = express.Router();


// POST http://localhost:3000/api/dynamodbput
// create a new row of package information in the table
router.post('/api/dynamodbput', function(request, response) {
    var ddb = request.app.get('ddbsetup');
    var gps = [];
    gps[0] = request.body.latitude;
    gps[1] = request.body.longitude;
    var item = {packageId: request.body.packageid,
                timestp: Number(request.body.timestamp),
                humidity: request.body.humidity,
                temperature: request.body.temperature,
                GPS: gps };
    ddb.putItem('ITUFoodDeliverySystem', item, {}, function(err, res, cap) {
        if(err) {
            console.log(err);
        } else {
            console.log('Item inserted to fooddeliverysystem:'+cap+'\n' + JSON.stringify(item, null, 2));
      }
    });       
    response.render('apiresponse',{
        pageTitle: 'apiresponse',
        contentTitle:'Package '+ request.body.packageid + ' Created !',
        json: item,
        backurl: '/dynamodbput',
        buttonName: 'Create Anather',
        pageID: 'apiresponse'
    });
});

// POST http://localhost:3000/api/setuppackage
// set up a empty package in table
router.post('/api/setuppackage', function(request, response) {
    var ddb = request.app.get('ddbsetup');
    var item = {packageId: Number(request.body.packageid),
                timestp: Date.now(),
                lastscan: Date(),};
    ddb.putItem('ITUFoodDeliverySystem', item, {}, function(err, res, cap) {
        if(err) {
            console.log(err);
        } else {
            console.log('Item inserted to fooddeliversystem:'+cap+'\n' + JSON.stringify(item, null, 2));
      }
    });       
    response.render('apiresponse',{
        pageTitle: 'apiresponse',
        contentTitle:'Package '+ Number(request.body.packageid) + ' Created !',
        json: item,
        backurl: '/setuppackage',
        buttonName: 'Create Anather',
        pageID: 'apiresponse'
    });
});

// POST http://localhost:3000/api/dynamodbupdateall
// update the latest package information with all arttributes
router.post('/api/dynamodbupdateall', function(request, response) {
    var time = Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('ITUFoodDeliverySystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('ITUFoodDeliverSystem', Number(request.body.packageid), lastEvaluatedKey, { 
                                                                    'temperature': { value: request.body.temperature },
                                                                    'humidity': { value: request.body.humidity },
                                                                    'userId': { value: request.body.userid },
                                                                    'currLocation': { value: request.body.currlocation},
                                                                    'lastscan': { value: time}}, {}, 
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('UpdateItem: ' + cap);
                        console.log('Updated all package info at:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
               });
            response.render('apiresponse',{
                pageTitle: 'apiresponse',
                contentTitle:'Package '+ Number(request.body.packageid) + ' updated !',
                json: request.body,
                timestp: lastEvaluatedKey,
                lastscan: time,
                backurl: '/dynamodbupdateall',
                buttonName: 'Update Anather',
                pageID: 'apiresponseupdate'
            });
           }
    }); 
    //ddb.consumedCapacity();
});

// POST http://localhost:3000/api/dynamodbupdateuser
// update the latest package information with user ID
router.post('/api/dynamodbupdateuser', function(request, response) {
    var time = Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('ITUFoodDeliverySystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('ITUFoodDeliverSystem', Number(request.body.packageid), lastEvaluatedKey, { 
                                                                                'userId': { value: request.body.userid },
                                                                                'lastscan': { value: time }} , {}, 
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('UpdateItem: ' + cap);
                        console.log('Updated userID at:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
                });
            response.render('apiresponse',{
                pageTitle: 'apiresponse',
                contentTitle:'Package '+ Number(request.body.packageid) + ' updated !',
                json: request.body,
                timestp: lastEvaluatedKey,
                lastscan: time,
                backurl: '/dynamodbupdateall',
                buttonName: 'Update Anather',
                pageID: 'apiresponseupdate'
            });
        }
    }); 
    //ddb.consumedCapacity();
});

// POST http://localhost:3000/api/dynamodbupdatesensor
// update the latest package information with sensor info
router.post('/api/dynamodbupdatesensor', function(request, response) {
    var time = new Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('ITUFoodDeliverySystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('ITUFoodDeliverySystem', Number(request.body.packageid), lastEvaluatedKey, { 'temperature': { value: request.body.temperature },
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
            response.render('apiresponse',{
                pageTitle: 'apiresponse',
                contentTitle:'Package '+ Number(request.body.packageid) + ' updated !',
                json: request.body,
                timestp: lastEvaluatedKey,
                lastscan: time,
                backurl: '/dynamodbupdateall',
                buttonName: 'Update Anather',
                pageID: 'apiresponseupdate'
            });
        }
    }); 
    //ddb.consumedCapacity();
});

// POST http://localhost:3000/api/dynamodbupdatelocation
// update the latest package information with location
router.post('/api/dynamodbupdatelocation', function(request, response) {
    var time = new Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('ITUFoodDeliverySystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.updateItem('ITUFoodDeliverySystem', Number(request.body.packageid), lastEvaluatedKey, { 'currLocation': { value: request.body.currlocation},
                                                                                                    'lastscan': { value: Date() } }, {}, 
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('UpdateItem: ' + cap);
                        console.log('location updated to the package:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
            });
            response.render('apiresponse',{
                pageTitle: 'apiresponse',
                contentTitle:'Package '+ Number(request.body.packageid) + ' updated !',
                json: request.body,
                timestp: lastEvaluatedKey,
                lastscan: time,
                backurl: '/dynamodbupdateall',
                pageID: 'apiresponseupdate',
                buttonName: 'Update Anather'
            });
        }
    }); 
    //ddb.consumedCapacity();
});

// DELETE http://localhost:3000/api/dynamodbdelete
// delete the latest package information if customer canceled?
router.post('/api/dynamodbdelete', function (request, response) {
    var time = new Date();
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('ITUFoodDeliverySystem', Number(request.body.packageid), option, function(err, res) {
        if(err){
            console.log(err);
        } else {
            var lastEvaluatedKey = res.lastEvaluatedKey.range;
            ddb.deleteItem('ITUFoodDeliverySystem', Number(request.body.packageid), lastEvaluatedKey, {},
                function(err, resp, cap) {
                    if(err)
                        console.log(err);
                    else {
                        console.log('deleteItem: ' + cap);
                        console.log('lastItem deleted:\n' + time + "\n" + JSON.stringify(request.body, null, 2));
                    }
               });
            response.render('apiresponse',{
                pageTitle: 'apiresponse',
                contentTitle:'Package '+ Number(request.body.packageid) + ' Deleted !',
                json: request.body,
                timestp: lastEvaluatedKey,
                lastscan: time,
                backurl: '/dynamodbupdateall',
                pageID: 'apiresponseupdate',
                buttonName: 'Delete Anather'
            });
        }
    }); 
});





module.exports = router;