export class EventLoggingTracker {

	constructor( bannerName, impressionCounter ) {
		this.bannerName = bannerName;
		this.impressionCounter = impressionCounter;
	}

	/**
	 * Track a click event on a given element
	 *
	 * @param {object} trackedElement The html element to bind the click event to
	 * @param {string} actionName Name of the action to be tracked
	 * @param {number} trackRatio The probability of the event being tracked (between 0 and 1)
	 */
	bindClickEvent( trackedElement, actionName, trackRatio ) {
		trackedElement.addEventListener(
			'click',
			this.createTrackHandler( actionName, trackRatio )
		);
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
				mw.track( 'event.WMDEBannerInteractions', {
					bannerName: this.bannerName,
					bannerAction: actionName,
					bannerImpressions: this.impressionCounter.getImpressionCount(),
					userID: mw.user.getId()
				} );
			}
		};
	}

	trackSeenEvent( trackingRatio ) {
		if ( Math.random() < trackingRatio ) {
			mw.track( 'event.WMDEBannerInteractions', {
				bannerName: this.bannerName,
				bannerAction: 'banner-seen',
				bannerImpressions: this.impressionCounter.getImpressionCount(),
				userID: mw.user.getId()
			} );
		}
	}
}
