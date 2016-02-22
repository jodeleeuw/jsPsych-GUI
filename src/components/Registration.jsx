
var React         = require('react')
var FirstPage = require('./FirstPage.jsx')
var SecondPage  = require('./SecondPage.jsx')
var assign        = require('object-assign')

// Idealy, these form values would be saved in another
// sort of persistence, like a Store via Flux pattern
var fieldValues = {
  name     : null,
  testValue : null
}

var Registration = React.createClass({
  getInitialState: function() {
    return {
      step : 1
    }
  },

  saveValues: function(field_value) {
    return function() {
      fieldValues = assign({},  fieldValues, field_value)
    }.bind(this)()
  },

  nextStep: function() {
    this.setState({
      step : this.state.step + 1
    })
  },


  showStep: function() {
    switch (this.state.step) {
      case 1:
        return <FirstPage fieldValues={fieldValues}
                              nextStep={this.nextStep}
                              saveValues={this.saveValues} />
      case 2:
        return <SecondPage fieldValues={fieldValues}
                             saveValues={this.saveValues} />
    }
  },

  render: function() {

    return (
      <main>
        {this.showStep()}
      </main>
    )
  }
})

module.exports = Registration
