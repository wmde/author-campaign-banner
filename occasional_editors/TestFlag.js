export class TestFlag {
	allowed;

	constructor( selector, attribute ) {
		this.allowed = '';

		const bannerElement = document.getElementById( selector );

		if ( bannerElement !== null ) {
			const name = bannerElement.getAttribute( attribute );
			if ( name !== null ) {
				this.allowed = name;
			}
		}
	}

	allow( name ) {
		return this.allowed.includes( name );
	}
}
