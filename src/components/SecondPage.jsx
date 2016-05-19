var React = require('react');
var ReactDOM = require('react-dom');
var ReactBootstrap = require('react-bootstrap')
var SaveAs = require('./saveAs.jsx');
var Reactaddons = require('react-addons');
var JSZip = require("jszip");
var ReactDataGrid = require('react-data-grid/addons');
var Input = ReactBootstrap.Input;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var ButtonInput  = ReactBootstrap.ButtonInput;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;
var NotificationSystem = require('react-notification-system');
var Notification = require('react-notification');

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
      TimelineVariable : [],
      showSettings: false,
      CurrentTrialData : [],
      notInTrialData : true,
      showTrialData : false,
      AllTrialTypes : [],
      CheckedTrials : [],
      TestTrialData : [],
      AllPluginParameters : [],
      repetitions : 1
    }
  },

   _notificationSystem: null,

   setAllPluginParameters: function(value) {
      this.setState({AllPluginParameters: value})
   },

  componentWillMount: function() {
    // console.log("In component will mount...")

    $.get('/plugin_data',function(all_plugin_parameters){
      this.setAllPluginParameters(all_plugin_parameters)
    }.bind(this))

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

  setTimelineVariables: function(timelineData) {
    this.state.TimelineVariable = timelineData
    // console.log(this.state.TimelineVariable)
  },

  setRepetition: function(repetitions) {
    this.state.repetitions = repetitions
    // console.log(this.state.repetitions)
  },

  setCurrentTrial: function(trialValue, trialId) {
    this.state.notInTrialData = true;
    if(trialValue === "MyExperiment") {
      this.setState({showSettings: true})
    } else {
    for(var index in this.state.TestTrialData) {
      if(this.state.TestTrialData[index].id === trialId){
        this.state.TestTrialData[index].label = trialValue
        this.state.CurrentTrialData = this.state.TestTrialData[index];
        this.state.notInTrialData = false;
        break;
      }
    }

    if(this.state.notInTrialData) {
      this.state.CurrentTrialData = {id:trialId,label:trialValue,type:"", parameters:{}};
      this.state.TestTrialData.push(this.state.CurrentTrialData);
    }
    this.setState({CurrentTrialData: this.state.CurrentTrialData, showTrialData:true, showSettings: false});
    }
  },

  updateCheckedTrials: function (trialName, checkValue) {
    var trialIndex = -1
    var contains = false
    for(var objIndex in this.state.CheckedTrials) {
       if(this.state.CheckedTrials[objIndex] === trialName) {
        trialIndex = objIndex
        contains= true
        break
       } 
    }
    if(checkValue === true) {
      if(trialIndex === -1) {
        this.state.CheckedTrials.push(trialName)
      }
    } else {
        if(contains === true) {
            this.state.CheckedTrials.splice(trialIndex,1)
        }
    }
    // console.log(this.state.CheckedTrials)
    // console.log(this.state.TestTrialData)
  },

  removeDeletedCheckedNodes: function() {
    //Traverse through whole tree and splice trials not present in tree
    this.state.CheckedTrials.filter(function(trialName) {

    })
  },

  saveTree: function(treeData) {
    this.state.TreeData = treeData
    this.setState({TreeData: this.state.TreeData})
  },

  saveModifiedTrialData: function(trialName, trialType, modifiedTrialParameters) {
    for(var obj in this.state.TestTrialData) {
        if(this.state.TestTrialData[obj].label === trialName) {
          this.state.TestTrialData[obj].type = trialType;
          this.state.TestTrialData[obj].parameters = modifiedTrialParameters;
          break;
        }
    }
    console.log(this.state.TestTrialData)
  },

  initialLines: function() {
    var st = "<!DOCTYPE html>   \n\t<head>\n\t\t<title>My experiment</title>\n\t\t<script";
    st += " src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>\n\t\t<script";
    st += " src=\"https://rawgit.com/jodeleeuw/jsPsych/timeline-variables/jspsych.js\"></script>\n\t\t<link";
    st += " href=\"https://rawgit.com/jodeleeuw/jsPsych/timeline-variables/css/jspsych.css\" rel=\"stylesheet\"";
    st += " type=\"text/css\"></link>\n";
    return st;
  },

  generateTrial: function(trialIndex) {
    console.log("In generate trial...")
    var hel = this.state.TestTrialData[trialIndex];
    var hel_keys = Object.keys(this.state.TestTrialData[trialIndex]);

    var st = "\t\tvar " + hel[hel_keys[1]] + " = {\n";
    st += "\t\t\ttype: '" + hel[hel_keys[2]] + "',\n";

    var inc = 0

   for(var parameter_Values in this.state.TestTrialData[trialIndex].parameters) {
    
    var value = this.state.TestTrialData[trialIndex].parameters[parameter_Values]
    if(parameter_Values == "choices") {
      if(inc!= 0) {
        st += ",\n"
      }
      st +="\t\t\t"+parameter_Values + ": [89,78]"
    }
    if(value != "") {
      if(inc!= 0) {
        st += ",\n"
      }
      console.log(value)
      var index = value.indexOf("%")
      var before = value.substring(0,index)
      console.log(index)
      if(index != -1) {
        var value_substring = value.substring(index+1)
        console.log(value_substring)
        var index2 = value_substring.indexOf("%")
        console.log(index2)
        var after = value_substring.substring(index2+1)
        if(index2 != -1) {
          var value_substring2 = value_substring.substring(0,index2)
          console.log(value_substring2)
          st += "\t\t\t" + parameter_Values + ": "+"function() { return '"+ before +"'+ jsPsych.timelineVariable('"+ value_substring2 +"')+'"+ after +"' }"
          inc += 1
        }
      } else {
        st += "\t\t\t" + parameter_Values + ": '" + value + "'";  
        inc += 1
      }  
    }
   }
   st += "\t\t}\n\n";

   return st;
 },

  importPlugins: function() {
    var allPlugins = []
    var st = ""
    for(var index in this.state.TestTrialData) {
      if(this.state.TestTrialData[index].type !== ""){
        var path = "https://rawgit.com/jodeleeuw/jsPsych/timeline-variables/plugins/jspsych-"+this.state.TestTrialData[index].type+".js"
        st += "<script src=\""+path+"\"></script>\n"  
      }
    }
    return st
  },

  addTimelineVariables: function() {
    console.log("In addTimelineVariables")
    var st= "var timeline_variables = [\n"
    var inc1 = 0
    for(var index in this.state.TimelineVariable) {
      if(inc1!=0) {
        st += ",\n"  
      }
      st += "\t\t{ "
      var inc2 = 0
      for(var index2 in this.state.TimelineVariable[index]) {
        if(inc2!=0) {
          st += ", "
        }
        st += index2 + ": '" + this.state.TimelineVariable[index][index2] + "'"
        inc2 += 1
      }
      st += " }"
      inc1 += 1
    }
    st += "\n];\n"
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
      var sclose = "\n\t</script>\n";
      st += sopen;

      st += this.addTimelineVariables()

      st += "\tvar timeline = [];\n\n";

      var generateTrialOutput = function(treeData) {
          var trialIndex = -1
          var trialName
          if(treeData.id !== 0) {
            for(var obj in self.state.TestTrialData) {
            if(self.state.TestTrialData[obj].id === treeData.id && self.state.TestTrialData[obj].type !== "") {
                trialIndex = obj
                trialName = self.state.TestTrialData[obj].label
                break
              }
            }
            if(trialIndex !== -1){
              var showTrial = false
              for(var obj in self.state.CheckedTrials) {
                if(self.state.CheckedTrials[obj] === trialName) {
                  showTrial = true
                  break
                }
              }

              if(showTrial){
                var hel = self.state.TestTrialData[trialIndex];
                var hel_keys = Object.keys(self.state.TestTrialData[trialIndex]);
                st += self.generateTrial(trialIndex);
                st += "\ttimeline.push(" + hel[hel_keys[1]] +");\n\n";
              } 
            } 
          }

          for(var childIndex in treeData.childIds) {
            generateTrialOutput(treeData.childIds[childIndex])
          }
          return true
      };
      generateTrialOutput(this.state.TreeData)

      st += "\t\tvar node = {\n";
      st += "\t\t\ttimeline_variables: timeline_variables,\n";
      st += "\t\t\ttimeline: timeline,\n";
      st += "\t\t\trandomize_order: true,\n";
      st += "\t\t\trepetitions: "+ this.state.repetitions +"\n\t\t}";



      st += "\n\t\tjsPsych.init({\n";
      st += "\t\t\ttimeline: [node],\n";
      st += "\t\t\tdisplay_element: $('#jspsych-target'),\n";
      st += "\t\t\ton_finish: function(){\n";
      st += "\t\t\t\tjsPsych.data.displayData();\n\t\t\t},\n";
      st += "\t\t\tdefault_iti: 250\n";
      st += "\t\t});\n";

      st += sclose;
      st += "\n\n\t</body>\n</html>";
      return st;
    },

    handlePreview : function(e) {
      if(this.state.CheckedTrials.length > 0) {
        var st = this.make_html();
        var newWindow = window.open("", "newWindow", "resizable=yes");
        newWindow.document.write(st);
        console.log('Previewed')  
      } else {
        this._notificationSystem.addNotification({
          message: 'Please select a trial...',
          level: 'info'
        });
        // alert("Please select a trial...")
      }
      
    },

    handleGenerate : function(e) {
      var zip = new JSZip();
      var st = this.make_html();
      zip.file("My_Experiment.html", st);
      var content = zip.generate({type:"blob"});
      SaveAs.saveAs(content, "example.zip");
      console.log('Generated')
    },

    handleSave : function(e) {
      var newObj = [ this.state.TestTrialData, this.state.TreeData ]
      var json = JSON.stringify(newObj, null, "\t");
      var blob = new Blob([json], {type: "application/json"});
    	SaveAs.saveAs(blob, "Experiment_data.json");

    },

    handleLoad : function(event) {
      var self = this;
      var file = event.target.files[0];
      var read = new FileReader();
      read.onload = function(e) {
        var jsonFormat = JSON.parse(e.target.result);
        self.setState({TestTrialData: jsonFormat[0], TreeData: jsonFormat[1]});
      }
      read.readAsText(file)
    },

    componentDidMount: function() {
      this._notificationSystem = this.refs.notificationSystem;
    },

    render: function(){
        
        return (
          <div>
             <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                  <i className="material-icons">home</i>
                  <span className="mdl-layout-title">jsPsych</span>

                  <div className="mdl-layout-spacer"></div>
                  
                  <div id="buttonpanel">
                
                    <button className="mdl-button mdl-js-button mdl-button-raised mdl-js-ripple-effect mdl-button-accent" onClick={this.handleSave}>Save</button>
                    <button className="mdl-button mdl-js-button mdl-button-raised mdl-js-ripple-effect mdl-button-accent" onClick={this.handlePreview}>Preview</button>
                    <button className="mdl-button mdl-js-button mdl-button-raised mdl-js-ripple-effect mdl-button-accent" onClick={this.handleGenerate}>Generate</button>
                    
                    <div className="fileUpload">
                    <span style={{fontWeight : 'normal'}}>UPLOAD</span>
                    <input      type="file" 
                                name="upload_json"
                                accept=".json"
                                className="upload"
                                
                                onChange={this.handleLoad}/>
                  </div>
           
              </div>
                  
                </div>
            </header>
            <div id = "leftside">
              <div id = "tree">
                <ul>
                  <Tree className="TrialText"
                        updateCheckedTrials={this.updateCheckedTrials} 
                        setCurrentTrial={this.setCurrentTrial} 
                        TreeData={this.state.TreeData} 
                        saveTree={this.saveTree}/>
                </ul>
              </div>
              
            </div>

            <div id = "rightside">
              {this.state.showSettings ? 
                <ShowSettings setTimelineVariables={this.setTimelineVariables} setRepetition={this.setRepetition} timelineVariable={this.state.timelineVariable}/> :
              <Trial  CurrentTrialData={this.state.CurrentTrialData}
                      showTrialData={this.state.showTrialData} 
                      saveModifiedTrialData={this.saveModifiedTrialData} 
                      AllPluginParameters={this.state.AllPluginParameters}/>
            }
            </div>
            <NotificationSystem ref="notificationSystem" />
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
        inputText:"Trial",
        currentId : 0,
        changed : false
      }
    },

  setCurrentTrial: function(selectedTrial) {
    this.state.changed = true
    if(this.props.tree !== undefined) {
      this.props.setCurrentTrial(selectedTrial,this.props.tree.id);    
    } else {
      this.props.setCurrentTrial(selectedTrial,this.state.tree.id);
    }
    
  },

  setTreeData: function(newTreeData) {
    this.setState({tree: newTreeData });
  },

  updateTree: function(treeData) {
      this.props.saveTree(treeData)
  },

  handleAddChildClick: function(parentId) {
      var temp = {
          id: count++,
          childIds: []
      };

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
    var copyTreeData = this.props.TreeData
    var indexChildFullTree
    if(copyTreeData.id === 0) {
     indexChildFullTree = copyTreeData.childIds.indexOf(removeNode)
     if(indexChildFullTree !== -1) {
      copyTreeData.childIds.splice(indexChildFullTree,1) 
     }
    }
    this.updateTree(copyTreeData)
    this.setState({TreeData: copyTreeData})
    
    var indexChild = this.props.treeData.childIds.indexOf(removeNode);
    this.props.treeData.childIds.splice(indexChild, 1)
    this.props.setTreeData(this.props.treeData)
  },

  renderChild: function(child) {
    return (
        
        <li  key={child.id} className="listy">

        <Tree tree={child} 
              setCurrentTrial={this.props.setCurrentTrial} 
              treeData={this.state.tree} 
              setTreeData={this.setTreeData} 
              TreeData={this.props.TreeData} 
              saveTree={this.props.saveTree}
              updateCheckedTrials={this.updateCheckedTrials} />
        </li>

      
    )
  },

  updateCheckedTrials: function(trialName, checked) {
      this.props.updateCheckedTrials(trialName,checked)
  },

  trialChecked: function(e) {
    var trialName = e.target.value
    var checked = e.target.checked
    this.updateCheckedTrials(trialName,checked)
  },

  changeTrialName: function(e) {
    this.setCurrentTrial(e.target.value)
    this.setState({inputText: e.target.value})
  },

  render: function() {
    var {id, childIds} = this.state.tree;
    if(this.props.tree !== undefined) {
      id = this.props.tree.id;
      childIds  = this.props.tree.childIds;
    }
    this.state.currentId = id
      return(
        <div>
          <div>
          <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <tbody>
            { id === 0 ?
             
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">
                    <a href="#" onClick={this.setCurrentTrial.bind(this,"MyExperiment")}><b>My Experiment</b></a> 
                  </td>
                </tr> :
              
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">
                    
                      <input type="checkbox"
                             id="list-checkbox-1" 
                             // className="mdl-checkbox__input"
                             value={ !this.state.changed ? this.state.inputText = this.state.inputText+id : this.state.inputText}
                             onChange={ this.trialChecked}/>
                  </td><td>
                   <div className="mdl-textfield mdl-js-textfield">
                        <input 
                               type="text"
                               className="mdl-textfield__input"
                               id="sample1"
                               value={ this.state.inputText}
                               onChange={this.changeTrialName}
                               onClick={this.setCurrentTrial.bind(this,this.state.inputText)}/>
                        
                    </div>
                    
                  </td> 
                  
              <td>
              {id !== 0 ?
                <a href="#" onClick={this.handleRemoveChildClick.bind(this,id)}
                   // style={{ color: 'black', textDecoration: 'none' }}
                   >
                  ×
                </a> :
                null
              }
            </td>
            </tr>

            }
            
            </tbody>
            </table>

            
{' '}
            <ul key="add">
              {childIds.map(this.renderChild)}
              
                <button    onClick={this.handleAddChildClick.bind(this,id)}>
                 +
                </button>
              
            </ul>

        
          </div>
        </div>
      );
  },

  componentDidMount: function() {
    this.state.changed = true
  }
});

var Trial = React.createClass({
    getInitialState: function() {
      return {
       selectedTrialType : "Select a trial type...",
       changeTrialType : false
       }
    },

  handleChange: function(e) {
    this.setState({selectedTrialType : e.target.value})
  },

  handleSave: function(e) {
      var newCurrentTrialData = this.refs.newCurrentTrialData.state.currentTrialValue
      var trialName = this.props.CurrentTrialData.label
      this.props.saveModifiedTrialData(trialName,this.state.selectedTrialType,newCurrentTrialData)
  },

  showData: function() {
    if(this.props.showTrialData) {
      var allTrialTypeName = []
      for(var obj in this.props.AllPluginParameters) {
        allTrialTypeName.push(this.props.AllPluginParameters[obj].name)
      }
      // console.log(allTrialName)

        return (
          <div id="right-side-form" >
        
          <Input type="select" className="mdl-textfield__input" label="Trial Type:" bsSize="large" onChange={this.handleChange}>
            <option value="Select a trial type...">Select a trial type</option>
            {allTrialTypeName.map(function(name) {
              return <option className="mdl-textfield mdl-js-textfield" value={name} key={name}>{name}</option>
            })}
          </Input>
          <MyForm AllPluginParameters={this.props.AllPluginParameters} 
              selectedTrialType={this.state.selectedTrialType}
              CurrentTrialData={this.props.CurrentTrialData}
              changeTrialType={this.state.changeTrialType}
              ref="newCurrentTrialData"/>
          <ButtonInput value="Save Data" className="mdl-button mdl-js-button mdl-button-raised mdl-button-accent" onClick={this.handleSave}/>
          </div>
        )
    }
  },


  render:function(){
    // console.log(this.props.AllPluginParameters)
    return(
      <div>
      {this.showData()}
      </div>
    );
  }
});

var MyForm = React.createClass({
  getInitialState: function() {
    return {
      selectedTrialParameters: [],
      currentTrialValue : {},
      value : ""
    }
  },

  handleChange: function(e) {
    // console.log(e.target.id)
    // this.state.value = e.target.value
    this.state.currentTrialValue[e.target.id] = e.target.value
    this.setState ({value : e.target.value})
    // console.log(this.state.currentTrialValue)
  },

  validationState: function(validationType) {

    if(validationType == "type1") {
      if(this.state.value.length > 0) {
        return 'success'
      } else {
        return 'error'
      }
    } else if(validationType == "boolean") {
      if(this.state.value.length>0) {
        if(this.state.value == "true" || this.state.value == "false") {
          return 'success'
        } else {
          return 'error'
        }
      }
    } else if(validationType == "function") {
      if(this.state.value.length > 0) {
        return 'success'
      } else {
        return 'error'
      }
    }

    let value = Number(this.state.value);
    
    if(this.state.value.length > 0) {
      if (!isNaN(value)) {
        return 'success';
      } else {
        return 'error';
      }  
    }
  },


  render: function() {
    console.log(this.props.selectedTrialType)
    this.state.currentTrialValue = {}

    for(var obj in this.props.AllPluginParameters) {
      if(this.props.AllPluginParameters[obj].name == this.props.selectedTrialType) {
        this.state.selectedTrialParameters = this.props.AllPluginParameters[obj].parameters
        break
      }
    }
    console.log(this.state.selectedTrialParameters)
    var self = this
    return (
      <div>
      { 
        this.state.selectedTrialParameters.map(function(parameter) {
        var output = ""
        var defaultValue = ""
        if(parameter.default != undefined) {
          defaultValue = parameter.default
        }
        if(parameter.type.includes("string") || parameter.type.includes("number") || parameter.type.includes("array") ) {
             if(parameter.type.includes("function")) {
              var unique_input_label = parameter.label + "_main"
              var unique_button = parameter.name + "_button"
              var unique_row = parameter.name +"_row"
              var unique_col1 = parameter.name + "_col1"
              var unique_col2 = parameter.name + "_col2"
              var unique_div = parameter.name +"_div"
              var tooltip_id1 = parameter.name + "_tooltip1"
              var tooltip_id2 = parameter.name + "_tooltip2"
              var tooltip = ( <Tooltip id={tooltip_id1}>Enter string, number or an array</Tooltip>)
              var tooltip2 = ( <Tooltip id={tooltip_id2}>Click to enter a function</Tooltip>)
               return (
                  <div key={unique_div}>
                  <Input label={parameter.label} key={unique_input_label} wrapperClassName="wrapper" bsSize="large">
                    <Row key={unique_row}>
                      <Col md={6} key={unique_col1}>
                        <OverlayTrigger placement="right" overlay={tooltip}>
                          <input type="text" className="form-control" id={parameter.name} key={parameter.name} placeholder={defaultValue}  onChange={self.handleChange}/>
                        </OverlayTrigger>
                      </Col>
                      <Col md={1} key={unique_col2}>
                        <OverlayTrigger placement="right" overlay={tooltip2}>
                          <input type="button" className="form-control btn" id={unique_button} key={unique_button} value="f"/>
                        </OverlayTrigger>
                      </Col>
                    </Row>
                  </Input>
                  </div>
                )
              } else {
                return (
                  <div key={unique_div}>
                  <Input label={parameter.label} key={unique_input_label} wrapperClassName="wrapper" bsSize="large">
                    <Row key={unique_row}>
                      <Col md={6} key={unique_col1}>
                        <input type="text" className="form-control" id={parameter.name} key={parameter.name} placeholder={defaultValue} onChange={self.handleChange}/>
                      </Col>
                    </Row>
                  </Input>
                  </div>
                )
              }
        }
        if(parameter.type.includes("boolean")) {
          return (
            <div key={unique_div}>
            <Input label={parameter.label} key={unique_input_label} wrapperClassName="wrapper" bsSize="large">
              <Row key={unique_row}>
                <Col md={3} key={unique_col1}>
                  <input type="text" className="form-control" id={parameter.name} key={parameter.name} placeholder={defaultValue} onChange={self.handleChange}/>
                </Col>
              </Row>
            </Input>
            </div>
          )
        }
        if(parameter.type.includes("function")) {
          return (
              <div key={unique_div}>
              <Input type="textarea" label={parameter.label} 
                                     id={parameter.name} 
                                     key={parameter.name} 
                                     placeholder={defaultValue} 
                                     bsSize="large" 
                                     onChange={self.handleChange}/>
              </div>
          )
        }
      })}
      </div>
    )
  }

})

var ShowSettings = React.createClass({
  getInitialState: function() {
    return{
      load : false,
      columns : [],
      rows : [],
      rowsLength : 0,
      value: ''
    }
  },

  setTimelineVariables: function(uploadedFileData) {
    this.props.setTimelineVariables(uploadedFileData)  
  },

  handleTimelineVariables: function(event) {
      var fileOutput;
      var self = this;
      var file = event.target.files[0];
      Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        fileOutput = results;
        console.log(fileOutput)
        self.setTimelineVariables(fileOutput.data)
        for(var objIndex in fileOutput.meta.fields) {
          self.state.columns.push({key:fileOutput.meta.fields[objIndex], name: fileOutput.meta.fields[objIndex], resizable:true})
        }
        
        for(var objIndex in fileOutput.data) {
          var rowData = {};
          for(var dataKey in fileOutput.data[objIndex]) {
            var obj = fileOutput.data[objIndex]
            rowData[dataKey] = obj[dataKey];  
          }
          self.state.rows.push(rowData);
        }
        
        self.setState({columns: self.state.columns, rows: self.state.rows, rowsLength: self.state.rows.length, load: true})
      }
      });
  },

  rowGetter: function(rowIdx) {
    return this.state.rows[rowIdx]
  },

  validationState: function() {

    let value = Number(this.state.value);
    
    if(this.state.value.length > 0) {
      if (!isNaN(value)) {
        return 'success';
      } else {
        return 'error';
      }  
    }
  },

  handleChange: function() {
    this.props.setRepetition(this.refs.input.getValue())
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  render: function() {
    return(
      <div>
      <h2>Timeline Settings</h2>
      <Row>
        <Col xs={6}>
          <Input type="text" 
                label="Repetitions" 
                placeholder="1" 
                bsSize="large"
                bsStyle={this.validationState()}
                onChange={this.handleChange}
                hasFeedback
                ref="input"
                groupClassName="group-class"
                labelClassName="label-class"/>
        </Col>
      </Row> 
      <div className="fileUpload">
      <span style={{fontWeight : 'normal'}}>Upload Timeline Variables</span>
        <input      type="file" 
      
                   name="upload_timeline_variables"
                   accept=".csv"
                   className="upload"
                   onChange={this.handleTimelineVariables} />
      </div>
      <br/>
      { this.state.load ? <ReactDataGrid  columns={this.state.columns}
                                          rowGetter={this.rowGetter}
                                          rowsCount={this.state.rows.length}
                                          maxWidth={600} />: "" }
      </div>
    )
  }
});

module.exports = SecondPage;