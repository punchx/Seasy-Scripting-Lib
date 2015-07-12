// Selector exemple 'compName1>layerName:text[visible = true]'

function find( selector, context ) {

	var regObj = {
		id: '#index'
		name: 'someName',
		type: ':someType',
		attr: '[attrName = value]'
		};

	if( selector === regObj[id] ) {
		merge( this, getElementsById( index, context ) );
		return this;
	}

	if( selector === regObj[name] ) {
		merge( this, getElementsByName( someName, context ) );
		return this;
	}

	if( selector === regObj[type] ) {
		merge( getElementsByType( someType, context ) );
		return this;
	}

	if( selector === regObj[attr] ) {
		merge( this, getElementsByAttr( attrName, value, context ) );
		return this;
	}

	

	// ?????? How to split layerName:text[visible = true] to have separately layerName, text, visible, true
	//Need to handle case when selector is something like 'layerName:text[visible = true]'
	//
	// Handle case when selector is something like 'compName1>layerName:text[visible = true]'
	// 

	var selectorArr = selector.split( '>' );
	
	var results = find( selectorArr[i] );

	for( var i = 0; i < selectorArr.length - 1; i++ ) {

		results =  find( selectorArr[i + 1], results ) );
	}




	merge( this, results );
	return this;
}