/*
 * plugin to return parameters
 */

function returnParameters(file) 
{
	var data = {};
	var f = file;   
	if (f) 
	{
		var r = new FileReader();
		r.onload = function(e) { 
		var contents = e.target.result;             
		var ct = r.result;
		ct = ct.replace(" ","");
		var words = ct.replace(/,/g , ""); 
		var regularexp = /(trial[.][a-z,_]*)/mg;
		words = words.match(regularexp);
		var uniqueNames = words.filter(function(item, pos, self) {
			return self.indexOf(item) == pos;
		});
		data[f.name] = uniqueNames;
		console.log(data[f.name]);
	  }
	  r.readAsText(f);
	} 
	else { 
		alert("Failed to load file");
	}
		return data;
}
