const path = require("path");

exports.generateRandomFileName = (fileName) => {
  const fileExtName = path.extname(fileName);
  var baseName = path.basename(fileName, fileExtName);
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 32).toString(32))
    .join("");

  return `${randomName}-${baseName.trim()}${fileExtName}`;
};
