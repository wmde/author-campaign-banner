import { getGroupType, getGroupBannerHeadline, getGroupBannerText, GROUP_TYPE_NONE } from '../techwish/getGroupOptions';

require( './css/styles.pcss' );
require( './css/variables.pcss' );

import { CommunityBanner } from './CommunityBanner';

$( document ).ready( function () {
	const bannerName = 'WMDE_techwish_voting_2020_main';
	const bannerTemplate = require( './templates/banner01.hbs' );

	let groupType = getGroupType(
		true,
		true
	);

	if ( groupType === GROUP_TYPE_NONE ) {
		return;
	}

	const templateVars = {
		campaign: bannerName,
		banner_headline: getGroupBannerHeadline( groupType ),
		banner_text: getGroupBannerText( groupType )
	};

	const communityBanner = new CommunityBanner( bannerName, bannerTemplate, templateVars );
	communityBanner.init();
} );
