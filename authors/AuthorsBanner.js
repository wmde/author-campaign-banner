import { EventLoggingTracker } from '../shared/EventLoggingTracker';
import { LocalImpressionCount } from '../shared/LocalImpressionCount';

export class AuthorsBanner {

	constructor( bannerName, bannerTemplate ) {
		this.bannerCloseTrackRatio = 0.01;
		this.impCount = new LocalImpressionCount( bannerName );
		this.trackingEvents = new EventLoggingTracker( bannerName, this.impCount );
		this.bannerTemplate = bannerTemplate;
	}

	init() {
		const pageName = mw.config.get( 'wgPageName' );
		if ( pageName.indexOf( 'Wikipedia:Wikipedia_vor_Ort' ) === -1 &&
			pageName.indexOf( 'Aktionstag' ) === -1 &&
			pageName !== 'Wikipedia:Wikimedia_Deutschland/LerneWikipedia' &&
			pageName !== 'Wikipedia:Spezial:Benutzerkonto_anlegen' ) {
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
		this.impCount.incrementImpressionCount();
	}

	removeBanner() {
		$( '#WMDE-Banner-Container' ).hide();
		this.removeBannerSpace();
	}

	registerClickEvents() {
		let bannerInstance = this;
		let closeButton = $( '.author-banner-close' );
		this.trackingEvents.bindClickEvent( closeButton[ 0 ], 'banner-closed', this.bannerCloseTrackRatio );
		this.trackingEvents.bindClickEvent( $( '#author-banner-link' )[ 0 ], 'banner-clicked', this.bannerCloseTrackRatio );

		closeButton.click( function () {
			bannerInstance.removeBanner();
			mw.centralNotice.hideBanner();
		} );

		$( '#ca-ve-edit, .mw-editsection-visualeditor' ).click( function () {
			$( '#author-banner-container' ).hide();
			bannerInstance.removeBanner();
		} );
	}

	addBannerSpace() {
		const bannerHeight = $( '#author-banner-container' ).height();
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
