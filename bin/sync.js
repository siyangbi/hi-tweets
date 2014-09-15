var Sequelize = require('sequelize');
var config = require('../config.json');
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
var db = require('../models')(sequelize);

db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function(){
        return db.sequelize.sync({ force: true });
    })
    .then(function(){
        console.log('Database synchronised.');
        process.exit(0);
    }, function(err){
        console.log(err);
        process.exit(0);
    });