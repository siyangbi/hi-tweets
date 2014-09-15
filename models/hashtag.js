var Twit = require('twit');

var T = new Twit({
    consumer_key:         '',
    consumer_secret:      '',
    access_token:         '',
    access_token_secret:  ''
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
                    since: '2011-11-11',
                    count: 10,
                    lang: 'en'
                };

                if (maxId) {
                    params.max_id = maxId - 1;
                }


                console.log(params);

                T.get('search/tweets', params, function(err, data, response) {
                    callback(null, data);
                });
            }
        }
    });

    return Hashtag;
};
