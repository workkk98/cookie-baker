#!/usr/bin/env node

const fs = require('fs');

const argv = process.argv;
const sourceJSON = require('./package.json');
const extensionJSON = require('../cookie-baker-extension/manifest.json');

console.log(argv[2]);

function updateVersion (JSON, version) {
  return Object.assign({
    ...JSON
  }, {
    version: version
  });
}

const source = JSON.stringify(updateVersion(sourceJSON, argv[2]), null, 2);
const extesnion = JSON.stringify(updateVersion(extensionJSON, argv[2]), null, 2);

fs.writeFile('./package.json', source, function (err) {
  if (err) {
    console.error(err);
  }
});

fs.writeFile('../cookie-baker-extension/manifest.json', extesnion, function (err) {
  if (err) {
    console.error(err);
  }
});