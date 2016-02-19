/**
 * jspsych-call-function
 * plugin for calling an arbitrary function during a jspsych experiment
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins['call-function'] = (function() {

  var plugin = {};

  plugin.parameters = function(){
	  var params = {
		  func:{
			  type : ['function'],
			  label: 'Function'
			  //default is undefined
		  },
		  timing_post_trial: { 
			  type: ['number'],
			  label: 'Timing Post Trial',
			  default: 0

		  }
	  }
	  return params;
	}
  
  plugin.trial = function(display_element, trial) {

    // one of the only plugins where we override the default experiment level
    // value of this parameter
    trial.timing_post_trial = typeof trial.timing_post_trial == 'undefined' ? 0 : trial.timing_post_trial

    var return_val = trial.func();

    var trial_data = {
      value: return_val
    };


    jsPsych.finishTrial(trial_data);
  };

  return plugin;
})();
