require( './css/styles.pcss' );

import { AuthorsBanner } from './AuthorsBanner';

$( document ).ready( function () {
	const bannerName = 'WMDE_neweditors_autumn_2019_lp1';
	const bannerTemplate = require( './templates/banner.hbs' );

	const authorsBanner = new AuthorsBanner( bannerName, bannerTemplate );
	authorsBanner.init();
} );
