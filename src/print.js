function Print(){
}

function start(){
	
}
function recv_cmd(){
	
}

Print.prototype.start = start;
Print.prototype.recv_cmd = recv_cmd;

//导出实例
var print = new Print();
global.print = print;
module.exports = print;