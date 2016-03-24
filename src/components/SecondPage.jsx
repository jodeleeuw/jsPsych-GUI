var React = require('react');
var ReactDOM = require('react-dom');
var ReactJson = require('react-json');
var PluginParameter = require('./PluginParameter.json');
var pluginparameter = PluginParameter;
var SaveAs = require('./saveAs.jsx');
var Reactaddons = require('react-addons');
var JSZip = require("jszip");
var FileInput = require('react-file-input');

var SecondPage = React.createClass({
  getInitialState: function() {
    return {
      currentTrial : "Hello",
      testValue : 5,
      TreeData : {
          id: 0,
          childIds: []
        },
      SettingsData : [],
      showSettings: false,
      CurrentTrialData : [],
      notInTrialData : true,
      showTrialData : false,
      AllTrialTypes : [],
      TestTrialData : [
        // {label:"hello", type:"text", parameters:{text:"Hey...this is in Text1",cont_key:"f"}},
        // {label:"instructions",type:"instructions", parameters:{ pages:'[\'Welcome\',\'Press key\']',show_clickable_nav:"true", allow_keys:"false"}},
        // {label:"test",type:"single-stim", parameters:{is_html:"true", choices:"\['y','n'\]",randomize_order:"true",timeline:"lex_trials"}}
      ]
    }
  },

  componentWillMount: function() {
    this.state.AllTrialTypes = [{trialName :"animation"},
                                {trialName :"button-response"},
                                {trialName :"call-function"},
                                {trialName :"categorize-animation"},
                                {trialName :"categorize"},
                                {trialName :"free-sort"},
                                {trialName :"html"},
                                {trialName :"instructions"},
                                {trialName :"multi-stim-multi-response"},
                                {trialName :"palmer"},
                                {trialName :"reconstruction"},
                                {trialName :"same-different"},
                                {trialName :"similarity"},
                                {trialName :"single-audio"},
                                {trialName :"single-stim"},
                                {trialName :"survey-likert"},
                                {trialName :"survey-multi-choice"},
                                {trialName :"survey-text"},
                                {trialName :"text"},
                                {trialName :"visual-search-circle"},
                                {trialName :"vsl-animate-occlusion"},
                                {trialName :"vsl-grid-scene"},
                                {trialName :"xab"}]
  },

  setCurrentTrial: function(trialValue) {
    this.state.notInTrialData = true;
    if(trialValue === "MyExperiment") {
      this.setState({showSettings: true})
    } else {

    for(var index in this.state.TestTrialData) {
      if(this.state.TestTrialData[index].label === trialValue){
        this.state.CurrentTrialData = this.state.TestTrialData[index];
        this.state.notInTrialData = false;
        break;
      }
    }

    if(this.state.notInTrialData) {
      this.state.CurrentTrialData = {label:trialValue,type:"", parameters:{}};
      this.state.TestTrialData.push(this.state.CurrentTrialData);
    }
    this.setState({CurrentTrialData: this.state.CurrentTrialData, showTrialData:true, showSettings: false});
    }
  },

  saveTree: function(treeData) {
    console.log("In second page...saving tree structure...",treeData)
    this.state.TreeData = treeData
    this.setState({TreeData: this.state.TreeData})
  },

  saveModifiedTrialData: function(trialName, trialType, modifiedTrialParameters) {
    console.log("In save..."+trialType);
    for(var obj in this.state.TestTrialData) {
        if(this.state.TestTrialData[obj].label === trialName) {
          this.state.TestTrialData[obj].type = trialType;
          this.state.TestTrialData[obj].parameters = modifiedTrialParameters;
          break;
        }
    }
    console.log(this.state.TestTrialData);
  },

  initialLines: function() {
    var st = "<!DOCTYPE html>   \n\t<head>\n\t\t<title>My experiment</title>\n\t\t<script";
    st += " src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>\n\t\t<script";
    st += " src=\"https://rawgit.com/jodeleeuw/jsPsych/master/jspsych.js\"></script>\n\t\t<link";
    st += " href=\"https://rawgit.com/jodeleeuw/jsPsych/master/css/jspsych.css\" rel=\"stylesheet\"";
    st += " type=\"text/css\"></link>\n";
    return st;
  },

  generateTrial: function(trialIndex) {

   var hel = this.state.TestTrialData[trialIndex];
   console.log(hel);
   var hel_keys = Object.keys(this.state.TestTrialData[trialIndex]);

  var st = "\t\tvar " + hel[hel_keys[0]] + " = {\n";
   st += "\t\t\ttype: '" + hel[hel_keys[1]] + "',\n";

   for(var parameter_Values in this.state.TestTrialData[trialIndex].parameters) {
    st += "\t\t\t" + parameter_Values + ": '" + this.state.TestTrialData[trialIndex].parameters[parameter_Values] + "',\n";
   }
   st += "\t\t}\n\n";

   return st;
 },

  importPlugins: function() {
    var allPlugins = []
    var st = ""
    for(var index in this.state.TestTrialData) {
      if(this.state.TestTrialData[index].type !== ""){
        var path = "https://rawgit.com/jodeleeuw/jsPsych/master/plugins/jspsych-"+this.state.TestTrialData[index].type+".js"
        st += "<script src=\""+path+"\"></script>\n"  
      }
    }

    return st
  },

    make_html: function() {
      var st = this.initialLines();
      st += this.importPlugins();
      st += "\t</head>\n\n\t<body>\n";
      st +="<div id=\"jspsych-target\"></div>";

      var numberOfTrials = this.state.TestTrialData.length
      var self = this
      var sopen = "\n\t<script>\n";
      var sclose = "\n\t</script>";
      st += sopen;
      st += "\tvar timeline = [];\n\n";

      var generateTrialOutput = function(treeData) {
          var trialIndex = -1
          var name = "Trial"+treeData.id
          if(treeData.id !== 0) {
            for(var obj in self.state.TestTrialData) {
            if(self.state.TestTrialData[obj].label === name) {
                trialIndex = obj
                break
              }
            }
            if(trialIndex !== -1){
              var hel = self.state.TestTrialData[trialIndex];
              var hel_keys = Object.keys(self.state.TestTrialData[trialIndex]);
              st += self.generateTrial(trialIndex);
              st += "\ttimeline.push(" + hel[hel_keys[0]] +");\n\n";
            } 
          }

          for(var childIndex in treeData.childIds) {
            generateTrialOutput(treeData.childIds[childIndex])
          }
          return true
      };

      generateTrialOutput(this.state.TreeData)

      st += "\t\tjsPsych.init({\n";
      st += "\t\t\ttimeline: timeline,\n";
      st += "\t\t\tdisplay_element: $('#jspsych-target'),\n";
      st += "\t\t\ton_finish: function(){\n";
      st += "\t\t\t\tjsPsych.data.displayData();\n\t\t\t}\n";
      st += "\t\t})\n"

      st += sclose;
      st += "\n\n\t</body>\n</html>";
      return st;
    },

    handlePreview : function(e) {
      console.log('Preview');
      var st = this.make_html();
      var newWindow = window.open("", "newWindow", "resizable=yes");
	    newWindow.document.write(st);
      console.log('Previewed')
    },

    handleGenerate : function(e) {
      console.log('Generate');
      var zip = new JSZip();
      var st = this.make_html();
      zip.file("My_Experiment.html", st);
      var content = zip.generate({type:"blob"});
      SaveAs.saveAs(content, "example.zip");
      console.log('Generated')
    },

    handleSave : function(e) {
      console.log('Save Button:',this.state.TreeData);
      var newObj = [ this.state.TestTrialData, this.state.TreeData ]
      var json = JSON.stringify(newObj);
      var blob = new Blob([json], {type: "application/json"});
    	SaveAs.saveAs(blob, "Experiment_data.json");

    },

    setTrialData: function() {
      console.log('set: ' + this.state.TestTrialData);
    },

    handleLoad : function(event) {
      var self = this;
      console.log('Load Button:');
      var file = event.target.files[0];
      var read = new FileReader();
      read.onload = function(e) {
        console.log(e.target.result)
        var jsonFormat = JSON.parse(e.target.result);
        console.log(jsonFormat[0])
        self.setState({TestTrialData: jsonFormat[0], TreeData: jsonFormat[1]});
      }
      read.readAsText(file)
    },

    render: function(){
        return (
          <div>
            <div id = "leftside">
              <div id = "tree">
                <ul>
                  <Tree setCurrentTrial = {this.setCurrentTrial} TreeData = {this.state.TreeData} saveTree = {this.saveTree}/>
                </ul>
              </div>
              <div id="buttonpanel">
                <button id="savebutton" className="btn btn-primary btn-md" onClick={this.handleSave}>Save</button>
                <button id="previewbutton" className="btn btn-primary btn-md" onClick={this.handlePreview}>Preview</button>
                <button id="generatebutton"  className="btn btn-primary btn-md" onClick={this.handleGenerate}>Generate</button>
                <FileInput name="upload_json"
                   accept=".json"
                   placeholder="Upload Saved State"
                   className="inputClass"
                   onChange={this.handleLoad} />
              </div>
            </div>

            <div id = "rightside">
              {this.state.showSettings ? 
                <ShowSettings/> :
              <Trial CurrentTrialData={this.state.CurrentTrialData} showTrialData={this.state.showTrialData} saveModifiedTrialData={this.saveModifiedTrialData} AllTrialTypes={this.state.AllTrialTypes}/>
            }
            </div>
          </div>
        );
    }

});
var count = 1;
var Tree = React.createClass({
  getInitialState: function() {
      return {
        tree : {
          id: 0,
          childIds: []
        },
        inputText:"Trial"
      }
    },

  setCurrentTrial: function(selectedTrial) {
    console.log(selectedTrial)
    console.log(this.state.tree.id)
    this.props.setCurrentTrial(selectedTrial);  
  },

  setTreeData: function(newTreeData) {
    console.log("In set tree data",newTreeData)
    this.setState({tree: newTreeData});
  },

  updateTree: function(treeData) {
      this.props.saveTree(treeData)
  },

  handleAddChildClick: function(parentId) {
      var temp = {
          id: count++,
          childIds: []
      };

      console.log(parentId)

      //Recursively access full tree object and append child to correct parent
      //Pass this tree to SecondPage class
      var addToTree = function(tree, parentId, newNode) {
          if (tree.id === parentId){
            tree.childIds.push(newNode)
            return tree
          }
          return null
      };
      var newTree = addToTree(this.props.TreeData, parentId, temp)
      this.updateTree(this.props.TreeData)

      //Adding to current tree state
      if(this.props.tree !== undefined) {
        this.props.tree.childIds.push(temp);
        this.setState({tree : this.props.tree, TreeData: this.props.TreeData});
      } else {
        this.state.tree.childIds.push(temp);

        this.setState({tree : this.state.tree, TreeData: this.props.TreeData});
      }
  },

  handleRemoveChildClick: function(nodeId) {
    var removeNode = ""
    this.props.treeData.childIds.forEach(function(childObj) {
      if(childObj.id === nodeId) {
        removeNode = childObj;
      }
    });

    var indexChildFullTree = this.props.TreeData.childIds.indexOf(removeNode)
    this.props.TreeData.childIds.splice(indexChildFullTree,1)

    var indexChild = this.props.treeData.childIds.indexOf(removeNode);
    this.props.treeData.childIds.splice(indexChild, 1)
    this.props.setTreeData(this.props.treeData)
  },

  renderChild: function(child) {
    return (
      <li key={child.id}>
        <Tree tree={child} setCurrentTrial={this.props.setCurrentTrial} treeData={this.state.tree} setTreeData={this.setTreeData} TreeData={this.props.TreeData} saveTree = {this.props.saveTree}/>
      </li>
    )
  },

  changeTrialName: function(e) {
    console.log(e.target.value)
    this.setState({inputText: e.target.value})
  },

  render: function() {
    var {id, childIds} = this.state.tree;
    if(this.props.tree !== undefined) {
      id = this.props.tree.id;
      childIds  = this.props.tree.childIds;
    }
      return(
        <div>
          <div>
            { id === 0 ?
              <a href="#" onClick={this.setCurrentTrial.bind(this,"MyExperiment")}>My Experiment</a> :
              <a href="#" onClick={this.setCurrentTrial.bind(this,"Trial"+id)}>
                <input type="text" value={this.state.inputText+id} className="TrialText" onChange={this.changeTrialName}/></a>
            }
              {' '}
              {id !== 0 ?
                <a href="#" onClick={this.handleRemoveChildClick.bind(this,id)}
                   style={{ color: 'lightgray', textDecoration: 'none' }}>
                  ×
                </a> :
                null
              }
              <ul>
              {childIds.map(this.renderChild)}
                <li key="add">
                  <button onClick={this.handleAddChildClick.bind(this,id)}>
                  +
                  </button>
                </li>
              </ul>
          </div>


        </div>
      );
  }
});

// <div id = "treestructure">
//           <a href="#" value="Trial1" onClick={this.setCurrentTrial.bind(this,"TextTrial")}>TextTrial</a>
//           <a href="#" value="Trial2" onClick={this.setCurrentTrial.bind(this,"InstructionsTrial")}>InstructionsTrial</a>
//           <a href="#" value="Trial3" onClick={this.setCurrentTrial.bind(this,"SingleStimTrial")}>SingleStimTrial</a>
//         </div>
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
            for(var obj in this.state.PluginData) {
            if(this.state.PluginData[obj].name === e.target.value) {
              for(var obj2 in this.state.PluginData[obj].parameters) {
                  this.state.labels[this.state.PluginData[obj].parameters[obj2].label] = "";
              }
            }
          }
          this.state.setData = this.state.labels;
          this.state.selectedTrialType = e.target.value;
          this.setState({setData : this.state.setData});
          console.log(this.state.selectedTrialType);
          } else {
            this.state.setData = this.props.CurrentTrialData.parameters;
            this.setState({setData : this.state.setData});
          }
      } else {
        this.state.setData = {};
        this.setState({setData : this.state.setData});
      }


    },
    showData : function() {
        var trialTypes = this.props.AllTrialTypes
        if(this.props.showTrialData) {
          if(this.props.CurrentTrialData.type === "") {
             return (
              <div>
                <span id="fields"><select onChange={this.handleChange}>
                  <option value="Select a trial type...">Select a trial type</option>
                    {trialTypes.map(function(type) {
                      return <option value={type.trialName} key={type.trialName}>{type.trialName}</option>
                    })}
                </select></span>
                <span><ReactJson value={ this.state.setData } settings={ this.state.settings } ref="json"/></span>
                <button className="btn btn-primary btn-md outline" onClick={ this.onSave }>Save Data</button>
                </div>
          );
          } else {
            console.log("In show data...else");
            this.handleChange.bind(this,this.props.CurrentTrialData.type);
             return (
              <div>
                <span id="fields"><select onChange={this.handleChange}>
                  <option value="Select a trial type...">Select a trial type</option>
                    {trialTypes.map(function(type) {
                      return <option value={type.trialName} key={type.trialName}>{type.trialName}</option>
                    })}
                </select></span>
                <span><ReactJson value={ this.state.setData } settings={ this.state.settings } ref="json"/></span>
                <button className="btn btn-primary btn-md outline" onClick={ this.onSave }>Save Data</button>
                </div>
          );
          }
        }
    },
    onSave: function( e ){
    var val = this.refs.json.getValue();
    console.log(this.state.selectedTrialType);
    for(var obj in val) {
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

var ShowSettings = React.createClass({
  getInitialState: function() {
    return{}
  },
  render: function() {
    return(
      <h2>Settings</h2>
    )
  }
})

module.exports = SecondPage;