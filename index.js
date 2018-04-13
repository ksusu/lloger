#!/usr/bin/env node

//Arguments List
var http = require('http');
var fs = require('fs');
var process = require('process');
var functions = require('./lib/functions.js');
const { URL } = require('url');

var COMMAND = process.argv[2] // Command is argv 2 of process.argv
var COM_ARGS = process.argv.slice(3); // Command argumnet are start from argv 3
var hosturl = new URL('http://127.0.0.1:8080');
var cpath = "/";

var save_path = 'lloger.txt';

/***********************************************************************************/
// Program section

//requesting phase
//functions.check_Command();

var options = functions.classify_Command(hosturl, COMMAND, COM_ARGS);

if (options instanceof Error) {
	console.log(options.message + " index.js");
} else {
	var req = http.request(options);

	req.on('error', function(e) {
		console.error("problem with request:" + e.message);
	})

	//End phase
	req.end();
}

/***********************************************************************************/

/*
error 예제 : https://stackoverflow.com/questions/7310521/node-js-best-practice-exception-handling
*/