/*
* Library for storing and editing data
*
*/

var fs = require('fs');
var path = require('path');
var filter = require('lodash/filter');

var lib = {};

lib.mediData = [];

//base directory of the data folder
lib.baseDir = path.join(__dirname, '../.data/');

lib.getId = function (currentId) {
    return currentId++;
};

//write data to a file
lib.write = function (dir, file, dataToWrite, callback) {
    //open the file for writing
    if (fs.existsSync(lib.baseDir + dir + '/' + file + '.json')) {
        //convert data to string

        fs
            .readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
                if (data.length == 0) {
                    data.push(dataToWrite);
                    var stringData = JSON.stringify(data);
                    fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, function (err) {
                        if (!err) {
                            callback('Successfully written to file');
                        } else {
                            callback('Error writing to new file');
                        }
                    });
                    callback(err, data);
                } else {
                    var parsedData = JSON.parse(data);
                    var found = parsedData.some(function (el) {
                        return el.Id === dataToWrite.Id;
                    });
                    if (!found) {
                        dataToWrite.Id = lib.getId(parsedData.length + 1);
                        parsedData.push(dataToWrite);
                        var stringData = JSON.stringify(parsedData);
                        fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, function (err) {
                            if (!err) {
                                callback('Successfully written to file');
                            } else {
                                callback('Error writing to new file');
                            }
                        });
                    } else {
                        callback('Medicine already exists');
                    }
                }
            });
    } else {
        fs
            .open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
                if (!err && fileDescriptor) {
                    //convert data to string
                    dataToWrite.Id = lib.getId(1);
                    lib
                        .mediData
                        .push(dataToWrite);
                    var stringData = JSON.stringify(lib.mediData);

                    //write to file and close it
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs
                                .close(fileDescriptor, function (err) {
                                    if (!err) {
                                        callback('Successfully written to file');
                                    } else {
                                        callback('Error while closing the file');
                                    }
                                });
                        } else {
                            callback('Error writing to new file');
                        }
                    });
                } else {
                    callback('Could not create new file, it may already exist');
                }
            });
    }
}

//Read from file
lib.read = function (dir, file, callback) {
    fs
        .readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
            callback(err, data);
        });
}

//update the data inside file
lib.update = function (dir, file, dataToOverwrite, callback) {
    fs
        .readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
            var requiredData = JSON.parse(data).filter(function (item) {
                return item.Id !== dataToOverwrite.Id
            })
            requiredData.push(dataToOverwrite);
            var stringData = JSON.stringify(requiredData);
            fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, function (err) {
                if (!err) {
                    callback('Successfully updated to file');
                } else {
                    callback('Error writing to new file');
                }
            });
        });
    }

    lib.delete = function (dir, file, dataToOverwrite, callback) {
        fs
            .readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function (err, data) {
                var requiredData = JSON.parse(data).filter(function (item) {
                    return item.Id !== dataToOverwrite.Id
                })
                var stringData = JSON.stringify(requiredData);
                fs.writeFile(lib.baseDir + dir + '/' + file + '.json', stringData, function (err) {
                    if (!err) {
                        callback('Successfully deleted from file');
                    } else {
                        callback('Error writing to new file');
                    }
                });
            });
        }

module.exports = lib;