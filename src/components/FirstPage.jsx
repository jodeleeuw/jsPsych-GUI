var React = require('react');

var FirstPage = React.createClass({

  onChange: function(e){
    this.props.fieldValues.name = e.target.value;
    if(e.target.value!="")
        {
            $("#addbutton").removeClass("disabled");
            $("#addbutton").addClass("enabled");
  
        }
  },

  render: function(){
    return(
      <div className="col-sm-4 col-sm-offset-4">
        <div className="panel panel-default">
            <div className="panel-body">
                <form onSubmit= {this.handleSubmit}>
                    <input onChange={this.onChange} value={this.props.fieldValues.name} />
                    <button id="addbutton" className="btn btn-primary disabled" onClick={this.nextStep}>Add</button>
                </form>
            </div>
        </div>
      </div>
    );

  },

  nextStep: function(e) {
    e.preventDefault()

    // Get values via this.refs
    var data = {
      name     : this.props.fieldValues.name
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

module.exports = FirstPage;
