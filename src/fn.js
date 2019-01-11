fn = {};
fn.objToArr = function(obj){
	var a = [];
	for(var k in obj){
		a.push(obj[k]);
	}
	return a;
};
module.exports = fn;