var net = require('net');
var sleep = require("sleep");
var PIPE_NAME = "mypipe";
var PIPE_PATH = "\\\\.\\pipe\\" + PIPE_NAME;

var L = console.log;

exports.test = function(){
	var server = net.createServer(function(stream) {
		L('Server: on connection')

		stream.on('data', function(c) {
			L('Server: on data:', c.toString());
		});

		stream.on('end', function() {
			L('Server: on end')
			server.close();
		});

		stream.write('Take it easy!');
	});

	server.on('close',function(){
		L('Server: on close');
	});

	server.listen(PIPE_PATH,function(){
		L('Server: on listening');
	});

	// == Client part == //
	var client = net.connect(PIPE_PATH, function() {
		L('Client: on connection');
	});

	client.on('data', function(data) {
		L('Client: on data:', data.toString());
		client.end('Thanks!');
	});

	client.on('end', function() {
		L('Client: on end');
	});
};

//server
exports.startNamedPipeServer = function(pipeName){
	var server = net.createServer(function(stream) {
		L('Server: on connection');

		stream.on('data', function(c) {
			L('Server: on data:', "BELOW");
			exports.printHex(c);
			var data = new Buffer([0x11,0x13]);
			stream.write(data, function() {
			  console.log("0x11,0x13=========\n===============\n==================");
			  console.log("0x11,0x13=========\n===============\n==================");
			});
		});

		stream.on('end', function() {
			L('Server: on end');
			server.close();
		});

		stream.write('Take it easy!');
	});

	server.on('close',function(){
		L('Server: on close');
	});
	
	server.listen("\\\\.\\pipe\\" + pipeName,function(){
		L('Server: on listening');
	});
};
exports.printHex = function(c){
	//c = [51,52,53,54,55,64,63,23,22,32,43,54,24,86,45,3,43,23,43,65,65];
	var data = "data is :\n";
	for(i = 0; i <= c.length/16; i++){
		temp = i.toString(16) + "0\t";
		for(k = temp.length; k<9; k++) temp = "0" + temp;
		temp = "0x" + temp;
		data += temp;
		temp = "";
		for(j = 0; j < 16 && i*16+j < c.length; j++){
			var temp_
			temp_ = c[i*16+j].toString(16);
			if(temp_.length < 2) temp_ = "0" + temp_;
			if(j == 7) temp_ += "-"
			temp = temp + " " + temp_ + " ";
		}
		data = data + temp + "\n";
	}
	console.log(data);
};