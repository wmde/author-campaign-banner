require( './css/styles.pcss' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

const BANNER_CLASS_PREFIX = 'challenge-banner-';
const BANNER_TITLE = 'Im Kosmos von Wikipedia: <span style="white-space: nowrap;">Die 30-Tage-Challenge</span>';

$( document ).ready( () => {
	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		campaign: bannerName,
		banner: BANNER_CLASS_PREFIX,
		banner_title: BANNER_TITLE
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
