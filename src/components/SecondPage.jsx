var React = require('react');
var ReactDOM = require('react-dom');
var ReactJson = require('react-json');
var PluginParameter = require('./PluginParameter.json');
var pluginparameter = PluginParameter;
var SaveAs = require('./saveAs.jsx');
var Reactaddons = require('react-addons');

var SecondPage = React.createClass({
  getInitialState: function() {
    return {
      currentTrial : "Hello",
      testValue : 5,
      TreeData : [{label:"treeData"}],
      SettingsData : [],
      CurrentTrialData : [],
      notInTrialData : true,
      showTrialData : false,
      TestTrialData : [
        // {label:"hello", type:"text", parameters:{text:"Hey...this is in Text1",cont_key:"f"}},
        // {label:"instructions",type:"instructions", parameters:{ pages:'[\'Welcome\',\'Press key\']',show_clickable_nav:"true", allow_keys:"false"}},
        // {label:"test",type:"single-stim", parameters:{is_html:"true", choices:"\['y','n'\]",randomize_order:"true",timeline:"lex_trials"}}
      ]
    }
  },

  setCurrentTrial: function(trialValue, treeData) {
    console.log(this.state.TestTrialData);
    this.state.notInTrialData = true;
    for(obj in this.state.TestTrialData) {
      if(this.state.TestTrialData[obj].label === trialValue){       
        this.state.CurrentTrialData = this.state.TestTrialData[obj]; 
        this.state.notInTrialData = false;
        break;
      }
    }

    if(this.state.notInTrialData) {
      this.state.CurrentTrialData = {label:trialValue,type:"", parameters:{}};
      this.state.TestTrialData.push(this.state.CurrentTrialData);
    }
    this.setState({CurrentTrialData: this.state.CurrentTrialData, showTrialData:true});
    
  },

  saveModifiedTrialData: function(trialName, trialType, modifiedTrialParameters) {
    console.log("In save..."+trialType);
    console.log(modifiedTrialParameters);
    for(obj in this.state.TestTrialData) {
        if(this.state.TestTrialData[obj].label === trialName) {
          this.state.TestTrialData[obj].type = trialType;
          this.state.TestTrialData[obj].parameters = modifiedTrialParameters;
          break;
        }
    }
    console.log(this.state.TestTrialData);
    // this.setState({TestTrialData: this.state.TestTrialData});
  },
 
  initialLines: function() {
    console.log("ini");
    var st = "<!doctype html>\n\n<html>\n\t<head>\n\t\t<title>My experiment</title>\n\t\t<script";
    st += " src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>\n\t\t<script";
    st += " src=\"jspsych-5.0.1/jspsych.js\"></script>\n\t\t<script";
    //add whatever plugins u need
    st += " src=\"jspsych-5.0.1/plugins/jspsych-text.js\"></script>\n\t\t<link";
    st += " href=\"jspsych-5.0.1/css/jspsych.css\" rel=\"stylesheet\"";
    st += " type=\"text/css\"></link>\n";
    return st;
  },

  generateHelloTrial: function() {
   TestTrialData : [{label:"hello_trial",type:"text", text:"Hey...this is in Text1",cont_key:"f"}]
   var hel = this.state.TestTrialData[0];
   console.log(hel);
   var hel_keys = Object.keys(this.state.TestTrialData[0]);

   st = "\t\tvar " + hel[hel_keys[0]] + " = {\n";
   st += "\t\t\ttype: '" + hel[hel_keys[1]] + "',\n";
   st += "\t\t\t" + hel_keys[2] + ": '" + hel[hel_keys[2]] + "',\n";
   st += "\t\t\t" + hel_keys[3] + ": '" + hel[hel_keys[3]] + "'\n";
   st += "\t\t}\n\n";

   return st;
 },

  generateInstructions: function() {

  TestTrialData : [{label:"instructions",type:"instructions", pages:"['\<p\>Welcome. Press next to view the instructions.\</p\>','\<p\>You will see a set of characters. Press Y if the characters form an English word. Press N if they do not.\</p\>\<p\>Press next to begin.\</p\>']",show_clickable_nav:"true", allow_keys:"false"}]
  var instr = this.state.TestTrialData[1];
  console.log(instr);
  var instr_keys = Object.keys(this.state.TestTrialData[1]);


  st = "\t\tvar " + instr[instr_keys[0]] + " = {\n";
  st += "\t\t\ttype: '" + instr[instr_keys[1]]+ "',\n";
  st += "\t\t\t" + instr_keys[2] + ": " + instr[instr_keys[2]] + ",\n";
  st += "\t\t\t" + instr_keys[3] + ": '" + instr[instr_keys[3]] + "',\n";
  st += "\t\t\t" + instr_keys[4] + ": '" + instr[instr_keys[4]] + "'\n";
  st += "\t\t}\n\n";

  return st;
},

 generateSingleStim: function() {

  //doubt about timeline here
  TestTrialData : [{label:"test",type:"single-stim",is_html:"true",choices:"\['y','n'\]",randomize_order:"true",timeline:"lex_trials"}]
  var sing = this.state.TestTrialData[2];
  console.log(sing);
  var sing_keys = Object.keys(this.state.TestTrialData[2]);


  //change this
  //read file here  
  st = "var word_data = [\n";
  st += "\t{word: \"cove\", word_type: \"low\"},\n";
  st += "\t{word: \"turf\", word_type: \"low\"},\n";
  st += "\t{word: \"twig\", word_type: \"low\"},\n";
  st += "\t{word: \"chair\", word_type: \"high\"},\n";
  st += "\t{word: \"dark\", word_type: \"high\"},\n";
  st += "\t{word: \"food\", word_type: \"high\"},\n";
  st += "\t{word: \"cowe\", word_type: \"non\"},\n";
  st += "\t{word: \"turv\", word_type: \"non\"},\n";
  st += "\t{word: \"twif\", word_type: \"non\"},\n";
  st += "\t{word: \"thair\", word_type: \"non\"},\n";
  st += "\t{word: \"zark\", word_type: \"non\"},\n";
  st += "\t{word: \"rood\", word_type: \"non\"}]\n";


  st +="lex_trials = \[\];\n";

  //change this
  //hardcoded here
  st += "for(var i=0; i<word_data.length; i++){\n";
  st += "\tlex_trials.push({\n";
  st += "\t\t stimulus: '<p class=\"center-content very-large\">'+ word_data[i].word +'</p>',\n";
  st += "\t\t data: {word_type: word_data[i].word_type}\n";
  st += "\t});\n}\n";
  

  st += "\t\tvar " + sing[sing_keys[0]] + " = {\n";
  st += "\t\t\ttype: '" + sing[sing_keys[1]] + "',\n";
  st += "\t\t\t" + sing_keys[2] + ": " + sing[sing_keys[2]] + ",\n";
  st += "\t\t\t" + sing_keys[3] + ": " + sing[sing_keys[3]] + ",\n";
  st += "\t\t\t" + sing_keys[4] + ": " + sing[sing_keys[4]] + ",\n";
  st += "\t\t\t" + sing_keys[5] + ": " + sing[sing_keys[5]] + "\n";
  st += "\t\t}\n\n";

  return st;
},

  importPlugins: function() {
    st = "<script src=\"jspsych-5.0.1/plugins/jspsych-single-stim.js\"></script>\n";
    st += "<script src=\"jspsych-5.0.1/plugins/jspsych-instructions.js\"></script>\n";
    return st;
  },

    handleGenerate : function(e) {
      st = this.initialLines();
      st += this.importPlugins();
      st += "\t</head>\n\n\t<body>\n";

      var hel = this.state.TestTrialData[0];
      var hel_keys = Object.keys(this.state.TestTrialData[0]);

      var instr = this.state.TestTrialData[1];
      var instr_keys = Object.keys(this.state.TestTrialData[1]);

      var sing = this.state.TestTrialData[2];
      var sing_keys = Object.keys(this.state.TestTrialData[2]);

      var sopen = "\n\t<script>\n";
      var sclose = "\n\t</script>";

      //change this
      st +="<div id=\"jspsych-target\"></div>";

      st += sopen;

      st += "\tvar timeline = [];\n\n";

      st += this.generateHelloTrial();
      st += "\ttimeline.push(" + hel[hel_keys[0]] +");\n\n";

      st += this.generateInstructions();
      st += "\ttimeline.push(" + instr[instr_keys[0]] +");\n\n";

      st += this.generateSingleStim();
      st += "\ttimeline.push(" + sing[sing_keys[0]] +");\n\n";


      st += "\t\tjsPsych.init({\n";
      st += "\t\t\ttimeline: timeline,\n";
      //write stuff
      st += "\t\t\tdisplay_element: $('#jspsych-target'),\n";
      st += "\t\t\ton_finish: function(){\n";
      st += "\t\t\t\tjsPsych.data.displayData();\n\t\t\t}\n";
      st += "\t\t})\n"

      st += sclose;
      st += "\n\n\t</body>\n</html>";
      var blob = new Blob([st], {type: "text/plain;charset=utf-8"});
    	SaveAs.saveAs(blob, "My_Experiment.html");
    },

    render: function(){
        return (
          <div>
            <div id = "leftside">
              <div id = "tree">
                <ul>
                  <Tree setCurrentTrial = {this.setCurrentTrial} TreeData = {this.state.TreeData}/>
                </ul>
              </div>
              <div id="buttonpanel" className="buttonAlign btn-group" role="group" aria-label="...">
              <button id="loadbutton" className="btn btn-primary">Load</button>
                <button id="savebutton" className="btn btn-primary">Save</button>
                <button id="previewbutton" className="btn btn-primary">Preview</button>
                <button id="generatebutton" className="btn btn-primary" onClick={this.handleGenerate}>Generate</button>
              </div>
            </div>

            <div id = "rightside">
              <Trial CurrentTrialData={this.state.CurrentTrialData} showTrialData={this.state.showTrialData} saveModifiedTrialData={this.saveModifiedTrialData}/>
            </div>
          </div>
        );
    }

});

var Tree = React.createClass({
  getInitialState: function() {
      return {
        testValue : "",
        TreeObject : [{name:"Hello",id:1},{name:"Single",id:2}]
      }
    },

  setCurrentTrial: function(value1) {
    // console.log(this.props.TreeData);
    // var modifiedTreeData = this.props.TreeData.push({label:"TreeData2"});
    this.props.setCurrentTrial(value1,this.props.TreeData);
  },

  render: function() {
      return(
        <div id = "treestructure">
          <h4><a href="#" value="Trial1" onClick={this.setCurrentTrial.bind(this,"Trial1")}>Trial1</a></h4>
          <h4><a href="#" value="Trial2" onClick={this.setCurrentTrial.bind(this,"Trial2")}>Trial2</a></h4>
        </div>
      );
  }
});

var Trial = React.createClass({
    getInitialState: function() {
      return {
       currentTrial : "Hello",
       TrialData : this.props.CurrentTrialData,
       PluginData : pluginparameter,
       PluginLabels : {},
       setFormBuilderData : "",
       settings : { form: true,  fields: { } },
       propertyName: "",
       onTrialClick : false,
       setData : {},
       selectedTrialType : ""
       }
    },
    handleChange : function(e) {
      this.state.labels = new Object();
      if(e.target.value != "Select a trial type...") {
          if(this.props.CurrentTrialData.type === "" || this.props.CurrentTrialData.type!=e.target.value) {
            for(obj in this.state.PluginData) {
            if(this.state.PluginData[obj].name === e.target.value) {
              for(obj2 in this.state.PluginData[obj].parameters) {
                  this.state.labels[this.state.PluginData[obj].parameters[obj2].label] = "";
              }
            }
          }
          this.state.setData = this.state.labels;
          this.state.selectedTrialType = e.target.value;
          this.setState({setData : this.state.setData});
          console.log(this.state.selectedTrialType);  
          } else {
            console.log("in handle change...else");
            this.state.setData = this.props.CurrentTrialData.parameters;
            this.setState({setData : this.state.setData});
          }  
      } else {
        this.state.setData = {};
        this.setState({setData : this.state.setData});
      }
      

    },
    showData : function() {
      console.log(this.props.showTrialData);
        if(this.props.showTrialData) {
          console.log("In show data");
          console.log(this.state.setData);
          if(this.props.CurrentTrialData.type === "") {
             return (
              <div>
                <span id="fields"><select onChange={this.handleChange}>
                  <option value="Select a trial type...">Select a trial type</option>
                  <option value="Text">Text</option>
                  <option value="Single">Single</option>
                  <option value="Instructions">Instructions</option>
                </select></span>
                <span><ReactJson value={ this.state.setData } settings={ this.state.settings } ref="json"/></span>
                <button onClick={ this.onSave }>Save</button>
                </div>
          ); 
          } else {
            console.log("In show data...else");
            this.handleChange.bind(this,this.props.CurrentTrialData.type);
             return (
              <div>
                <span id="fields"><select onChange={this.handleChange}>
                  <option value="Select a trial type...">Select a trial type</option>
                  <option value="Text">Text</option>
                  <option value="Single">Single</option>
                  <option value="Instructions">Instructions</option>
                </select></span>
                <span><ReactJson value={ this.state.setData  } settings={ this.state.settings } ref="json"/></span>
                <button onClick={ this.onSave }>Save</button>
                </div>
          ); 
          }
        }
    },
    onSave: function( e ){
    var val = this.refs.json.getValue();
    console.log(this.state.selectedTrialType);
    for(obj in val) {
      console.log(val[obj]);
    }
    console.log(this.props.CurrentTrialData.label);
    this.props.saveModifiedTrialData(this.props.CurrentTrialData.label,this.state.selectedTrialType,val);
  },
    render:function(){
      return(
        <div>
        {this.showData()}
        </div>
      );
    }
});
// <span><ReactJson value={ this.state.TrialData[this.getIndex()] } settings={ this.state.settings }/></span>
module.exports = SecondPage;
