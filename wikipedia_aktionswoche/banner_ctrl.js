import shouldShowBanner from './shouldShowBanner';

require( './css/styles.pcss' );
require( '../shared/prepend-polyfill' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

const BANNER_CLASS_PREFIX = 'aktionswoche-banner-';
const BANNER_TITLE = '#WikipediaSchreibtGeschichte';
const BANNER_SUBTITLE = 'Jetzt! Große Aktionswoche zum <nobr>Wikipedia-Geburtstag</nobr>';
const BANNER_BUTTON_TEXT = '&nbsp;Schau&nbsp;vorbei&nbsp;';
const BANNER_ILLUSTRATION_URL = '//upload.wikimedia.org/wikipedia/commons/2/26/Cake-actionweek1.png';
const BANNER_TITLE_COLOR = '#ffffff'; // white for ctrl
const BANNER_BACKGROUND_COLOR = '#ee8019'; // orange

$( document ).ready( () => {
	if ( !shouldShowBanner() ) {
		return;
	}

	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		campaign: bannerName,
		banner: BANNER_CLASS_PREFIX,
		banner_title: BANNER_TITLE,
		banner_subtitle: BANNER_SUBTITLE,
		banner_button_text: BANNER_BUTTON_TEXT,
		banner_illustration_url: BANNER_ILLUSTRATION_URL,
		banner_title_color: BANNER_TITLE_COLOR,
		banner_background_color: BANNER_BACKGROUND_COLOR,
		wp_user: mw.config.get( 'wgUserName' ) === null ? 'anonymous' : 'logged_in'
	};

	new Banner(
		bannerName,
		bannerTemplate,
		BANNER_ID,
		CLOSE_BUTTON_ID,
		LINK_BUTTON_ID,
		templateVars
	).initialise();
} );
