function Command(source,cmd){
	this.source = source;
	this.cmd = cmd;
}

function run(){

}
Command.prototype.run = run;

//导出实例
module.exports = Command;