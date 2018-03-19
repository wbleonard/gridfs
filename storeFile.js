var mongo = require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    Grid = require('gridfs-stream');
    fs = require('fs')  // file system module

var fileToStore = 'MetLife Testimonial.mov'

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    // Client returned
    var db = client.db('gridFS');
    console.log('-> Connected successfully to server');

    var gfs = Grid(db, mongo);

    // streaming to gridfs
    var writestream = gfs.createWriteStream({
        filename: fileToStore
    });

    fs.createReadStream('./input/' + fileToStore).pipe(writestream);
    console.log('-> Opened read and write streams');

    writestream.on('close', function (file) {
        // do something with 'file'
        console.log('-> ' + file.filename + ' written to MongoDB');
        process.exit();
    });
});