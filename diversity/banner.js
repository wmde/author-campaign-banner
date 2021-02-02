require( './css/styles.pcss' );
require( '../shared/prepend-polyfill' );

import { DiversityBanner } from './DiversityBanner';

const BANNER_NAME = 'diversity-survey';
const BANNER_ID = 'diversity-banner-container';
const CLOSE_BUTTON_ID = 'diversity-banner-close-button';
const LINK_BUTTON_ID = 'diversity-banner-link';
const BANNER_TEMPLATE = require( './templates/banner.hbs' );

$( document ).ready( () => {
	new DiversityBanner(
		BANNER_NAME,
		BANNER_TEMPLATE,
		BANNER_ID,
		CLOSE_BUTTON_ID,
		LINK_BUTTON_ID
	).initialise();
} );
