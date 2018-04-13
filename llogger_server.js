var http = require('http');
var url = require('url');
var mysql = require('mysql');

var client = mysql.createConnection({
	user : 'root',
	password : '7748'
});

var index = 1;
//var process = require('process');

var server = http.createServer(function(req, res){
	if (req.method == 'POST') {
		console.log(index++ + " : POST");

		var header = req.headers['authorization'];       	 	// get the header
		console.log("Authorization Header is: ", header);

  		var token = header.split(' ');            				// and the encoded auth token
     	var buf = new Buffer(token[1], 'base64').toString();    // convert from base64
      	var parts = buf.split(':');                          	// split on colon

      	var username = parts[0];
      	var password = parts[1];

		console.log('parts : ' + parts);
		console.log('ID : ' + username + '/ PW : ' + password);
		console.log('url : ' + req.url);
		console.log('query : ' + url.parse(req.url, true).query);
		if (req.url == '/register') {
			client.query('INSERT INTO Users (username, password) VALUES (?, ?)', [
				username, password
			], function () {
			})
		} else if (req.url == '/deregister') {
			client.query('SELECT password From Users WHERE id = ?', [
				username
			], function (error, result) {
			})
		}

		console.log('Server Running at http://127.0.0.1:8080');
	}
	res.end();
	}).listen(8080, function() {
		console.log('Server Running at http://127.0.0.1:8080');
	});


//https://stackoverflow.com/questions/5951552/basic-http-authentication-in-node-js