var superagent = require('superagent');

function API() {
    
    var token = process.env.APP_TOKEN,
        secret = process.env.APP_SECRET,
        root = process.env.API_ROOT;
    
    function Viewers() {
        function getViewerPoints(nick, callback) {
            superagent.get(root + '/v1/viewers/' + nick)
                .set('client-token', token)
                .set('client-secret', secret)
                .end(function(e, result){
                    if (e) return console.error(e);
                    callback(result.body);
                });
        }
        
        return {
            getViewerPoints: getViewerPoints
        };
    }
    
    return {
        viewers: new Viewers()
    };
}

module.exports = new API();