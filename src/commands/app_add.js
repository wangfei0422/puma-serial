function Command(source,cmd){
	this.source = source;
	this.cmd = cmd;
}

function run(){
	//console.log("message from " + this.source + ":");
	//console.log("aaaaaaaaaaaaaaaaaa");
	//console.log(this.cmd);
}
Command.prototype.run = run;

//导出实例
module.exports = Command;