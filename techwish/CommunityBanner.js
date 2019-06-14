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
		this.addBannerSpace();
		$( 'body' ).prepend( $( '#centralNotice' ) );
		$( '#banner-container' ).show();
		$( window ).resize( this.addBannerSpace );
	}

	removeBanner() {
		$( '#banner-container' ).hide();
		this.removeBannerSpace();
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

	addBannerSpace() {
		const bannerHeight = $( '#banner-container' ).height();
		switch ( mw.config.get( 'skin' ) ) {
			case 'vector': {
				$( '#mw-panel' ).css( 'top', bannerHeight );
				$( '#mw-head' ).css( 'top', bannerHeight );
				break;
			}
			case 'monobook': {
				const wrapper = $( '#globalWrapper' );
				const banner = $( '#banner-container' );
				wrapper.css( 'position', 'relative' );
				banner.css( 'background', 'none' );
				$( 'div#centralNotice > *' ).attr( 'style', 'margin-top: 0 !important' );
				break;
			}
			case 'timeless': {
				$( '#mw-header-container' ).css( {
					position: 'relative'
				} );
				$( '#mw-header-hack' ).css( {
					position: 'relative',
					top: 0
				} );
				$( '#mw-content-container' ).css( 'margin-top', '0' );
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
			case 'timeless': {
				$( '#mw-header-container' ).css( {
					position: 'fixed'
				} );
				$( '#mw-header-hack' ).css( {
					position: 'fixed',
					top: '3.125em'
				} );
				$( '#mw-content-container' ).css( 'margin-top', '3.125em' );
			}
		}
	}
}
