var mongo = require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    Grid = require('gridfs-stream');
fs = require('fs')  // file system module

var fileToRead = 'MetLife Testimonial.mov'

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    // Client returned
    var db = client.db('gridFS');
    console.log('-> Connected successfully to server');

    var gfs = Grid(db, mongo);
    
    gfs.files.find({filename: fileToRead}).toArray(function (err, files) {
        if (err) return handleError(err);
        console.log(files);
        process.exit();
    });
});
