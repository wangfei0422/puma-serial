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
function Info(){
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
function set_datas(datas){
	this.datas = datas;	
}

//替换模板变量
function replace(temp,vars){
	var text = "";
	//console.log(vars);
	//console.log(Object.keys(vars).length);
	if(Object.keys(vars).length == 0) return temp;
	for(let n in vars){
		var reg = new RegExp("{" + n + "}","g");
		text = temp.replace(reg, vars[n]);
	}
	return text;
}
//co : console_output Object
function print(co){
	var g = this.datas.g;				//全局变量
	var a = this.datas.a;				//数组变量
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
		co.output("greenBG","Hello World!");
	}
}
Info.prototype.set_datas = set_datas;
Info.prototype.print = print;
module.exports = new Info();