export const GROUP_TYPE_A = 0;
export const GROUP_TYPE_B = 1;
export const GROUP_TYPE_NONE = 2;

const GROUP_TYPE_SUFFIX_A = 'cs';
const GROUP_TYPE_SUFFIX_B = 'nt';

const GROUP_TYPE_BANNER_HEADLINE_A = 'In welchem Bereich wünscht ihr euch technische Verbesserungen?';
const GROUP_TYPE_BANNER_TEXT_A = 'Das Projekt Technische Wünsche stellt 10 Themenfelder zur Wahl und ihr ' +
	'entscheidet. Die Abstimmung läuft bis zum 19. Juli. Technikkenntnisse sind nicht erforderlich.';

const GROUP_TYPE_BANNER_HEADLINE_B = 'Das Projekt Technische Wünsche fragt neue Aktive';
const GROUP_TYPE_BANNER_TEXT_B = 'In welchem Problemfeld wünscht ihr euch technische Verbesserungen? Stimmt ' +
	'bis zum 19. Juli ab. Technikkenntnisse sind nicht erforderlich.';

export function getGroupType( allowGroupA, allowGroupB ) {
	const editCount = mw.config.get( 'wgUserEditCount' );
	const daysRegistered = Math.floor( ( Date.now() - mw.config.get( 'wgUserRegistration' ) ) / ( 1000 * 3600 * 24 ) );

	if ( ( editCount > 200 && daysRegistered >= 60 ) || allowGroupA ) {
		return GROUP_TYPE_A;
	} else if ( ( editCount > 20 && editCount <= 200 && daysRegistered > 14 ) || allowGroupB ) {
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

export function getGroupBannerHeadline( groupType ) {
	if ( groupType === GROUP_TYPE_A ) {
		return GROUP_TYPE_BANNER_HEADLINE_A;
	}

	if ( groupType === GROUP_TYPE_B ) {
		return GROUP_TYPE_BANNER_HEADLINE_B;
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
