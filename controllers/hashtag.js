var _ = require('lodash');

module.exports = function(db) {

    function Hashtag() {

    }

    Hashtag.store = function(req, res, next) {
        db.Hashtag.create(req.body)
            .success(function (hashtag) {
                res.send(hashtag);
            })
            .error(function(error) {
                res.send(error);
            });
    };

    Hashtag.index = function(req, res, next) {

        db.Hashtag.findAll().success(function(hashtags) {
            hashtags = JSON.parse(JSON.stringify(hashtags));
            res.send(hashtags);
        }).error(function (error) {
            res.send(error);
        });
    };

    Hashtag.show = function(req, res, next) {

        db.Hashtag.find({
            where: {id: req.params.id}
        }).success(function (hashtag) {
            hashtag = hashtag.values;
            var q = hashtag.name;
            var maxId = req.query.maxId || null;
            db.Hashtag.getTweets(q, maxId, function(error, data) {
               hashtag.statuses = data.statuses;
               var lastTweet = data.statuses[data.statuses.length-1];
               hashtag.maxId = lastTweet.id - 1;
               res.send(hashtag);
            });
        }).error(function (error) {
            res.send(error);
        });

    };

    Hashtag.update = function(req, res, next) {
        //@todo
    };

    Hashtag.destroy = function(req, res, next) {
        //@todo
    };

    return Hashtag;
};