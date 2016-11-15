var express = require('express');
var fs = require('fs');
var glob = require('glob');
var cp = require( 'child_process' );

var app = express();

var packageList = {};

glob("lib/**/.bower.json", null, function (er, files) {
  files.forEach(function(file) {
    let obj = JSON.parse(fs.readFileSync(file, 'utf8'));
    packageList[obj.name] = obj.version;
  });
});

app.use(express.static('lib'));

app.get('/list', function (req, res) {
  res.send(packageList);
});

app.get('/install', function (req, res) {
  console.log('start');
  let output = cp.execSync('bower install');
  console.log(output);
  console.log('end');
});

app.get('/validate/:package', function(req, res) {
  res.send(!!packageList[req.params.package]);
});

var server = app.listen(8081, function () {

   let host = server.address().address;
   let port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);

});
