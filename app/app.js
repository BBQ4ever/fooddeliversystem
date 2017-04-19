var credentials = require('./data/credential.json');
var ddb = require('dynamodb').ddb({ accessKeyId: credentials.accessKeyId,
                                    secretAccessKey: credentials.secretAccessKey,
                                    endpoint: 'dynamodb.us-west-2.amazonaws.com'});
var express = require('express');
var reload = require('reload');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', process.env.PORT || 4040);
app.set('ddbsetup', ddb);//push ddb lib with router
app.set('view engine', 'ejs');//set up view engine for views behind router
app.set('views', 'app/views');//set up view engine folder
//app.set('ddbTable', 'testDB3'); 

app.locals.siteTitle = 'FoodDeliverSystem';//set up public varible
//routes start here
app.use(express.static('app/public'));//set up middleware for folder public
app.use(require('./routes/index'));// home page
app.use(require('./routes/packageinfo'));//dynamodb query, dynamodb query/:index, dunamodb query last
app.use(require('./routes/dynamodbapi'));//dynamo db API for put, post, delete. See dynamodbapi.js for details
app.use(require('./routes/dynamodbapiurlencoded'));//dynamo db API for put, post, delete. See dynamodbapi.js for details
app.use(require('./routes/login'));//test login page
app.use(require('./routes/apiform'));//API samples with forms
app.use(require('./routes/searchpage'));//search page for latest scan info

// start the server
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
});

reload(server, app);