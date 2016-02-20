var React = require('react');
var ReactDOM = require('react-dom');


var SecondPage = React.createClass({
  getInitialState: function() {
    return {
      currentTrial : "Hello",
      testValue : 5
    }
  },

  setCurrentTrial: function(trialValue) {
    console.log("In second Page : "+trialValue);
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
    console.log(value1);
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
       // currentIndex : 1,
       TrialData : [{name:"Hello",text:"In Hello Trial"},{name:"Single",text:"In Single Stim Trial"}]
      }
    },
    getIndex : function() {
      for(obj in this.state.TrialData) {
        console.log(this.state.TrialData[obj].name + " " + this.props.currentTrial);
        if(this.state.TrialData[obj].name === this.props.currentTrial) {
          // this.setState({currentIndex: i});
          return obj;
        }
      }
    },
    render:function(){
      console.log(this.getIndex());
      return(
        <span>{this.state.TrialData[this.getIndex()].text}</span>
      );
    }
});
          //<span>{this.state.TrialData[0].text}</span> 
          // <span>{this.state.TrialData[this.state.currentIndex].text}</span>
module.exports = SecondPage;

