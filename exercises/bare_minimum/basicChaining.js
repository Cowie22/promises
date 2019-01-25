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

// Required pluckFirstLineFromFile in callback review
// Then promisified this function to be utilized below
// This is basically wrapping the function we made in in callbackReview
// And returning a new function that returns a promise
var pluckFirstLineFromFileAsync = Promise.promisify(callback.pluckFirstLineFromFile);
var requestGitHubProfileAsync = promisification.getGitHubProfileAsync;
// This function returns a promise
var writeToFilePathAsync = (filePath, data) => {
  // Here the promise is being made
  return new Promise((resolve, reject) => {
    var stringifyData = JSON.stringify(data);
    // Instead of using callback on err and data, we use the reject and 
    // Resolve functions to pass parameter to .catch and .then
    fs.writeFile(filePath, stringifyData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  }) 
}
// The purpose of this function combines all of our promises and 
// Chains them together, in order to do three things
// 1. it reads the file
// 2. it request github profile
// 3. writes the github profile to the filepath
var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // Here we will return the promise of a value that is obtained from running the 
  // PluckFirstLineFromFileAsync function on readFilePath, which will give 
  // Us the firstline of the path
  return pluckFirstLineFromFileAsync(readFilePath)
    // After the value is obtained from the promise above, we can run the
    // Next promise function
    .then((firstLine) => {
      // Here the promise value will be the 'user' in the requestGitHubProfileAsync
      // Promise, esentially giving us the user's profile
      return requestGitHubProfileAsync(firstLine)
    })
    // After the value is obtained from the promise above, we can run the
    // Next promise function
    .then((userProfile) => {
      // Here we strigify the data and write it to the cooresponding file path
      return writeToFilePathAsync(writeFilePath, userProfile)
    })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
