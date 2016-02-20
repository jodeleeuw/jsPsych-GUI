var React = require('react');
var ReactDOM = require('react-dom');
var ReactJson = require('react-json');
var PluginParameter = require('./PluginParameter.json');
var pluginparameter = PluginParameter;

var SecondPage = React.createClass({
  getInitialState: function() {
    return {
      currentTrial : "Hello",
      testValue : 5
    }
  },

  setCurrentTrial: function(trialValue) {
    this.setState({currentTrial: trialValue});
  },
    
  /*testClick: function(e) {
    this.setState({testValue: 0});
  },*/
            
    render: function(){
        return (
          <div> 
            <div id = "leftside">
              <div id = "tree">
                <ul>                  
                  <Tree setCurrentTrial = {this.setCurrentTrial}/>
                </ul>
              </div>
        
              <div id="buttonpanel" className="buttonAlign btn-group" role="group" aria-label="...">
                <button id="savebutton" className="btn btn-primary">Save</button>
                <button id="loadbutton" className="btn btn-primary">Load</button>
                <button id="previewbutton" className="btn btn-primary">Preview</button>
                <button id="generatebutton" className="btn btn-primary">Generate</button>
              </div>
            </div>
                        
            <div id = "rightside">
              <Trial  currentTrial={this.state.currentTrial}/>
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
    // console.log(value1.value);
    this.props.setCurrentTrial(value1);
  },

  render: function() {
      return(
        <div id = "treestructure">
          <h4><a href="#" value="Hello" onClick={this.setCurrentTrial.bind(this,"Hello")}>Hello</a></h4>
          <h4><a href="#" value="Single" onClick={this.setCurrentTrial.bind(this,"Single")}>Single</a></h4>          
        </div>
      );
  }
});
// <span>{this.state.TreeObject[0].name}</span>
var Trial = React.createClass({
    getInitialState: function() {
      return {
       currentTrial : "Hello",
       TrialData : [{name:"Hello",text:"In Hello Trial"},{name:"Single",text:"In Single Stim Trial"}],
       PluginData : pluginparameter,
       PluginLabels : {},
       settings : { form: true,  fields: { } },
       propertyName: ""
       }
    },
    getIndex : function() {
      for(obj in this.state.TrialData) {
        if(this.state.TrialData[obj].name === this.props.currentTrial) {
          return obj;
        }
      }
    },
    handleChange : function(e) {
      console.log("In handle change for "+e.target.value);
      this.state.labels = new Object();
      for(obj in this.state.PluginData) {
        if(this.state.PluginData[obj].name === e.target.value) {
          for(obj2 in this.state.PluginData[obj].parameters) {
              this.state.labels[this.state.PluginData[obj].parameters[obj2].label] = "";
          }
        }
      }
      this.setState({PluginLabels : this.state.labels});
      console.log(this.state.PluginLabels);

    },
    render:function(){
      return(
        <div>
        <span id="fields"><select onChange={this.handleChange}>
          <option value="Hello">Hello</option>
          <option value="Single">Single</option>
        </select></span>
          <span><ReactJson value={ this.state.PluginLabels } settings={ this.state.settings }/></span>
        </div>
      );
    }
});
// <span><ReactJson value={ this.state.TrialData[this.getIndex()] } settings={ this.state.settings }/></span>
module.exports = SecondPage;

