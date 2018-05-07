const bannerName = 'WMDE_2018_sprbt1';

const bannerTemplate = require( './templates/banner_ctrl.hbs' );
require( './css/styles.pcss' );

import { AuthorsBanner } from './AuthorsBanner';

$( document ).ready( function () {
	const authorsBanner = new AuthorsBanner( bannerName, bannerTemplate );
	authorsBanner.init();
} );
