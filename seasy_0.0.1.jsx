( function( global ) {
	var Seasy = function( selector, context ) {
		return new Seasy.prototype.sInit( selector );
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
		var elem, index;
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
		// Handle case when selector is a number
		// Simple return an item or a layer with index = selector		
		if ( typeof selector === 'number' ) {
			index = selector;
			if ( index == 0 ) {
				if ( !context || context == pRoot ) {
					elem = pRoot.activeItem;
					if ( elem && isElem( elem ) ) {
						this.length = 1;
						this[0] = elem;
						this.selector = selector;
						this.context = pRoot;
					}
					return this;
				}
				if ( context && isComp( context ) ) {
					Seasy.merge( this, context.slectedLayers );
					this.selector = selector;
					this.context = context;
				}
			}
			//Case when we don't have a context or context is an app.project, return an item
			//First case when number is an integer number 
			if ( isInt( index ) ) {
				if ( !context || context === pRoot ) {
					elem = index > 0 ? pRoot.item( index ) : pRoot.item( pRoot.numItems + index + 1 );
					if ( elem && isElem( elem ) ) {
						this.length = 1;
						this[0] = elem;
						this.selector = selector;
						this.context = pRoot;
					}
					return this;
				}
				//Case when context is a composition item return a layer
				if ( context && isComp( context ) ) {
					elem = index > 0 ? context.layer( index ) : context.layer( context.numLayers + index + 1 );
					if ( elem && isElem( elem ) ) {
						this.length = 1;
						this[0] = elem;
						this.selector = selector;
						this.context = context;
					} 
					return this;
				}
				// Handle case when context is RQ Object
				if ( context && ( isRQ( context ) || context == 'RQ' ) ) {
					elem = index > 0 ? context.item( index ) : context.item( context.numItems + index + 1 );
					if ( elem && isElem( elem ) ) {
						this.length = 1;
						this[0] = elem;
						this.selector = selector;
						this.context = context;
					}
					return this;
				}
				if ( context && isRQItem( context ) ) {
					elem = index > 0 ? context.outputModule( index ) : context.outputModule( context.numItems + index + 1 );
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
				var indexArr = index.toString().split('.'),
				    indexItem = parseFloat( indexArr[0] ),
				    indexChild = parseFloat( indexArr[1] ); 
				if ( !context || context == pRoot ) {
					Seasy.merge( this, Seasy( indexChild, Seasy( indexItem )[0] ) );
					this.selector = selector;
					this.context = pRoot;
					return this;
				}
				// Handle case when context is a RQ Object
				if ( context && ( isRQ( context ) || context == 'RQ' ) && indexItem !== 0 ) {
					Seasy.merge( this, Seasy( indexChild, Seasy( indexItem, 'RQ' )[0] ) );
					this.selector = selector;
					this.context = context;
					return this;
				}
			}			
		}
		// Handle case when selector is array
		if ( isArray( selector ) ) {
			for ( var i = 0; i < selector.length; i++ ) {
				Seasy.merge( this, Seasy( selector[i], context ) );
				this.selector = selector;
				this.context = context || pRoot;
			}
			return this;
		}
		// Handle case when selector is an Object with elements: Seasy Object or AE Collection Object
		if ( isLikeArr( selector ) ) {
			Seasy.merge( this, selector );
			this.selector = selector;
			this.context = context || pRoot;
		}		
		// Handle case when selector is a string
		if ( typeof selector === 'string' ) {
			var selectorsArr,
				regExp = /[a,]/;
		}
		return this;
	}
	sInit.prototype = Seasy.prototype;
	if ( global.Seasy ) {}
	global.Seasy = global.S = Seasy;
} )( this );

alert( typeof S() );







