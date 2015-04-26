var irc = require('irc'),
    _ = require('lodash'),
    api = require('./API');

function IrcService() {
    
    var bot,
        config = {
            userName: 'ExtremeModeration',
            nick: 'extrememoderation',
            realName: 'ExtremeModeration',
            password: process.env.TWITCH_TOKEN,
            channels: ['#' + process.env.TWITCH_AUTO_JOIN_CHANNEL],
            secure: false,
            debug: false,
            announce: false,
            sendDelay: 15*60*1000,
            messageDelay: 10
        };
    
    function defaultChannel() {
        return config.channels[0];
    }
    
    function connect() {
        console.log('Time to get this party started!\nConnecting to ' + defaultChannel() + '...');
        bot = new irc.Client('irc.twitch.tv', config.nick, config);
        if (config.debug) {
            bot.addListener('raw', onRaw);
        }
        bot.addListener('message', onMessage);
        bot.addListener('join', onJoin);
        bot.addListener('part', onPart);
        bot.addListener('names', onListNames);
    }
    
    function disconnect(callback){
        bot.disconnect(callback);
    }
    

    function onListNames(channel, _nicks) {
        for (var nick in _nicks) {
            if (!_.includes(nicks, nick)) {
                nicks.push(nick);
            }
        }
    }
    
    function onMessage(from, to, text, message) {
        // TODO: insert the message into chat
    }
    
    function onJoin(channel, nick, message) {
        if (config.announce && nick.toLowerCase() === config.nick.toLowerCase()) {
            bot.say(channel, config.nick + ' has arrived!');
        }
        
        if (!_.includes(nicks, nick)) {
            nicks.push(nick);
        }
    }
    
    function onPart(channel, nick) {
        var nickIndex = _.indexOf(nicks, nick);
        if (nickIndex >= 0) {
            nicks.splice(nickIndex, 1);
        }
    }
    
    function onRaw(message) {
        console.log(message);
    }
    
    return {
        connect: connect,
        disconnect: disconnect
    };
    
}

module.exports = new IrcService();