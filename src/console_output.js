const Info = require("./console_output/info.js");
function ConsoleOutput() {
	this.curr = null;
}
var STYLES = ConsoleOutput.STYLES = {
    'bold'          : ['\x1B[1m',  '\x1B[22m'],
    'italic'        : ['\x1B[3m',  '\x1B[23m'],
    'underline'     : ['\x1B[4m',  '\x1B[24m'],
    'inverse'       : ['\x1B[7m',  '\x1B[27m'],
    'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
    'white'         : ['\x1B[37m', '\x1B[39m'],
    'grey'          : ['\x1B[90m', '\x1B[39m'],
    'black'         : ['\x1B[30m', '\x1B[39m'],
    'blue'          : ['\x1B[34m', '\x1B[39m'],
    'cyan'          : ['\x1B[36m', '\x1B[39m'],
    'green'         : ['\x1B[32m', '\x1B[39m'],
    'magenta'       : ['\x1B[35m', '\x1B[39m'],
    'red'           : ['\x1B[31m', '\x1B[39m'],
    'yellow'        : ['\x1B[33m', '\x1B[39m'],
    'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
    'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG'       : ['\x1B[40m', '\x1B[49m'],
    'blueBG'        : ['\x1B[44m', '\x1B[49m'],
    'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
    'greenBG'       : ['\x1B[42m', '\x1B[49m'],
    'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
    'redBG'         : ['\x1B[41m', '\x1B[49m'],
    'yellowBG'      : ['\x1B[43m', '\x1B[49m'],
	'normal'		: ['','']
};
//清空屏幕
function clear(){
	console.clear();
}
//输出文字
function get_output(color,msg){
	if(arguments.length == 1){
		msg = color;
		color = "normal";
	}

	if(color.trim() == ""){
		color = "normal";
	}
	return STYLES[color][0] + msg + STYLES[color][1];
}

//初始化为信息输出
function init_info(master){
	clear();
	this.curr = new Info(this,master);
}
//更新输出
function update(source){
	//以下测试
	//要打印的数据
	this.curr.update(source);
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
ConsoleOutput.prototype.clear = clear;
ConsoleOutput.prototype.get_output = get_output;

ConsoleOutput.prototype.init_info = init_info;

ConsoleOutput.prototype.update = update;
ConsoleOutput.prototype.replace = replace;

module.exports = new ConsoleOutput();