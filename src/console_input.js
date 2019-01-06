const readline = require("readline");
function ConsoleInput(){
	
}

function start(){
	process.stdin.resume();		//启动控制台输入
	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	rl.on('line', (input) => {
		readline.cursorTo(process.stdout,0,-1);
		readline.clearLine(process.stdout,0);
		process.send({type:"sys",cmd:"text_command",params:{text:input}});
	});
}
function recv_cmd(msg){
	//console.log(msg);
	//process.send({type:"app",cmd:"say_hello",params:["hello friend,this message is from " + process.pid]});
}
ConsoleInput.prototype.start = start;
ConsoleInput.prototype.recv_cmd = recv_cmd;
//导出实例
var console_input = new ConsoleInput();
global.console_input = console_input;
module.exports = console_input;