function Command(source,cmd){
	this.source = source;
	this.cmd = cmd;
}

function run(){
	//console.log("message from " + this.source + ":");
	//console.log(this.cmd);
	console.log("wrong command:%s",this.cmd.params.params.text);
}
Command.prototype.run = run;

//导出实例
module.exports = Command;