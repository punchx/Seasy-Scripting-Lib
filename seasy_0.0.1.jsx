( function( global ) {
	var Seasy = function( selector, context ) {
		return new Seasy.prototype.sInit( selector, context );
	};
	Seasy.prototype = {
		seasy: '0.01',
		constructor: Seasy,
		length: 0,
		selector: ''
	};
	var pRoot = app.project,
	//Initialize Seasy object
 
	sInit = Seasy.prototype.sInit = function( selector, context ) {
		var i,
			elem,
			index,
			key,
			indexArr,
			indexItem,
			indexChild, 
			match,
			selArr,
			expr,
			qRExpr = /^(?:\+([a-zA-Z]+)|#(\d+)|(\^|\*)?([^:#>\+\{\}]*))$/,
			regExpr = {
				id: /\s*#\d+/,
				name: /^(\^|\*)?([^:#>\+\{\}]+)/,
				type: /(:)\s*([a-zA-Z]+)/,
				attr: /(?:\{\s*(\^)?\s*([\w]+\s*(?:=\s*\w+))?\s*\})/
			};
		// Handle Cases for (""), (null), (undefined), (false)
		// return non elements object
		if ( !selector ) {
			return this;
		}
		// Handle case when selector is an after effects node
		// Return one element object[0] = AE node;			
		if ( isElem( selector ) ) {
			this.length = 1;
			this[0] = this.selector = selector;
			this.context = global; 
			return this;
		}

		//Handle case when context is a layer
		if ( isLayer( context ) && isComp( context.source ) ) {
			context = context.source;
		}
		// Make select key for diffrent contexts
		if ( !context || context === pRoot || isFolder( context ) ||
		( isRQ( context ) || ( context == 'RQ' && context = pRoot.renderQueue ) ) ) {
			context = context || pRoot;
			key = 'item';
		} else if ( isComp( context ) ) {
			key = 'leyer';
		} else if ( isRQItem( context ) ) {
			key = 'outputModule';
		}
		// Handle case when selector is a number
		// Simple return an item or a layer with index = selector		
		if ( typeof selector === 'number' ) {
			index = selector;
			if ( index == 0 ) {
				if ( key == 'item' ) {
					elem = context.activeItem;
					if ( elem && isElem( elem ) ) {
						this.length = 1;
						this[0] = elem;
						this.selector = selector;
						this.context = context;
					}
					return this;
				}
				if ( key = 'layer' ) {
					Seasy.merge( this, context.selectedLayers );
					this.selector = selector;
					this.context = context;
				}
			}
			//First case when number is an integer number 
			if ( isInt( index ) ) {				
				if ( key ) {
					//???????????????????????????
					elem = index > 0 ? context[key]( index ) :
					context[key]( context['num' + key[0].toUpperCase() + key.slice(1) + 's'] + index + 1 );
					if ( elem && isElem( elem ) ) {
						this.length = 1;
						this[0] = elem;
						this.selector = selector;
						this.context = context;
					}
					return this;
				}				
			} else if ( isFloat( index ) ) {
				//Second case when selector is a float number
				indexArr = index.toString().split('.'),
				indexItem = parseFloat( indexArr[0] ),
				indexChild = parseFloat( indexArr[1] );

				Seasy.merge( this, Seasy( indexItem, context ).find( indexChild ) );
				this.selector = selector;
				this.context = context;
				return this;				
			}			
		}
		// Handle case when selector is an array
		if ( isArr( selector ) ) {
			for ( i = 0; i < selector.length; i++ ) {
				Seasy.merge( this, Seasy( selector[i], context ) );
				this.selector = selector;
				this.context = context;
			}
			return this;
		}
		// Handle case when selector is an Object with elements: Seasy Object or AE Collection Object
		if ( isLikeArr( selector ) ) {
			Seasy.merge( this, selector );
			this.selector = selector;
			this.context = context;
			return this;
		}
		// Handle case when contest is an Seasy object
		if ( isSeasy( context ) ) {
			return context.find( selector );
		}	
		// Handle case when selector is a string
		if ( typeof selector === 'string' ) {
			// Handle cases when selector is '*'- all elements, '@'- active elements, '$' - selected elements 
			if ( selector == '*' ) {
				if ( key ) {
					Seasy.merge( this, context[key + 's'] );
					this.selector = selector;
					this.context = context;
					return this;
				}
			}

			if ( selector == '@' ) {
				if ( key =='item' ) {
					Seasy.merge( this, Seasy( 0, context ) );
					this.selector = selector;
					this.context = context;
				} else if ( key == 'layer') {
					Seasy.merge( this, Seasy( '*', context ).filter( 'active' ) );
					this.selector = selector;
					this.context = context;
				}
				return this;
			}

			if ( selector == '$' ) {
				if ( key =='layer' ) {
					Seasy.merge( this, Seasy( 0, context ) );
					this.selector = selector;
					this.context = context;
				} else if ( key == 'item') {
					Seasy.merge( this, Seasy( '*', context ).filter( 'selected' ) );
					this.selector = selector;
					this.context = context;
				}
				return this;
			}


			// Match selector by +element(create new text, camera, light... ) or #id or name
			if ( match = selector.match( qRExpr ) ) {
				if ( match[1] && isObj( context ) ) {
					Seasy.merge( this, Seasy( pRoot ).new( match[1], context ) );
					this.selector = selector;
					this.context = context || pRoot;
					return this;
				} else if ( match[2] ) {
					return Seasy( parseFloat( match[2] ), context );
				} else ( match[4] ) {
					Seasy.merge( this, Seasy( context ).filter( match[4], match[3] ) );								
					this.selector = selector;
					this.context = context || pRoot;
					return this;
				}
			}
			//Match selector by type (:text, :light, :camera...)

			if ( match = selector.match( regExpr[type] ) ) {
				Seasy.merge( this, context.filter( match[1], match[2] ) );
				this.selector = selector;
				this.context = context || pRoot;
				return this;
			}
			//Match selector by attribute {attr = value}
			if ( match = selector.match( regExpr[attr] ) ) {
				Seasy.merge( this, context.filter( match[1] ) );
				this.selector = selector;
				this.context = context || pRoot;
				return this;
			}
		}
		return this;
	}
	Seasy.fn.extend( {

		find: function( selector, inf ) { 
				var i,
					len = this.length,
					myArr = [];
				
				for ( i = 0; i < len; i++ ) {
					myArr[i] = Seasy( selector, this[i] );
				}
				Seasy.pushStack( myArr[i] );
				this.selector = selector;
				this.context = this;
				return this;
			} 

	 } )

	}
	sInit.prototype = Seasy.prototype;
	global.Seasy = global.S = Seasy;
} )( this );








