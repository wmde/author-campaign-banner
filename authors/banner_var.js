const bannerName = 'WMDE_2018_sprbt2';

const bannerTemplate = require( './templates/banner_var.hbs' );
require( './css/styles.pcss' );

import { AuthorsBanner } from './AuthorsBanner';

$( document ).ready( function () {
	const authorsBanner = new AuthorsBanner( bannerName, bannerTemplate );
	authorsBanner.init();
} );
