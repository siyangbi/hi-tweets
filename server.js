var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var fs = require('fs');

var app = express(),
    router = express.Router();

app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var config = require('./config.json');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.database.dbName, config.database.master.user, config.database.master.password, {
    dialect: config.database.protocol,
    port: config.database.port,
    host: config.database.master.host,

    pool: {
        maxConnections: config.database.pool.maxConnections,
        maxIdleTime: config.database.pool.maxIdleTime
    },

    logging: false,
    define: {
        underscored: false,
        freezeTableName: false,
        syncOnAssociation: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        //classMethods: {method1: function() {}},
        //instanceMethods: {method2: function() {}},
        timestamps: true
        //schema: "prefix"
    }
});
var db = require('./models/')(sequelize);




fs.readdirSync(__dirname + '/routes/v1').forEach(function (file) {
    require(__dirname + '/routes/v1/' + file)(app, router, db);
});


app.use('/', router);

app.get('*', function(req, res) {
    console.log("herere");
    res.redirect('/#' + req.originalUrl);
});


app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});