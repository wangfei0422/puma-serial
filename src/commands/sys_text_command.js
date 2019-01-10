/***************************************
*text_command
*
*add a.txt   [1    2]   [* 20][1 *]| c:\a.txt
* 0	  字符串 
* 2	  字符串 数字 数字   *
*cancle id
* 1	  数字
*exit
* 0
*
******************************************/

function Command(source,cmd){
	this.source = source;
	this.type = cmd.type;
	this.cmd  = cmd.cmd;
	this.params = cmd.params;
	
	this.commands_params = {
		add : {	type:"app",
				0:true,
				2:[{name:"start_page",type:"int",literal:"*"},{name:"end_page",type:"int",literal:"*"}],
			},
		cancle: {type:"app",1:[{name:"id",type:"int"}]
			},
		exit  : {type:"sys",0:true},
	}
	this.commands = Object.keys(this.commands_params);
}

function createCommandFromText(text){
	var items = text.split(/\s+/);
	var params_length = items.length - 1;
	var cmd_name = items[0];
	var cmd_info;
	var cmd = {};
	if(items.length >0 && this.commands.indexOf(cmd_name) > -1){
		
		cmd_info = this.commands_params[cmd_name];
		cmd.type = cmd_info.type;
		cmd.cmd = cmd_name;
		cmd.params = {};
		if(typeof cmd_info[params_length] !== "undefined"){
			if(params_length == 0 && cmd_info[params_length] == true){
				cmd.params = {};
			}else{
				for(let i in cmd_info[params_length]){
					var p = cmd_info[params_length][i];
					var j = parseInt(i);
					if((typeof p["literal"] !== "undefined" && p["literal"] === items[j+1]) || (p["type"] === "string")){
						cmd.params[p["name"]] = items[j+1];
					}else if((p["type"] === "int") && !isNaN(items[j+1])){
						cmd.params[p["name"]] = parseInt(items[j+1]);
					}else{
						cmd = {type:"sys",cmd:"error",params:{source:this.source,type:this.type,cmd:this.cmd,params:this.params}};
						//console.log(cmd);
						return cmd;
					}
				}
			}
	
		}


	}else{
		//不存在此命令
		cmd = {type:"sys",cmd:"error",params:{source:this.source,type:this.type,cmd:this.cmd,params:this.params}};
	}
	//console.log(cmd);
	return cmd;
}

//{type:"sys",cmd:"sys_text_command,params:{text:"..."}"}
function run(){
	var m = global.master;
	cmd = createCommandFromText.call(this,this.params.text.trim());
	m.dispatchCommand(this.source,cmd);
	m.dirty = true;		//修改数据后需要更新输出
}
Command.prototype.run = run;

//导出实例
module.exports = Command;