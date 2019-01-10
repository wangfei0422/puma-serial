const readline = require("readline");
/*
任务列表【共4页，32项】
1 、童话					【共10页，打印1-9页】
2 、童话					【共10页，打印1-9页】
3 、童话					【共10页，打印1-9页】
4 、童话					【共10页，打印1-9页】
5 、童话					【共10页，打印1-9页】
6 、童话					【共10页，打印1-9页】
7 、童话					【共10页，打印1-9页】
8 、童话					【共10页，打印1-9页】
9 、童话					【共10页，打印1-9页】
10、童话					【共10页，打印1-9页】
下一项任务：【童话】
源 ：
url:

信息：当前正在打印【童话故事】【共10页，打印1-9页】【打印至4页，剩5页】
当前源：控制台	|	需要帮助，请按h

*/

/*
******************************************
***********datas数据格式********************
******************************************
数组和全局变量分开存放
global : {var_name:var_value,...}
arrays : {array_name : {items : [{var_name:var_value},...],},
						curr_item : 3}

全局变量名不可以包含'__',不可以'_'开头
数组 _a:
	数组总数 : _a_length
	当前项   : _a_index
	数组元素 : _a__*

	数组当前前选中项：curr_sel

*/
function Info(co,master){

	this.rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	this.rl.on('line', (input) => {
		//readline.cursorTo(process.stdout,0,10);
		//readline.clearLine(process.stdout,0);
		//console.log(input);
		this.master.dispatchCommand("console_input",{type:"sys",cmd:"text_command",params:{text:input}});
	});
	this.console_input_row = 21;
	this.console_input_prompt = "请输入命令：";
	this.co = co;																//ConsoleOutput
	this.master = master;
	this.templates = [{
						type   : "normal",										//非数组
						color  : "normal",
						styles : [
							{color :	"", text  : "任务列表[共", need_replace : false},
							{color :	"", text  : "{pages}", need_replace : true},
							{color :	"", text  : "页,", need_replace : false},
							{color :	"", text  : "{task_count}", need_replace : true},
							{color :	"", text  : "项]", need_replace : false},]
					  },
					  {
						type       : "array_items",									//array_index 数组项索引
						name       : "tasks",
						color	   : "normal",
						styles     : [
							{	color :	"", text  : "{_index}、\t{_task_index}{_task_name}					【共{book_pages}页，打印{start_page}-{end_page}页】",}],
						styles_sel : [{	color :	"", text  : "{_index}、\t{_task_index}{_task_name}					【共{book_pages}页，打印{start_page}-{end_page}页】",}],
					  },
					  {
						type   : "normal",
						styles : [{	color :	"", text  : "下一项任务:[{next_task}]",}]
					  },
					  {
						type   : "array_info",
						styles : [{	color :	"", text  : "源：{select_task_cmd_source}					\nurl:{select_task_url}",}]
					  },
					  {
						type   : "normal",
						styles : [{	color :	"", text  : "信息：当前正在打印{curr_task_name}【curr_task_pages_count】【打印至{curr_task_curr_page}页，剩{curr_task_left_page}页】",}]
					  },];
}


//更新输出	
//source :发出更新的源 init 、cmd_source 、 console_input
function update(source){
	if(this.master.dirty){
		var datas = {
			g:{
				task_pages:"52",
			},
			a:{
				tasks:{
					items:[{},{}],
					curr_item:-1,
				},
			}
		};
		
		var g = datas.g;				//全局变量
		var a = datas.a;				//数组变量
		var text = "";
		for(let i in this.templates){
			var temp = this.templates[i];
			
											//正则表达式为模板扩展空格
			/*
			var _text = replace(temp.text,g);
			if(temp.type == "normal"){
				text = _text;
			}else if(temp.type == "array"){
				for(let j in a[temp.name]){
					text = text + replace(_text,a[temp.name][j]);	
				}
			}*/
			
			//co.output(temp.color,text);

			//text += this.co.get_output("yellowBG","Hello World!");
		}

		
		process.stdin.pause();
		console.log(text);
		
		//重新定位输入
		//readline.cursorTo(process.stdout,0,this.console_input_row);
		//readline.clearLine(process.stdout,0);
		process.stdout.write(this.console_input_prompt);
		process.stdin.resume();
		this.master.dirty = false;

	}else if(source == "console_input"){
		//重新定位输入
		process.stdin.pause();
		//readline.cursorTo(process.stdout,0,this.console_input_row);
		//readline.clearLine(process.stdout,0);
		process.stdout.write(this.console_input_prompt);
		process.stdin.resume();
	}
}
Info.prototype.update = update;
module.exports = Info;