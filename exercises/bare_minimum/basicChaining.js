/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var callback = require('./callbackReview');
var promisification = require('./promisification');

var pluckFirstLineFromFileAsync = Promise.promisify(callback.pluckFirstLineFromFile);
var requestGitHubProfileAsync = promisification.getGitHubProfileAsync;

var writeToFilePathAsync = (filePath, data) => {
  return new Promise((resolve, reject) => {
    var stringifyData = JSON.stringify(data);
    fs.writeFile(filePath, stringifyData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  }) 
}

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((firstLine) => {
      return requestGitHubProfileAsync(firstLine)
    })
    .then((userProfile) => {
      return writeToFilePathAsync(writeFilePath, userProfile)
    })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
