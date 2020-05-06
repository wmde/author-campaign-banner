const WINDOW_WIDTHS = [
	{
		under: 320,
		device: 'mobile'
	},
	{
		under: 600,
		device: 'ipad'
	}
];

export class BannerNameBuilder {
	prefix;
	suffixes;

	constructor( selector, attribute ) {
		this.prefix = '';

		const bannerElement = document.getElementById( selector );
		if ( bannerElement !== null ) {
			const name = bannerElement.getAttribute( attribute );
			if ( name !== null ) {
				this.prefix = name;
			}
		}

		this.suffixes = [];
	}

	addDeviceSuffix() {
		let windowWidth = window.innerWidth;
		let width = WINDOW_WIDTHS.find( window => window.under < windowWidth );

		if ( width ) {
			this.suffixes.push( width.device );
		}

		return this;
	}

	build() {
		let bannerName = this.prefix;
		if ( this.suffixes.length > 0 ) {
			bannerName += '_' + this.suffixes.join( '_' );
		}
		return bannerName;
	}
}
