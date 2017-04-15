# fooddeliversystem
food deliver system node express server with dynamoDB APIs to query, update, delete items in dynamodb.

Functions include: watching selected file changes and auto restart server then reload web browser. 

app dependencies include:

    "body-parser": "^1.15.2", 
    "dynamodb": "^0.3.6",
    "ejs": "^2.4.2",
    "express": "^4.14.0",
    "nodemon": "^1.11.0",
    "reload": "^1.0.0",
    "socket.io": "^1.4.8"
   depandencies will installed automaticly after run sudo npm install command in next install step

# install with git

    git clone https://github.com/BBQ4ever/fooddeliversystem
    cd fooddeliversystem
    sudo npm install 
    
# setup aws credential infomation at app/data/credential.json
    
    { "accessKeyId": <YOUR_ACCESS_KEY_ID>, "secretAccessKey": <YOUR_SECRET_ACCESS_KEY>, "region": "us-west-2" }
   Replace <YOUR_ACCESS_KEY_ID> with "your access key id" and replace <YOUR_SECRET_ACCESS_KEY> with "your secret access key",
   "" are needed. "region" not used in this app and can be removed. "endpiont" setup might needed in app.js, defaut value is "dynamodb.us-west-2.amazonaws.com" for access dynamodb in origon region.


# how to run this app
 
    sudo npm start

# default npm start scripts

    nodemon -e css,ejs,js,json --watch app --ignore 'app/data/credentials.json'
  change file watching types by edite css, ejs, js, json after -e
