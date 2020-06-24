import { EventLoggingTracker } from '../shared/EventLoggingTracker';
import { LocalImpressionCount } from '../shared/LocalImpressionCount';

const BANNER_SEEN_TRACK_RATIO = 1;
const BANNER_CLOSE_TRACK_RATIO = 1;

export class CommunityBanner {

	constructor( bannerName, bannerTemplate, templateVars ) {
		this.localImpressionCount = new LocalImpressionCount( bannerName );
		this.eventLoggingTracker = new EventLoggingTracker( bannerName, this.localImpressionCount );
		this.bannerTemplate = bannerTemplate;
		this.templateVars = templateVars;
	}

	init() {
		const pageName = mw.config.get( 'wgPageName' );
		if ( pageName !== 'Wikipedia:Umfragen/Technische_Wünsche_2020_Themenschwerpunkte' ) {
			this.createBanner();
			this.registerClickEvents();
			this.eventLoggingTracker.trackSeenEvent( BANNER_SEEN_TRACK_RATIO );
		} else {
			mw.centralNotice.setBannerLoadedButHidden();
		}
	}

	createBanner() {
		const $bannerContainer = $( '#WMDE-Banner-Container' );
		$bannerContainer.html( this.bannerTemplate( this.templateVars ) );
		$( '#banner-container' ).show();
		this.localImpressionCount.incrementImpressionCount();

	}

	removeBanner() {
		$( '#banner-container' ).hide();
	}

	registerClickEvents() {
		let bannerInstance = this;

		this.eventLoggingTracker.bindClickEvent(
			document.getElementsByClassName( 'banner-wrapper' )[ 0 ],
			'banner-clicked',
			BANNER_SEEN_TRACK_RATIO
		);

		this.eventLoggingTracker.bindClickEvent(
			document.getElementById( 'banner-close-button' ),
			'banner-closed',
			BANNER_CLOSE_TRACK_RATIO
		);

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
