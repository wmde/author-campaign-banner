/* eslint wrap-iife: [2, "inside"] */
( function ( arr ) {
	arr.forEach( function ( item ) {
		if ( Object.prototype.hasOwnProperty.call( item, 'prepend' ) ) {
			return;
		}
		Object.defineProperty( item, 'prepend', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function prepend() {
				const argArr = Array.prototype.slice.call( arguments ),
					docFrag = document.createDocumentFragment();

				argArr.forEach( function ( argItem ) {
					const isNode = argItem instanceof Node;
					const node = isNode ? argItem : document.createTextNode( String( argItem ) );
					docFrag.appendChild( node );
				} );

				this.insertBefore( docFrag, this.firstChild );
			}
		} );
	} );
} )( [ Element.prototype, Document.prototype, DocumentFragment.prototype ] );
