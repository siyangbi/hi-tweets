var Twit = require('twit');
var config = require('../config.json');

var T = new Twit({
    consumer_key:         config.twitter.consumer_key,
    consumer_secret:      config.twitter.consumer_secret,
    access_token:         config.twitter.access_token,
    access_token_secret:  config.twitter.access_token_secret
});


module.exports = function (sequelize, DataTypes) {
    var Hashtag = sequelize.define('Hashtag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        instanceMethods: {

        },
        classMethods: {
            getTweets: function (q, maxId, callback) {
                var params = {
                    q: q,
                    result_type: 'recent',
                    count: 10,
                    lang: 'en'
                };

                if (maxId) {
                    params.max_id = maxId - 1;
                }

                T.get('search/tweets', params, function(err, data, response) {
                    callback(null, data);
                });
            }
        }
    });

    return Hashtag;
};