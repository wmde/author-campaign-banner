require( './css/styles.pcss' );

import { CommunityBanner } from './CommunityBanner';

$( document ).ready( function () {
	const bannerName = 'WMDE_techwish_voting_2019_main';
	const bannerTemplate = require( './templates/banner01.hbs' );

	const communityBanner = new CommunityBanner( bannerName, bannerTemplate );
	communityBanner.init();
} );
