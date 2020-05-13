require( './css/styles.pcss' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { TestFlag } from './TestFlag';
import { getGroupType, getGroupTypeSuffix, getGroupBannerText, GROUP_TYPE_NONE } from './getGroupOptions';
import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, TEST_FLAG_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

const BANNER_CLASS_PREFIX = 'occasional-banner-';

$( document ).ready( () => {
	const testFlag = new TestFlag( BANNER_CONTAINER_ID, TEST_FLAG_ATTRIBUTE );

	const registrationDate = mw.config.get( 'wgUserRegistration' );

	if ( !registrationDate && !testFlag.allow( 'logged_in' ) ) {
		return;
	}

	let groupType = getGroupType(
		testFlag.allow( 'group_a' ),
		testFlag.allow( 'group_b' )
	);

	if ( groupType === GROUP_TYPE_NONE ) {
		return;
	}

	let groupSuffix = getGroupTypeSuffix( groupType );

	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.addSuffix( groupSuffix )
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		campaign: bannerName,
		banner: BANNER_CLASS_PREFIX + groupSuffix,
		banner_text: getGroupBannerText( groupType )
	};

	new Banner(
		bannerName,
		bannerTemplate,
		BANNER_ID,
		CLOSE_BUTTON_ID,
		LINK_BUTTON_ID,
		templateVars
	).initialise();
} );
