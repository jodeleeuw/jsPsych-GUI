var express = require('express');
var formidable = require('formidable');
var app = express();

app.use(express.static( __dirname));

app.get('/', function (req, res){
    res.sendFile( __dirname + '/public/');
});

// app.post('/', function (req, res){
//     var form = new formidable.IncomingForm();

//     form.parse(req);

//     form.on('fileBegin', function (name, file){
//         file.path = __dirname + '/uploads/' + file.name;
//     });

//     form.on('file', function (name, file){
//         console.log('Uploaded ' + file.name);
//     });

//     res.sendFile(__dirname + '/public/index.html');
// });


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Listening at http://%s:%s", host, port)

 })