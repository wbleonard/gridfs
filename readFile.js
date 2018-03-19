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

    var response = fs.createWriteStream('output/' + fileToRead);

    var readstream = gfs.createReadStream({
        filename: fileToRead
    });
    console.log('-> Opened read and write streams');

    readstream.pipe(response);
    response.on('close', function() {
        console.log('-> File read from MongoDB and written to disk');
        process.exit();
    }) 
});