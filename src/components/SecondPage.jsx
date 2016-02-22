var React = require('react');
var ReactDOM = require('react-dom');
var ReactJson = require('react-json');
var PluginParameter = require('./PluginParameter.json');
// var generate = require('./generate.jsx');
// var GenerateTest = require('./generate_test.jsx');
var pluginparameter = PluginParameter;

var SecondPage = React.createClass({
  getInitialState: function() {
    return {
      currentTrial : "Hello",
      testValue : 5,
      // TestTrialData : [{label:"Text1",text:"Hey...this is in Text1",cont_key:"f"},{label:"Text2",text:"Hey...this is in Text2",cont_key:"e"}]
      TestTrialData : [{label:"hello_trial", text:"Hey...this is in Text1",cont_key:"f"}]
    }
  },

  setCurrentTrial: function(trialValue) {
    this.setState({currentTrial: trialValue});
  },

  /*testClick: function(e) {
    this.setState({testValue: 0});
  },*/

  initialLines: function() {
    var st = "<!doctype html>\n\n<html>\n\t<head>\n\t\t<title>My experiment</title>\n\t\t<script";
    st += " src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js\"></script>\n\t\t<script";
    st += " src=\"jspsych-5.0.1/jspsych.js\"></script>\n\t\t<script";
    //add whatever plugins u need
    st += " src=\"jspsych-5.0.1/plugins/jspsych-text.js\"></script>\n\t\t<link";
    st += " href=\"jspsych-5.0.1/css/jspsych.css\" rel=\"stylesheet\"";
    st += " type=\"text/css\"></link>\n";
    return st;
  },

   generate_hello_trial: function() {
    st = this.initialLines();
    st += "\t</head>\n\n\t<body>\n";

    TestTrialData : [{label:"hello_trial", text:"Hey...this is in Text1",cont_key:"f"}]
    var hel = this.state.TestTrialData[0];
    console.log(hel);
    var hel_keys = Object.keys(this.state.TestTrialData[0]);

    var sopen = "\n\t<script>\n";
    var sclose = "\n\t</script>\n";

    st += sopen;
    st += "\t\tvar " + hel[hel_keys[0]] + " = {\n";
    st += "\t\t\ttype: '" + hel_keys[1] + "',\n";
    st += "\t\t\t" + hel_keys[1] + ": '" + hel[hel_keys[1]] + "',\n";
    st += "\t\t\t" + hel_keys[2] + ": '" + hel[hel_keys[2]] + "',\n";
    st += "\t\t}\n\n";

    return st;
  },

    handleGenerate : function(e) {
      var saveAs = saveAs || (function(view) {
      	"use strict";
      	// IE <10 is explicitly unsupported
      	if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
      		return;
      	}
      	var
      		  doc = view.document
      		  // only get URL when necessary in case Blob.js hasn't overridden it yet
      		, get_URL = function() {
      			return view.URL || view.webkitURL || view;
      		}
      		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
      		, can_use_save_link = "download" in save_link
      		, click = function(node) {
      			var event = new MouseEvent("click");
      			node.dispatchEvent(event);
      		}
      		, is_safari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent)
      		, webkit_req_fs = view.webkitRequestFileSystem
      		, req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem
      		, throw_outside = function(ex) {
      			(view.setImmediate || view.setTimeout)(function() {
      				throw ex;
      			}, 0);
      		}
      		, force_saveable_type = "application/octet-stream"
      		, fs_min_size = 0
      		, arbitrary_revoke_timeout = 500 // in ms
      		, revoke = function(file) {
      			var revoker = function() {
      				if (typeof file === "string") { // file is an object URL
      					get_URL().revokeObjectURL(file);
      				} else { // file is a File
      					file.remove();
      				}
      			};
      			if (view.chrome) {
      				revoker();
      			} else {
      				setTimeout(revoker, arbitrary_revoke_timeout);
      			}
      		}
      		, dispatch = function(filesaver, event_types, event) {
      			event_types = [].concat(event_types);
      			var i = event_types.length;
      			while (i--) {
      				var listener = filesaver["on" + event_types[i]];
      				if (typeof listener === "function") {
      					try {
      						listener.call(filesaver, event || filesaver);
      					} catch (ex) {
      						throw_outside(ex);
      					}
      				}
      			}
      		}
      		, auto_bom = function(blob) {
      			// prepend BOM for UTF-8 XML and text/* types (including HTML)
      			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      				return new Blob(["\ufeff", blob], {type: blob.type});
      			}
      			return blob;
      		}
      		, FileSaver = function(blob, name, no_auto_bom) {
      			if (!no_auto_bom) {
      				blob = auto_bom(blob);
      			}
      			// First try a.download, then web filesystem, then object URLs
      			var
      				  filesaver = this
      				, type = blob.type
      				, blob_changed = false
      				, object_url
      				, target_view
      				, dispatch_all = function() {
      					dispatch(filesaver, "writestart progress write writeend".split(" "));
      				}
      				// on any filesys errors revert to saving with object URLs
      				, fs_error = function() {
      					if (target_view && is_safari && typeof FileReader !== "undefined") {
      						// Safari doesn't allow downloading of blob urls
      						var reader = new FileReader();
      						reader.onloadend = function() {
      							var base64Data = reader.result;
      							target_view.location.href = "data:attachment/file" + base64Data.slice(base64Data.search(/[,;]/));
      							filesaver.readyState = filesaver.DONE;
      							dispatch_all();
      						};
      						reader.readAsDataURL(blob);
      						filesaver.readyState = filesaver.INIT;
      						return;
      					}
      					// don't create more object URLs than needed
      					if (blob_changed || !object_url) {
      						object_url = get_URL().createObjectURL(blob);
      					}
      					if (target_view) {
      						target_view.location.href = object_url;
      					} else {
      						var new_tab = view.open(object_url, "_blank");
      						if (new_tab == undefined && is_safari) {
      							//Apple do not allow window.open, see http://bit.ly/1kZffRI
      							view.location.href = object_url
      						}
      					}
      					filesaver.readyState = filesaver.DONE;
      					dispatch_all();
      					revoke(object_url);
      				}
      				, abortable = function(func) {
      					return function() {
      						if (filesaver.readyState !== filesaver.DONE) {
      							return func.apply(this, arguments);
      						}
      					};
      				}
      				, create_if_not_found = {create: true, exclusive: false}
      				, slice
      			;
      			filesaver.readyState = filesaver.INIT;
      			if (!name) {
      				name = "download";
      			}
      			if (can_use_save_link) {
      				object_url = get_URL().createObjectURL(blob);
      				setTimeout(function() {
      					save_link.href = object_url;
      					save_link.download = name;
      					click(save_link);
      					dispatch_all();
      					revoke(object_url);
      					filesaver.readyState = filesaver.DONE;
      				});
      				return;
      			}
      			if (view.chrome && type && type !== force_saveable_type) {
      				slice = blob.slice || blob.webkitSlice;
      				blob = slice.call(blob, 0, blob.size, force_saveable_type);
      				blob_changed = true;
      			}
      			if (webkit_req_fs && name !== "download") {
      				name += ".download";
      			}
      			if (type === force_saveable_type || webkit_req_fs) {
      				target_view = view;
      			}
      			if (!req_fs) {
      				fs_error();
      				return;
      			}
      			fs_min_size += blob.size;
      			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
      				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
      					var save = function() {
      						dir.getFile(name, create_if_not_found, abortable(function(file) {
      							file.createWriter(abortable(function(writer) {
      								writer.onwriteend = function(event) {
      									target_view.location.href = file.toURL();
      									filesaver.readyState = filesaver.DONE;
      									dispatch(filesaver, "writeend", event);
      									revoke(file);
      								};
      								writer.onerror = function() {
      									var error = writer.error;
      									if (error.code !== error.ABORT_ERR) {
      										fs_error();
      									}
      								};
      								"writestart progress write abort".split(" ").forEach(function(event) {
      									writer["on" + event] = filesaver["on" + event];
      								});
      								writer.write(blob);
      								filesaver.abort = function() {
      									writer.abort();
      									filesaver.readyState = filesaver.DONE;
      								};
      								filesaver.readyState = filesaver.WRITING;
      							}), fs_error);
      						}), fs_error);
      					};
      					dir.getFile(name, {create: false}, abortable(function(file) {
      						// delete file if it already exists
      						file.remove();
      						save();
      					}), abortable(function(ex) {
      						if (ex.code === ex.NOT_FOUND_ERR) {
      							save();
      						} else {
      							fs_error();
      						}
      					}));
      				}), fs_error);
      			}), fs_error);
      		}
      		, FS_proto = FileSaver.prototype
      		, saveAs = function(blob, name, no_auto_bom) {
      			return new FileSaver(blob, name, no_auto_bom);
      		}
      	;
      	// IE 10+ (native saveAs)
      	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
      		return function(blob, name, no_auto_bom) {
      			if (!no_auto_bom) {
      				blob = auto_bom(blob);
      			}
      			return navigator.msSaveOrOpenBlob(blob, name || "download");
      		};
      	}

      	FS_proto.abort = function() {
      		var filesaver = this;
      		filesaver.readyState = filesaver.DONE;
      		dispatch(filesaver, "abort");
      	};
      	FS_proto.readyState = FS_proto.INIT = 0;
      	FS_proto.WRITING = 1;
      	FS_proto.DONE = 2;

      	FS_proto.error =
      	FS_proto.onwritestart =
      	FS_proto.onprogress =
      	FS_proto.onwrite =
      	FS_proto.onabort =
      	FS_proto.onerror =
      	FS_proto.onwriteend =
      		null;

      	return saveAs;
      }(
      	   typeof self !== "undefined" && self
      	|| typeof window !== "undefined" && window
      	|| this.content
      ));
      // `self` is undefined in Firefox for Android content script context
      // while `this` is nsIContentFrameMessageManager
      // with an attribute `content` that corresponds to the window

      if (typeof module !== "undefined" && module.exports) {
        module.exports.saveAs = saveAs;
      } else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
        define([], function() {
          return saveAs;
        });
      }

      st = this.generate_hello_trial();
      st += "\t\tjsPsych.init({\n";

      var hel = this.state.TestTrialData[0];
      console.log(hel);
      var hel_keys = Object.keys(this.state.TestTrialData[0]);
      st += "\t\t\ttimeline: [ " + hel[hel_keys[0]] + " ]\n\t\t})";

      var sclose = "\n\t</script>\n";
      st += sclose;
      st += "\n\n\t</body>\n</html>";
      var blob = new Blob([st], {type: "text/plain;charset=utf-8"});
    	saveAs(blob, "My_Experiment.html");
    },

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
              <button id="loadbutton" className="btn btn-primary">Load</button>
                <button id="savebutton" className="btn btn-primary">Save</button>
                <button id="previewbutton" className="btn btn-primary">Preview</button>
                <button id="generatebutton" className="btn btn-primary" onClick={this.handleGenerate}>Generate</button>
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
    // returnData : function() {
    //   // var dict = [];
    //   // dict.push({key: this.TrialData.name, value: "R"});
    //   // return dict;
    //   return 2;
    // },
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
