var fs = require('fs');
var process = require('process');
var save_path = 'llogger.txt'


// Arguments tests
module.exports.check_Command = function check_Command(){
	process.argv.forEach((item, index) =>{ 
		console.log(index + ' : ' + typeof(item) + ' : ' + item);
	});
	console.log('COMMAND : '  + COMMAND);
	console.log('COM_ARGS : ' + COM_ARGS);
}

// Functions who control .llogger file
// 1) UDS : user data save
function UDS (userID, userPW) {
	var data = '?NAME=' + userID + '\n'
			 + '?PASSWORD=' + userPW;
	fs.writeFileSync(save_path,data)
	console.log('The UD has been saved : ' + '\n' + data);
	return Map = { userID : userID, userPW : userPW};
}


// 2) UDL : user data load
// return 1. (if success) Maps of userID and userPW
// 유저 데이터 지우는 건 서버에서 정보 받은 다음에 지우자			
function UDL (save_path) {
	var data = "";
	if (!fs.existsSync(save_path)) {
		console.error(save_path + ' does not exist. (UDL)');
		return new Error("code 02 : File does not exist (UDL)");
	}
	data = fs.readFileSync(save_path, 'utf-8').split('\n');
	var userID = data[0].substring(6);
	var userPW = data[1].substring(10);
	return Map = { userID : userID, userPW : userPW};
}

////////////////////////////////////////////////////////////////////////////////////

module.exports.classify_Command = function classify_Command (hosturl ,COMMAND, COM_ARGS) {
	var cpath = "/"
	var userID = ""
	var userPW = ""
	var i;
	if (COMMAND == 'register') {
		cpath = cpath + 'register'
		console.log('cpath is' + cpath);
		var data = UDS(COM_ARGS[0],COM_ARGS[1])
		if (data instanceof Error) {
			console.log(data.message);
			return data //retunr Error
		} else {
			console.log('Command clasfify success.')
			userID = data.userID;
			userPW = data.userPW;
		}
	} else if (COMMAND == 'deregister') {
		cpath = cpath + 'deregister'
		console.log('cpath is' + cpath);
		var data = UDL(save_path);
		if (data instanceof Error) {
			console.log(data.message);
			return data //retunr Error
		} else {
			console.log('Command clasfify success.')
			userID = data.userID;
			userPW = data.userPW;
		}
	} else if (COMMAND == 'i' || COMMAND == 'I') {
		var data = UDL(save_path);
		if (data instanceof Error) {
			console.log(data.message);
			return data //retunr Error
		} else {
			console.log('Command clasfify success.')
			userID = data.userID;
			userPW = data.userPW;
		}
		var action = ""
		for( i = 3; i < COM_ARGS.length; i++) {
			action = action + COM_ARGS[i] + "#"
		}
		if (action == '') {
			var error = new Error("Code 3 : No action parameter.") 
			console.log(error.message)
			return error;
		}
		console.log(action);
		cpath = cpath + 'action' +
				  '/' + action;
		console.log('cpath is' + cpath);

	} else if (COMMAND == 'average') {
		var data = UDL(save_path);
		if (data instanceof Error) {
			console.log(data.message);
			return data //retunr Error
		} else {
			console.log('Command clasfify success.')
			userID = data.userID;
			userPW = data.userPW;
		}
		var action = ""
		for( i=3; i < COM_ARGS.length; i++) {
			action = action + COM_ARGS[i] + "#"
		}
		if (action == '') {
			var error = new Error("Code 3 : No action parameter.") 
			console.log(error.message)
			return error;
		}
		console.log(action);
		cpath = cpath + 'average' +
				  '/' + action;
		console.log('cpath is' + cpath);

	} else if (COMMAND == 'aggregate') {
		var data = UDL(save_path);
		if (data instanceof Error) {
			console.log(data.message);
			return data //retunr Error
		} else {
			console.log('Command clasfify success.')
			userID = data.userID;
			userPW = data.userPW;
		}
		var action = ""
		for( i=3; i < COM_ARGS.length; i++) {
			action = action + COM_ARGS[i] + "#"
		}
		if (action == '') {
			var error = new Error("Code 3 : No action parameter.") 
			console.log(error.message)
			return error;
		}
		console.log(action);
		cpath = cpath + 'aggregate' +
				  '/' + action;
		console.log('cpath is' + cpath);
	}

	const options = {
		hostname: hosturl.hostname,
		port: hosturl.port,
		path: cpath,
		method: 'POST',
		auth: "Basic" + new Buffer(userID + ":" + userPW, "utf-8").toString("base64")
	}
	return options;	
}