module.exports = function(app, router, db) {

    var hashtag = require('../../controllers/hashtag')(db);

    router.route('/hashtags')
        .get(hashtag.index)
        .post(hashtag.store);


    router.route('/hashtags/:id')
        .get(hashtag.show)
        .put(hashtag.update)
        .delete(hashtag.destroy);

    app.use('/v1', router);
};