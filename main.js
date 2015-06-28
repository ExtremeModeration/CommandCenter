var app = require('app');
var BrowserWindow = require('browser-window');
var irc = require('irc');

require('dotenv').load();
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function(){
  mainWindow = new BrowserWindow({width: 1024, height: 600, resizable: false, frame: false});

  mainWindow.loadUrl('file://' + __dirname + '/dist/index.html');

  // Open the devtools.
  //mainWindow.openDevTools();

  // Connect to IRC
  connectIrc(mainWindow);

  mainWindow.quit_app = function() {
    app.quit();
  };

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function connectIrc(_window) {
  var opts = {
    userName: process.env.IRC_USERNAME,
    realName: process.env.IRC_REALNAME,
    password: process.env.IRC_PASSWORD,
    channels: ['#' + process.env.IRC_USERNAME.toLowerCase()],
    debug: true,
    showErrors: true
  };

  var client = new irc.Client('irc.twitch.tv',opts.userName,opts);

  client.addListener('registered', function(message){
    console.log(message);
    client.send('CAP', 'REQ', 'twitch.tv/membership');
  });

  client.addListener('raw', function(message){
    console.log('raw: ', message);
  });

  client.addListener('error', function(message){
    console.log('error: ', message);
  });

  _window.irc = {
    client: client,
    opts: opts
  };

}
