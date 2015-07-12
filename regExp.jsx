var id = '^\s*#(\d+)',
	name = '^\s*(\^|\*)?([^:#>\+\{\}]+)',
	type = ':\s*(\^)?\s*([a-zA-Z]+)',
	attr = '(?:\{\s*(\^)?\s*([\w]+)\s*(?:=\s*(\w+))?\s*\})';

var qRExpr =/^\s*(?:\+([a-zA-Z]+)|#(\d+)|(\^|\*)?([^:#>\+\{\}]*))\s*$/;

var regObj = {
	'id': /\s*#(\d+)/,
	name: /^\s*(\^|\*)?([^:#>\+\{\}]*)/
};


var reg = new RegExp(id);
var parse = '*'.match(/^\s*(?:\+([a-zA-Z]+)|#(\d+)|(\^|\*)?([^:#>\+\{\}]+))\s*$/);

console.log(reg);
console.log(parse);