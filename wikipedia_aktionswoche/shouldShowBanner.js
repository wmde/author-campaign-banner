export default function shouldShowBanner() {
	if ( mw.config.get( 'wgUserName' ) === null ) {
		return true;
	}

	if ( mw.config.get( 'wgUserEditCount' ) < 1000 ) {
		return true;
	}

	return false;
}
