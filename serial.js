var SerialPort = require('serialport');
var Sleep = require('sleep');
var myPort;

function printHex(c){
	//c = [51,52,53,54,55,64,63,23,22,32,43,54,24,86,45,3,43,23,43,65,65];
	var data = "data is :\n";
	//var data = "";
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
}

function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.baudRate);
}
 
function readSerialData(data) {
   printHex(data);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}


var myParser = function(emitter, buffer) {
	printHex(buffer);
};

exports.sendPage = function(page){
	SerialPort.list(function (err, ports) {
		ports.forEach(function(port) {
			console.log(port.comName);
		});});
	//myPort = new SerialPort('COM1',9600);
	
	myPort = new SerialPort("COM5", { parser: myParser, baudRate: 9600 ,dataBits:8,stopBits:1});
	myPort.on('open', showPortOpen);
	myPort.on('close', showPortClose);
	myPort.on('error', showError);
	console.log("com1 baudRate:" + myPort.baudRate);
	console.log("com1 parity:" + myPort.parity);
	console.log("com1 dataBits:" + myPort.dataBits);
	console.log("com1 stopBits:" + myPort.stopBits);
	/*for(i = 0; i < 10; i++){
		myPort.write(page);
	}*/
	c = [1,3,9,19,91,0x0b,0x1b,0x93,0x0a,0x1a,0x05,7,0x0d,0x1d,0x15,0x0f,
		0x1f,0x17,0x0e,0x1e,0x25,0x27,0x3a,0x2d,0x3d,0x35,0x81,0x34,0x02,0x06,0x12,0x32,
		0x22,0x16,0x36,0x26,0x14,0x81,0x83];
	for (i = 0; i < c.length; i++){
		myPort.write(c,i,i);
		//Sleep.sleep(1);
	}
};
