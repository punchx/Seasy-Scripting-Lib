var id = '^\s*#(\d+)',
	name = '^(\^|\*)?([^:#>,\+\{\}]+)',
	type = ':\s*(\^)?\s*([a-zA-Z]+)',
	attr = '(?:\{\s*(\^)?\s*([\w]+)\s*(?:=\s*(\w+))?\s*\})';

var qRExpr =/^(?:\+([a-zA-Z]+)|#(\d+)|(\^|\*)?([^:#>\+\{\}]*))$/;
var rTrim = /^\s+|\s+$/g;

var regExpr = {
	id: /\s*#(\d+)/,
	name: /^(\^|\*)?([^:#>\+\{\}]*)/,
	type: /:\s*(\^)?\s*([a-zA-Z]+)/,
	attr: /(?:\{\s*(\^)?\s*([\w]+)\s*(?:=\s*(\w+))?\s*\})/
};

var selArr = [], i = 0, selector = '#10{visible}';

if (  selector.indexOf('>') == -1 && selector.indexOf(',')  == -1  ) {

	
}
var key = 'layer';

for ( key in regExpr ) {

	selArr[i] = selector.match( regExpr[key] );
	i++;
}


console.log(selArr);