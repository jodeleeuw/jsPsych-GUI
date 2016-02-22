var React = require('react');

var GenerateTest = React.createClass({
  downloadHtml: function(){
		<span>Testing...</span>
		console.log('in generate');
		// return (
		// 	<span>Testing...</span>
		// );
  },
  render: function(){
		return (
			<span>{this.downloadHtml()}</span>
		);
  }

})


module.exports = GenerateTest;
