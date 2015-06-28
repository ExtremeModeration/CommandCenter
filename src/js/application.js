window.moment = require('moment');
window._ = require('lodash');

// init the IRC listeners
require('./listeners/IRC').start();

var React = require('react');
var CommandCenter = require('./components/CommandCenter.react');
React.render(<CommandCenter />, document.getElementById('application_wrapper'));
