// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

var express = require('express');
var fs = require('fs');
var app = express();

app.get('/data', function (req, res) {
    res.json(jsonData);
});

app.get('/', function (req, res) {
    var file = fs.readFile('index.html', function (err, data) {
        if(err){
            res.status(500).send("error reading file");
        }else{
            res.setHeader('content-type', 'text/html');
            res.send(data);
        }
    });
});

var jsonData = {count: 12, message: 'hey'};


var port = 3000;
app.listen(port, function () {
    console.log("listening in localhost:", port);
});