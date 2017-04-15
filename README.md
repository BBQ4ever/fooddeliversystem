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

# install with git

    git clone https://github.com/BBQ4ever/fooddeliversystem
    cd fooddeliversystem
    sudo npm install 

# how to run this app
 
    sudo npm start

# default npm start scripts

    nodemon -e css,ejs,js,json --watch app --ignore 'app/data/credentials.json'
  change file watching types by edite css, ejs, js, json after -e
