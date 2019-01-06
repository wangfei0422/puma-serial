function Command(source,cmd){
	this.source = source;
	this.cmd = cmd;
}

function run(){
	console.log(this.cmd);
	//global.master.console_output.output("blue",this.cmd.msg);
}
Command.prototype.run = run;

//µ¼³öÊµÀý
module.exports = Command;