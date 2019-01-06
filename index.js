//多进程模拟线程 cluster
const cluster = require('cluster');


if (cluster.isMaster) {
	//调用Mster.js
	var master = require("./src/master.js");
	master.init(cluster);
} else {
	process.on('message', (msg) => {
		if(msg.type == "sys" && ["start_thread_console_input","start_thread_cmd_source","start_thread_print"].indexOf(msg.cmd) > -1){
			//启动控制台输入线程、命令源线程、打印线程
			//线程启动命令是进程接收到的第一个命令
			thread = require(msg.params[0]);
			global.thread = thread;
			thread.start();
		}else{
			//命令处理
			thread.recv_cmd(msg);
		}
	});
}