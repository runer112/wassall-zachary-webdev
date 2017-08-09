var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/assignment'; // for local

if(process.env.MLAB_USERNAME) {
    connectionString = encodeURIComponent(process.env.MLAB_USERNAME) + ":" +
        encodeURIComponent(process.env.MLAB_PASSWORD) + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var mongoose = require("mongoose");
// https://stackoverflow.com/a/23344660
mongoose.connect(connectionString, {
        uri_decode_auth: true
    }, function(err, db) {

    }
);

mongoose.Promise = q.Promise;
