import { getGroupType, getGroupTypeSuffix, getGroupBannerHeadline, getGroupBannerText, GROUP_TYPE_NONE } from '../techwish/getGroupOptions';

require( './css/styles.pcss' );
require( './css/variables.pcss' );

import { CommunityBanner } from './CommunityBanner';

$( document ).ready( function () {
	const bannerTemplate = require( './templates/banner01.hbs' );

	const bannerElement = document.getElementById( 'WMDE-Banner-Container' );
	const bannerTrackingName = bannerElement.getAttribute( 'data-tracking' );

	let groupType = getGroupType();

	if ( groupType === GROUP_TYPE_NONE ) {
		return;
	}

	const bannerName = bannerTrackingName + '_' + getGroupTypeSuffix( groupType );

	const templateVars = {
		campaign: bannerName,
		banner_headline: getGroupBannerHeadline( groupType ),
		banner_text: getGroupBannerText( groupType )
	};

	const communityBanner = new CommunityBanner( bannerName, bannerTemplate, templateVars );
	communityBanner.init();
} );
