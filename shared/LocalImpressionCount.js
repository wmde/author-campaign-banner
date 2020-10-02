export class LocalImpressionCount {
	constructor( bannerName ) {
		this.bannerName = bannerName;
		this.itemName = 'authors_impressions-' + this.bannerName;
		this.overallCount = 0;
		if ( !window.localStorage ) {
			return;
		}
		const overallCount = window.localStorage.getItem( this.itemName ) || '0';
		this.overallCount = parseInt( overallCount, 10 );
	}

	incrementImpressionCount() {
		this.overallCount++;
		if ( !window.localStorage ) {
			return;
		}
		window.localStorage.setItem( this.itemName, this.overallCount.toFixed( 0 ) );
	}

	getImpressionCount() {
		if ( !window.localStorage ) {
			return 0;
		}
		let impressions = window.localStorage.getItem( this.itemName );
		if ( impressions === null ) {
			impressions = 0;
			window.localStorage.setItem( this.itemName, '0' );
		}
		return parseInt( impressions );
	}
}
