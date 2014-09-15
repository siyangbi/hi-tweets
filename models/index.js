module.exports = function(sequelize, Sequelize) {
    var fs = require('fs'),
        path = require('path'),
        _ = require('lodash'),
        db = {};

    fs.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    }).forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].hasOwnProperty('associate')) {
            db[modelName].associate(db);
        }
    });

    return _.extend({
        sequelize: sequelize,
        Sequelize: Sequelize
    }, db);
}