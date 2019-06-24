require( './css/styles.pcss' );

import { AuthorsBanner } from './AuthorsBanner';

$( document ).ready( function () {
	const bannerName = 'WMDE_neweditors_autumn_2018_lp1m';
	const bannerTemplate = require( './templates/banner_mobile.hbs' );

	const authorsBanner = new AuthorsBanner( bannerName, bannerTemplate );
	authorsBanner.init();
} );
