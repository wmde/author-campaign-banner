export class EventLoggingTracker {

	constructor( bannerName ) {
		this.bannerName = bannerName;
	}

	/**
	 * Track a click event on a given element
	 *
	 * @param {jQuery} $trackedElement The element to bind the click event to
	 * @param {string} actionName Name of the action to be tracked
	 * @param {number} trackRatio The probability of the event being tracked (between 0 and 1)
	 */
	trackClickEvent( $trackedElement, actionName, trackRatio ) {
		$trackedElement.click( this.createTrackHandler( actionName, trackRatio ) );
	}

	/**
	 * Generate a tracking function
	 *
	 * @param {string} actionName Name of the action to be tracked
	 * @param {number} trackingRatio The probability of the event being tracked (between 0 and 1)
	 * @return {function}
	 */
	createTrackHandler( actionName, trackingRatio ) {
		if ( typeof trackingRatio === 'undefined' ) {
			trackingRatio = 1;
		}

		return () => {
			if ( Math.random() < trackingRatio ) {
				mw.track( 'event.WMDEBannerEvents', {
					bannerName: this.bannerName,
					bannerAction: actionName,
					eventRate: trackingRatio
				} );
			}
		};
	}
}
