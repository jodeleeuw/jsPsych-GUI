//if(text1 == 'single-tim')
	//st += "<script src=\"jspsych-5.0/plugins/jspsych-"+text1+"\"></script>";
/*
$(document).ready(function(){
	
})
*/
function initialHtmlTags() {
	var st = "<!doctype html><html><br><body><head><title>My experiment</title><script";
	st += " src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script><script";
	st += " src=\"C:/Users/Uday/Desktop/jsPsych Week1/jsPsych_Week1_V2/jspsych-5.0.1/jspsych-5.0.1/jspsych.js\"></script><script";
	st += " src=\"C:/Users/Uday/Desktop/jsPsych Week1/jsPsych_Week1_V2/jspsych-5.0.1/jspsych-5.0.1/plugins/jspsych-text.js\"></script><link";
	st += " href=\"C:/Users/Uday/Desktop/jsPsych Week1/jsPsych_Week1_V2/jspsych-5.0.1/jspsych-5.0.1/css/jspsych.css\" rel=\"stylesheet\"";
	st += " type=\"text/css\"></link></head><body>";
	return st;
}

function downloadHtml() {
	st = initialHtmlTags();
	st += "</body><script>var hello_trial = {type: 'text',text:\'";
	for (var i = 0; i < arguments.length; i++)
		st += arguments[0];

	st += "\'}; jsPsych.init({ timeline: [ hello_trial ] })";
	st += "\n</script>\n</html>";
	var downloadLink = document.createElement("a");
	downloadLink.href = 'data:text;charset=utf-8,' + st;
	downloadLink.download = "./data.html";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

function viewHtml() {
	st = initialHtmlTags();
	for (var i = 0; i < arguments.length; i++)
		st += arguments[i] + ", ";
	st += "\n</body>\n</html>";
	var newWindow = window.open("", "newWindow", "resizable=yes");
	newWindow.document.write(st);
}
