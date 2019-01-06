function Command(type, cmd, params) {
	this.type		=	type;		//命令类型
	this.cmd		=	cmd;		//命令
	this.params		=	params;		//参数
}
//系统命令
Command.sys_command = function(cmd, params){
	return new Command("sys",cmd,params);
}
//系统命令
Command.app_command = function(cmd, params){
	return new Command("app",cmd,params);
}
//状态命令（状态消息）
Command.status_command = function(s, params){
	return new Command("app","status",s,params);
}
//支持的命令
Command.CMDS		=	{sys	:[],
						 app	:[],
						};
module.exports = Command;