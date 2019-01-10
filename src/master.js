Command = require("./command.js");
console_output = require("./console_output.js");
const path = require('path');
const fs = require('fs');
function Master() {
	//线程
	this.dirty = true;											//数据改变，需要更新输出
	this.cluster = null,
	this.console_output = null;
	this.curr_cmd_source = "console_input";						//默认命令源
	this.initOk = false;										//准备好
	this.appCmdOk = false;									//可以接收消息
	this.threads = {
		master 			:{fileName	:	"master.js",
						 },										//主线程
		console_input	:{fileName	:	"console_input.js",
						  worker	:	null,
						 },										//本地控制台输入线程
		cmd_source  	:{name		:	"",
						  files		:	{},
						  worker	:	null,
						 },										//命令源
		print	   		:{fileName	:	"print.js",
						  worker	:	null,
						 },										//打印
	};

}
Master.prototype.test = function() { console.log("test function"); };

//***********************************************************
//*********发送消息到子进程**********************************************
//***********************************************************
//发送消息到子线程
function send_to_thread(thread,msg){
	this.threads[thread].worker.send(msg);
}

Master.prototype.send_to_console_input = function(msg){
	send_to_thread.call(this,"console_input",msg);
}
Master.prototype.send_cmd_source = function(msg){
	send_to_thread.call(this,"cmd_source",msg);					//有可能不存在，可能会抛出异常**********
}
Master.prototype.send_to_print = function(msg){
	send_to_thread.call(this,"print",msg);
}

//***********************************************************
//*********数据结构**********************************************
//***********************************************************
//各子进程数据结构：一个成功命令数组sucess_cmds、一个失败命令数组fail_cmds、一个任务队例tasks
function initData(self){
	function getDatas(){
		return {
			sucess_cmds:[],
			fail_cmds:[],
			tasks:[],
		};
	}
	self.threads.console_input.datas = getDatas();
	self.threads.cmd_source.datas = getDatas();
	self.threads.print.datas = getDatas();
}


//***********************************************************
//*********命令系统**********************************************
//***********************************************************
//命令调用
function processCommand(file,worker,cmd){
	var CMDProc = require(file);
	var c = new CMDProc(worker,cmd);
	c.run();
	console_output.update(worker);		//命令源发出的更新
}
//命令分发
function dispatchCommand(worker,cmd){
	if(this.initOk){			//初始化成功
		if(!this.appCmdOk && msg.type == "app"){		
			return ;					//请首先启动命令处理
		}
		var pre = this.src_path + "\\commands";
		var mid = "_" + worker;
		//console.log(cmd);
		var tail = "\\" + cmd.type + "_" + cmd.cmd + ".js";
		fs.access(pre + mid +tail, fs.constants.F_OK, (err) => {
			if(!err){
				processCommand(pre + mid +tail,worker,cmd);
			}else{
				fs.access(pre + tail, fs.constants.F_OK, (err) => {
					if(!err){
						processCommand(pre + tail,worker,cmd);
					}else{
						//默认命令处理
						processCommand(pre + "\\default.js",worker,cmd);
					}
				});	
			}
		});		
		//console.log(cmd);		
	}else{
		//没准备好
	}
}
//初始化命令系统
function initCommand(self){
	//监听message
	self.cluster.on('message', (worker, message, handle) => {
		var cmd = new Command(message.type,message.cmd,message.params);
		if(["console_input","cmd_source","print"].indexOf(worker.var_name) > -1){
			this.dispatchCommand(worker.var_name,cmd);
		}else{
			self.error("未知线程，请联系作者......");	
		}
	});
}

//***********************************************************
//*********子线程**********************************************
//***********************************************************
function initWorkers(self){
	var cmd = null;
	//启动线程
	//打印线程、控制台输入线程
	self.threads.print.worker  = self.cluster.fork();									//打印线程
	self.threads.print.worker.var_name = "print";
	cmd = Command.sys_command("start_thread_print",[self.src_path + "\\" + self.threads.print.fileName]);
	self.send_to_print(cmd);	
	
	/*******************
	****不需要*************
	********************
	self.threads.console_input.worker  = self.cluster.fork();							//读线程
	self.threads.console_input.worker.var_name = "console_input";
	cmd = Command.sys_command("start_thread_console_input",[self.src_path + "\\" + self.threads.console_input.fileName]);
	self.send_to_console_input(cmd);
	*/
}

function init(cluster){
	this.cluster = cluster;
	this.src_path = path.dirname(module.id);
	
	console_output.init_info(this);									//初始化输出	
	this.console_output = console_output;

	initData(this);									//线程相关数据结构
	initCommand(this);								//命令系统
	initWorkers(this);								//工作线程
	this.initOk = true;
	
	//初期，默认启动命令处理
	this.appCmdOk = true;
	cmd = Command.app_command("say_hello",{});		//对子进程发送say_hello消息
	//this.send_to_console_input(cmd);
	this.send_to_print(cmd);

	//更新输出,同时定位输入
	console_output.update("init");					//初始化发出的更新
}
//初始化
Master.prototype.init = init;
Master.prototype.dispatchCommand = dispatchCommand;
//发生错误
Master.prototype.error = function(err){
	console.log(err);
}

//导出实例
var master = new Master();
global.master = master;
module.exports = master;