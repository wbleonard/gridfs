var mongo = require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    Grid = require('gridfs-stream');
fs = require('fs')  // file system module

var fileToCheck = 'MetLife Testimonial.mov'

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    // Client returned
    var db = client.db('gridFS');
    console.log('-> Connected successfully to server');

    var gfs = Grid(db, mongo);

    gfs.exist({
        filename: fileToCheck
    }, function (err, found) {
        if (err) return handleError(err);
        found ? console.log('-> ' + fileToCheck + ' exists') : console.log('-> ' + fileToCheck + ' does not exist');
        process.exit();
    });
});
