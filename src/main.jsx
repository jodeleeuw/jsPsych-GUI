
var React        = require('react')
var SecondPage = require('./components/SecondPage.jsx')
var ReactDOM = require('react-dom')
window.onload = function() {
  ReactDOM.render(
    <SecondPage />,
    document.getElementById('mainpage')
  )
}