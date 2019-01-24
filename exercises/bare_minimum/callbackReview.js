/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // Read a file at specified filePath
  fs.readFile(filePath, (error, data) => {
    if (error) {
      callback(error);
    } else {
      var string = data.toString();
      // Split complete file string by the newLine Charcter
      var firstLine = string.split('\n')[0];
      // Return the first line into the callback
      callback(null, firstLine);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request.get(url, (err, data) => {
    if (err) {
      callback(err);
    } else {
      var status = data.statusCode;
      callback(null, status);
    }
  })
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
