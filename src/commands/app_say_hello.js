function Command(source,cmd){
	this.source = source;
	this.cmd = cmd;
}

function run(){
	//global.master.console_output.output("blue",this.cmd.msg);
}
Command.prototype.run = run;

//����ʵ��
module.exports = Command;