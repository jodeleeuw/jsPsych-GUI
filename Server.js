var express = require('express');
var formidable = require('formidable');
var app = express();
var fs = require('fs');
var path = require('path');
// var jspysch = require('C:\\Users\\Uday\\Desktop\\jsPsych-old\\jsPsych-GUI\\jspsych-5.0.1\\jspsych-5.0.1\\jspsych.js');

app.use(express.static( __dirname));

app.get('/', function (req, res){
    res.sendFile( __dirname + '/public/');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '\\jspsych-5.0.1\\jspsych-5.0.1\\plugins\\' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    
    // res.sendFile(__dirname + '/public/index.html');
});


var all_plugin_parameters = []
var all_plugin_parameters_index = 0			
addPluginParameters = function(obj) {
	all_plugin_parameters[all_plugin_parameters_index] = obj
	all_plugin_parameters_index += 1
}

app.get('/plugin_data', function (req,res) {

	var path = __dirname + "\\jspsych-5.0.1\\jspsych-5.0.1\\plugins\\"
  	all_plugin_parameters = []
  	all_plugin_parameters_index = 0
	fs.readdir(path, function(err, items) {
		if(err) {
			throw err
		}
	 	console.log(path)
	    for (var i=0; i<items.length; i++) {
	        var file = path + items[i];
	        file_type_index = items[i].indexOf(".")
	        file_type = items[i].substring(file_type_index+1)
	        if(file_type == "js") {
	        	console.log(items[i]);

	        	var file_name_start = items[i].indexOf("-") + 1
	        	var file_name_end = items[i].indexOf(".")
	        	var file_name = items[i].substring(file_name_start,file_name_end)
	        	
	        	var file_path = path + items[i]
	        	var file_data = fs.readFileSync(file_path).toString()
	        	var substring_param = "plugin_parameters ="
	        	var file_data_parameters_index = file_data.indexOf(substring_param)
	        	var file_data_parameters = file_data.substring(file_data_parameters_index + substring_param.length)
	        	
	        	var javascript_data = JSON.parse(file_data_parameters)
	        	// console.log(javascript_data.name)
	        	// console.log(javascript_data.parameters)
	        	addPluginParameters(javascript_data)
	        }
	    }
	    res.send(all_plugin_parameters)
	    console.log("Sent all plugin parameters")
	});
});

var server = app.listen(3000, function () {

	var host = server.address().address
	var port = server.address().port

  	console.log("Listening at http://%s:%s", host, port)
 })