var http = require('http');
var url = require('url');
var index = 1;
//var process = require('process');

var server = http.createServer(function(req, res){
	if (req.method == 'POST') {
		
		var header = req.headers['authorization'];        // get the header
		console.log("Authorization Header is: ", header);

  		var token = header.split(' ');
  		            // and the encoded auth token
     	var buf = new Buffer(token[1], 'base64').toString();    // convert from base64
      	var parts = buf.split(':');                          // split on colon

      	var username = parts[0];
      	var password = parts[1];
		/*console.log(index++ + " : POST");
		haeder = req.headers['authorization'];
		token = header.split(/\s+/).pop();
		auth = (new Buffer(token, 'base64').toString()).split(/:/);*/
		console.log(parts);
		console.log(req.url);
		console.log(url.parse(req.url, true).query);
		console.log('Server Running at http://127.0.0.1:8080');
	}
	res.end();
	}).listen(8080, function() {
		console.log('Server Running at http://127.0.0.1:8080');
	});


//https://stackoverflow.com/questions/5951552/basic-http-authentication-in-node-js