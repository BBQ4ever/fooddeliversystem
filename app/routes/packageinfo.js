var express = require('express');
var router = express.Router();

// GET http://localhost:3000/api/dynamodbquery
// query all the information with package id
router.get('/api/dynamodbquery', function(request, response) {
    var ddb = request.app.get('ddbsetup');
    ddb.query('ITUFoodDeliverySystem', request.query.packageid, {}, 
    function(err, res, cap) {
        if(err){
            console.log(err);
        } else {
            console.log('GetItem: ' + cap);
            response.render('search',{
                pageTitle: 'Search',
                contentTitle:'All Package Details for Package: '+ Number(request.query.packageid),
                json: res,
                pageID: 'search'
            });
        }
    }); 
});

//use index to pick up a package info
router.get('/api/dynamodbquery/:index', function(request, response) {
    var ddb = request.app.get('ddbsetup');
    ddb.query('ITUFoodDeliverySystem', request.query.packageid, {}, 
    function(err, res, cap) {
        if(err){
            console.log(err);
        } else {
            //console.log('GetItem: ' + cap);
            //console.log(JSON.stringify(res.items[request.params.index], null, 2));
            var packagetemp = [];
            var packagehumid = [];
            var packagelocation = [];
            var packagetimestp = [];
            var package = [];
            res.items.forEach(function(item){
                if( item.timestp == request.params.index){
                    packagetemp = packagetemp.concat(item.temperature);
                    packagehumid = packagehumid.concat(item.humidity);
                    packagelocation = packagelocation.concat(item.currLocation);
                    packagetimestp = packagetimestp.concat(item.timestp);
                    package = package.concat(item.packageId);
                    packagetimestp = item.timestp;
                    packagegps = item.GPS;
                }
            });
            response.render('search',{
                pageTitle: 'Search',
                contentTitle: 'Detailed Package info for package: ' + Number(request.query.packageid),
                jsontemp: packagetemp,
                jsonhumid: packagehumid,
                jsonlocation: packagelocation,
                jsontimestp: packagetimestp,
                jsonpackage: package,
                jsongps: packagegps,
                pageID: 'searchindex'
            });
        }
    }); 
});

// GET http://localhost:3000/api/dynamodbquerylast
// query the last information with package id
router.get('/api/dynamodbquerylast', function(request, response) {
    var ddb = request.app.get('ddbsetup');
    var option = {scanIndexForward:false, limit: 1};
    ddb.query('ITUFoodDeliverySystem', request.query.packageid, option, 
    function(err, res, cap) {
        if(err){
            console.log(err);
        } else {
            console.log(JSON.stringify(res.items, null, 2));
            response.render('search',{
                pageTitle: 'Search',
                contentTitle: 'Last updated info for package: ' + Number(request.query.packageid),
                json: res,
                pageID: 'searchlast'
            });
        }
    }); 
});


module.exports = router;