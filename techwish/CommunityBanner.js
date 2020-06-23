import { EventLoggingTracker } from './EventLoggingTracker';

export class CommunityBanner {

	constructor( bannerName, bannerTemplate, templateVars ) {
		this.bannerCloseTrackRatio = 0.01;
		this.trackingEvents = new EventLoggingTracker( bannerName );
		this.bannerTemplate = bannerTemplate;
		this.templateVars = templateVars;
	}

	init() {
		const pageName = mw.config.get( 'wgPageName' );
		if ( pageName !== 'Wikipedia:Umfragen/Technische_Wünsche_2020_Themenschwerpunkte' ) {
			this.createBanner();
			this.registerClickEvents();
		} else {
			mw.centralNotice.setBannerLoadedButHidden();
		}
	}

	createBanner() {
		const $bannerContainer = $( '#WMDE-Banner-Container' );
		$bannerContainer.html( this.bannerTemplate( this.templateVars ) );
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
