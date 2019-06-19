import { EventLoggingTracker } from './EventLoggingTracker';

export class CommunityBanner {

	constructor( bannerName, bannerTemplate ) {
		this.bannerCloseTrackRatio = 0.01;
		this.trackingEvents = new EventLoggingTracker( bannerName );
		this.bannerTemplate = bannerTemplate;
	}

	init() {
		const pageName = mw.config.get( 'wgPageName' );
		if ( pageName !== 'Wikipedia:Umfragen/Technische_Wünsche_2019_Themenschwerpunkte' ) {
			this.createBanner();
			this.registerClickEvents();
		} else {
			mw.centralNotice.setBannerLoadedButHidden();
		}
	}

	createBanner() {
		const $bannerContainer = $( '#WMDE-Banner-Container' );
		$bannerContainer.html( this.bannerTemplate( {} ) );
		$( '#banner-container' ).show();

	}

	removeBanner() {
		$( '#banner-container' ).hide();
	}

	registerClickEvents() {
		let bannerInstance = this;
		this.trackingEvents.trackClickEvent( $( '#banner-close-button' ), 'banner-closed', this.bannerCloseTrackRatio );

		$( '.banner-close' ).click( function () {
			bannerInstance.removeBanner();
			mw.centralNotice.hideBanner();
		} );

		$( '#ca-ve-edit, .mw-editsection-visualeditor' ).click( function () {
			$( '#banner-container' ).hide();
			bannerInstance.removeBanner();
		} );
	}

}
