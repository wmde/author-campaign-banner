require( './css/styles.pcss' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

$( document ).ready( () => {
	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner_var.hbs' );

	new Banner(
		bannerName,
		bannerTemplate,
		BANNER_ID,
		CLOSE_BUTTON_ID,
		LINK_BUTTON_ID
	).initialise();
} );
