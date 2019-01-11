function Command(source,cmd){
	this.source = source;
	this.cmd = cmd;
}

function run(file,start_page,end_page){
	if(arguments.length == 1){
		start_page = 0;
		end_page = 0;
	}
	var id = master.threads[this.source].datas.next_task_id++;
	master.threads[this.source].datas.tasks.push([id,file,start_page,end_page]);
	//console.log(master.threads[this.source].datas.tasks);
	//console.log(master.threads[this.source].datas.next_task_id);
}
Command.prototype.run = run;

//导出实例
module.exports = Command;