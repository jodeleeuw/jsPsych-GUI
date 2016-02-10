<!DOCTYPE html>
<html>
<head>
	<title>My Second React Example</title>
	<script src="https://fb.me/react-0.14.6.js"></script>
	<script src="https://fb.me/react-dom-0.14.6.js"></script>
	<link rel="stylesheet" href="../CSS/index.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.25.1/react-bootstrap.js"></script>
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.2/react-with-addons.min.js
	"></script>
	<script src="../JS/generate.js"></script>
	<script src="../JS/return_parameters.js"></script>

	<script>
	function collectDataDynamically() {
		var argsToPassToJS = [];
		for (var i = 1; i < arguments.length; i++)
			if (typeof arguments[i].value === "undefined")
				argsToPassToJS.push(arguments[i].innerHTML);
			else
				argsToPassToJS.push(arguments[i].value);
		//downloadHtml(argsToPassToJS);
		if(arguments[0] == 'd')
			downloadHtml(argsToPassToJS);
		else
			viewHtml(argsToPassToJS);

	}

	</script>

	<link rel="stylesheet" type="text/css" href="../CSS/tree.css">
</head>
<body>
	<div id="left-side">
		<div id="tree" ></div>
		<div id="settings-button">
			<button  type="button" class="btn btn-info" id="settings">Settings</button>
		</div>
		    <div id ="button-panel">
			<button  type="button" class="btn btn-info" id="save">Save</button>
			<button  type="button" class="btn btn-info" id="load">Load</button>
			<button  type="button" class="btn btn-info" id="generate" onclick="collectDataDynamically('d',text,cont_key)">Generate</button>
			<button  type="button" class="btn btn-info" id="preview" onclick="collectDataDynamically('v',text,cont_key)">Preview</button>
 </div>
	</div>
	<div id="main" ></div>

	<script type="text/babel">
		var TreeNode = React.createClass({
			getInitialState: function() {
				return {
					visible: true
				};
			},
			render: function() {

				var childNodes;
				var classObj;

				if (this.props.node.childNodes != null) {
					childNodes = this.props.node.childNodes.map(function(node, index) {
						return <a href="#" id={node.title}><li key={index}><TreeNode node={node} /></li></a>
					});

					classObj = {
						togglable: true,
						"togglable-down": this.state.visible,
						"togglable-up": !this.state.visible
					};
				}

				var style;
				if (!this.state.visible) {
					style = {display: "none"};
				}

				return (
				<div>
					<h5 onClick={this.toggle} className={React.addons.classSet(classObj)}>
						{this.props.node.title}
					</h5>
					<ul style={style}>
						{childNodes}
					</ul>
				</div>
				);
			},
			toggle: function() {
				this.setState({visible: !this.state.visible});
			}
		});

		var tree = {
			title: "Experiment Name",
			childNodes: [
			{title: "HelloWorldTrial"},{title: "SingleStimTrial"}
			]
		};

		React.render(
		<TreeNode node={tree} />,
		document.getElementById("tree")
		);

	</script>
	   <script type="text/babel">

	</script>
	<script type="text/babel">
		var importFile= '';
		var outputFiles= '';
		importFile = (
			<input type="file" id="files" name="files[]" multiple />
		);

		outputFiles = (
			<output id="list">
			</output>
		);

		function handleFileSelect(evt) {
		var listoffiles={};
    	var files = evt.target.files; // FileList object
    	var selectOption = document.getElementById("Plugins");

    //files is a FileList of File objects. List some properties.
    	var output = [];
	    for (var i = 0, f; f = files[i]; i++) {
		listoffiles[f.name.substring(8)]=f;
		console.log(listoffiles[f.name]);

    	}

    	for(var i=0; i<listoffiles.length;i++) {
    		var opt= listoffiles[i];
    		var element = document.createElement("option");
    		element.text = opt.key;
    		element.value = opt.value;
    		selectOption.appendChild(element);
    	}

	    return listoffiles;

  		}
  		$('#settings').click(function() {
  			React.render(importFile, document.getElementById("main"));
			document.getElementById('files').addEventListener('change', handleFileSelect, true);
		});

		var helloWorldDiv = '';
		var singleStimDiv = '';

		helloWorldDiv = (
		<div id="hello">
			<span>Trial Type</span><select name="Plugins" onChange="returnParameters()">
				<option value="text">Text</option>
			</select>
			<br></br><br></br>

			Text : <input type="text" id="text"/>
			Continue Key : <input type="text" id="cont_key"/>
		</div>
		);

		singleStimDiv = (
		<div id="single">
			<span>Trial Type</span><select name="Plugins">
				<option value="text">SingleStim</option>
			</select>
			<br></br><br></br>

			Stimulus : <input type="text"/> <br/>
			Choices : <input type="text"/> <br/>
			Prompt : <input type="text"/> <br/>
			TimingResponse : <input type="text"/>

		</div>
		);
		$('#HelloWorldTrial').click(function(){
			React.render(helloWorldDiv,document.getElementById("main"));
		});

		$('#SingleStimTrial').click(function(){
			React.render(singleStimDiv,document.getElementById("main"));
		});
	</script>

</body>
</html>
