require( './css/styles.pcss' );

import { AuthorsBanner } from './AuthorsBanner';

$( document ).ready( function () {
	const bannerName = 'WMDE_neweditors_summer2018_3';
	const bannerTemplate = require( './templates/banner03.hbs' );

	const authorsBanner = new AuthorsBanner( bannerName, bannerTemplate );
	authorsBanner.init();
} );
