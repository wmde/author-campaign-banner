require( './css/styles.pcss' );

import { AuthorsBanner } from './AuthorsBanner';

$( document ).ready( function () {
	const bannerName = 'WMDE_neweditors_summer2018_1';
	const bannerTemplate = require( './templates/banner01.hbs' );

	const authorsBanner = new AuthorsBanner( bannerName, bannerTemplate );
	authorsBanner.init();
} );
