
var React        = require('react')
var Registration = require('./components/Registration.jsx')
var ReactDOM = require('react-dom')
window.onload = function() {
  ReactDOM.render(
    <Registration />,
    document.getElementById('mainpage')
  )
}