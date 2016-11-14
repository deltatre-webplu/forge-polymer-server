var express = require('express');
var fs = require('fs');
var glob = require('glob');

var app = express();

var packageList = {};
glob("lib/**/.bower.json", null, function (er, files) {
  files.forEach(function(file) {
    var obj = JSON.parse(fs.readFileSync(file, 'utf8'));
    packageList[obj.name] = obj.version;
  });
});

app.use(express.static('lib'));

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get('/list', function (req, res) {
  res.send(packageList);
});

app.get('/validate/:package', function(req, res) {
  res.send(!!packageList[req.params.package]);
});

var server = app.listen(8081, function () {

   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);

});
