import { EventLoggingTracker } from '../shared/EventLoggingTracker';
import { LocalImpressionCount } from '../shared/LocalImpressionCount';

const BANNER_CONTAINER_ID = 'WMDE-Banner-Container';
const EDIT_BUTTONS_CLASS = 'mw-editsection-visualeditor';
const EDIT_BUTTON_ID = 'ca-ve-edit';

const BANNER_CLOSE_TRACK_RATIO = 1;
const BANNER_SEEN_TRACK_RATIO = 1;

export class DiversityBanner {
	name;
	template;
	templateVars;
	bannerId;
	closeId;
	linkId;
	eventLoggingTracker;
	localImpressionCount;

	bannerContainer;
	banner;
	closeButton;
	linkButton;
	editButton;
	editButtons;

	constructor( name, template, bannerId, closeId, linkId, templateVars = {} ) {
		this.name = name;
		this.template = template;
		this.bannerId = bannerId;
		this.closeId = closeId;
		this.linkId = linkId;
		this.templateVars = templateVars;

		this.localImpressionCount = new LocalImpressionCount( this.name );
		this.eventLoggingTracker = new EventLoggingTracker( this.name, this.localImpressionCount );
	}

	initialise() {
		if ( this.shouldShowBanner() ) {
			this.createBanner();
			this.registerClickEvents();
			this.eventLoggingTracker.trackSeenEvent( BANNER_SEEN_TRACK_RATIO );
		} else {
			mw.centralNotice.setBannerLoadedButHidden();
		}
	}

	shouldShowBanner() {
		const pageName = mw.config.get( 'wgPageName' );

		if ( pageName.indexOf( 'Wikipedia:Wikipedia_vor_Ort' ) !== -1 ) {
			return false;
		}

		if ( pageName.indexOf( 'Aktionstag' ) !== -1 ) {
			return false;
		}

		if ( pageName === 'Wikipedia:Wikimedia_Deutschland/LerneWikipedia' ) {
			return false;
		}

		if ( pageName === 'Wikipedia:Spezial:Benutzerkonto_anlegen' ) {
			return false;
		}

		return true;
	}

	getHTMLElements() {
		this.banner = document.getElementById( this.bannerId );
		this.closeButton = document.getElementById( this.closeId );
		this.linkButton = document.getElementById( this.linkId );
		this.editButtons = document.getElementsByClassName( EDIT_BUTTONS_CLASS );
		this.editButton = document.getElementById( EDIT_BUTTON_ID );
	}

	createBanner() {
		this.bannerContainer = document.getElementById( BANNER_CONTAINER_ID );
		this.bannerContainer.innerHTML = this.template( this.templateVars );

		this.getHTMLElements();

		this.localImpressionCount.incrementImpressionCount();
	}

	registerClickEvents() {
		this.eventLoggingTracker.bindClickEvent( this.closeButton, 'banner-closed', BANNER_CLOSE_TRACK_RATIO );
		this.eventLoggingTracker.bindClickEvent( this.linkButton, 'banner-clicked', BANNER_CLOSE_TRACK_RATIO );

		this.closeButton.addEventListener( 'click', () => {
			this.removeBanner();
			mw.centralNotice.hideBanner();
		} );

		if ( this.editButton !== null ) {
			this.editButton.addEventListener( 'click', () => this.removeBanner() );
		}

		for ( let i = 0; i < this.editButtons.length; i++ ) {
			this.editButtons[ i ].addEventListener( 'click', () => this.removeBanner() );
		}
	}

	removeBanner() {
		this.banner.style.display = 'none';
	}
}
