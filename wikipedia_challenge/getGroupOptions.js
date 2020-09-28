export const GROUP_TYPE_A = 0;
export const GROUP_TYPE_B = 1;
export const GROUP_TYPE_NONE = 2;

const GROUP_TYPE_SUFFIX_A = 'cs';
const GROUP_TYPE_SUFFIX_B = 'nt';

const GROUP_TYPE_BANNER_TEXT_A = 'Du bist nicht alleine: <b>Förderangebote</b> für Autorinnen und Autoren wie dich.';
const GROUP_TYPE_BANNER_TEXT_B = 'Du willst mehr? Spannende <b>Aufgaben</b> & persönliche <b>Unterstützung</b> genau für dich.';

export function getGroupType( allowGroupA, allowGroupB ) {
	const editCount = mw.config.get( 'wgUserEditCount' );
	const daysRegistered = Math.floor( ( Date.now() - mw.config.get( 'wgUserRegistration' ) ) / ( 1000 * 3600 * 24 ) );

	if ( ( editCount > 200 && editCount < 1000 && daysRegistered > 60 ) || allowGroupA ) {
		return GROUP_TYPE_A;
	} else if ( ( editCount >= 20 && editCount < 200 ) || allowGroupB ) {
		return GROUP_TYPE_B;
	}

	return GROUP_TYPE_NONE;
}

export function getGroupTypeSuffix( groupType ) {
	if ( groupType === GROUP_TYPE_A ) {
		return GROUP_TYPE_SUFFIX_A;
	}

	if ( groupType === GROUP_TYPE_B ) {
		return GROUP_TYPE_SUFFIX_B;
	}

	return '';
}

export function getGroupBannerText( groupType ) {
	if ( groupType === GROUP_TYPE_A ) {
		return GROUP_TYPE_BANNER_TEXT_A;
	}

	if ( groupType === GROUP_TYPE_B ) {
		return GROUP_TYPE_BANNER_TEXT_B;
	}

	return '';
}
