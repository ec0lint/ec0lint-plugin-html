const fs = require("fs"); //Load the filesystem module

function getFileSize(path) {
  const stats = fs.statSync(path);
  const fileSizeInBytes = stats.size;
  //Convert the file size to megabytes

  return fileSizeInBytes / 1000000.0;
}

function calculateCO2Emission(filesize) {
  return filesize * 442 * 0.00081;
}

function calculateCO2LazyLoadReduction(path) {
  const fileSize = getFileSize(path);
  return calculateCO2Emission(fileSize);
}

module.exports = calculateCO2LazyLoadReduction;
