require( './css/styles.pcss' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { TestFlag } from './TestFlag';
import { getGroupType, getGroupTypeSuffix, GROUP_TYPE_NONE } from './getGroupType';
import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, TEST_FLAG_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

const BANNER_CLASS = 'occasional-banner-all';

$( document ).ready( () => {
	const testFlag = new TestFlag( BANNER_CONTAINER_ID, TEST_FLAG_ATTRIBUTE );

	if ( !mw.config.get( 'wgUserRegistration' ) && !testFlag.allow( 'logged_in' ) ) {
		return;
	}

	let groupType = getGroupType(
		testFlag.allow( 'group_a' ),
		testFlag.allow( 'group_b' )
	);

	if ( groupType === GROUP_TYPE_NONE ) {
		return;
	}

	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.addSuffix( getGroupTypeSuffix( groupType ) )
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		campaign: bannerName,
		banner: BANNER_CLASS
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
