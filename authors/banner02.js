require( './css/styles.pcss' );

import { AuthorsBanner } from './AuthorsBanner';

$( document ).ready( function () {
	const bannerName = 'WMDE_neweditors_summer2018_2';
	const bannerTemplate = require( './templates/banner02.hbs' );

	const authorsBanner = new AuthorsBanner( bannerName, bannerTemplate );
	authorsBanner.init();
} );
