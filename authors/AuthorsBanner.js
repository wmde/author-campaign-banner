import { EventLoggingTracker } from './EventLoggingTracker';

export class AuthorsBanner {

	constructor( bannerName, bannerTemplate ) {
		this.bannerCloseTrackRatio = 0.01;
		this.trackingEvents = new EventLoggingTracker( bannerName );
		this.bannerTemplate = bannerTemplate;
	}

	init() {
		const pageName = mw.config.get( 'wgPageName' );
		if ( pageName !== 'Wikipedia:Wikimedia_Deutschland/Neue_Ehrenamtliche/FAQ' &&
			pageName !== 'Wikipedia:Wikimedia_Deutschland/LerneWikipedia' ) {
			this.createBanner();
			this.registerClickEvents();
		} else {
			mw.centralNotice.setBannerLoadedButHidden();
		}
	}

	createBanner() {
		const $bannerContainer = $( '#WMDE-Banner-Container' );
		$bannerContainer.html( this.bannerTemplate( {} ) );
		this.addBannerSpace();
		$( 'body' ).prepend( $( '#centralNotice' ) );
		$( '#author-banner-container' ).show();
	}

	removeBanner() {
		$( '#WMDE-Banner-Container' ).hide();
		this.removeBannerSpace();
	}

	registerClickEvents() {
		let bannerInstance = this;
		this.trackingEvents.trackClickEvent( $( '#author-banner-close-button' ), 'banner-closed', this.bannerCloseTrackRatio );

		$( '.author-banner-close' ).click( function () {
			bannerInstance.removeBanner();
			mw.centralNotice.hideBanner();
		} );

		$( '#ca-ve-edit, .mw-editsection-visualeditor' ).click( function () {
			$( '#author-banner-container' ).hide();
			bannerInstance.removeBanner();
		} );
	}

	addBannerSpace() {
		const bannerHeight = $( '#author-banner-container' ).height() + 20;
		switch ( mw.config.get( 'skin' ) ) {
			case 'vector': {
				$( '#mw-panel' ).css( 'top', bannerHeight );
				$( '#mw-head' ).css( 'top', bannerHeight );
				break;
			}
			case 'monobook': {
				const wrapper = $( '#globalWrapper' );
				const banner = $( '#author-banner' );
				wrapper.css( 'position', 'relative' );
				wrapper.css( 'top', bannerHeight );
				banner.css( 'top', '-20px' );
				banner.css( 'background', 'none' );
				break;
			}
		}
	}

	removeBannerSpace() {
		switch ( mw.config.get( 'skin' ) ) {
			case 'vector': {
				$( '#mw-panel' ).css( 'top', 0 );
				$( '#mw-head' ).css( 'top', 0 );
				$( '#mw-page-base' ).css( 'padding-top', 0 );
				break;
			}
			case 'monobook': {
				const wrapper = $( '#globalWrapper' );
				wrapper.css( 'position', 'relative' );
				wrapper.css( 'top', 0 );
				break;
			}
		}
	}
}
