function Command(source,cmd){
	this.source = source;
	this.cmd = cmd;
	this.m = global.master;
}

function run(){
	//向所有线程发送退出消息，等待线程退出，然后本线程退出。
	
	//console.log("message from " + this.source + ":");
	//console.log("aaaaaaaaaaaaaaaaaa");
	//console.log(this.cmd);
}
Command.prototype.run = run;

//导出实例
module.exports = Command;