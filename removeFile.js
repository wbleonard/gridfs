var mongo = require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    Grid = require('gridfs-stream');
fs = require('fs')  // file system module

var fileToRemove = 'MetLife Testimonial.mov'

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    // Client returned
    var db = client.db('gridFS');
    console.log('-> Connected successfully to server');

    var gfs = Grid(db, mongo);

    gfs.remove({
        filename: fileToRemove
    }, function (err, gridStore) {
        if (err) return handleError(err);
        console.log('-> ' + fileToRemove + ' removed from MongoDB');
        process.exit();
    });
});