import fetch from 'cross-fetch';

// ACTIONS
const Type = {
	// Map Actions
	SET_MAP: 'SET_MAP',
	SET_ACTIVE_PIN: 'SET_ACTIVE_PIN',
	// Video Actions
	VIDEO_CONTROLS : 'VIDEO_CONTROLS',
	VIDEO_PLAY: 'VIDEO_PLAY',
	// Content Actions
	FETCH_INPUT_LOCATION: 'FETCH_INPUT_LOCATION',
	FETCH_INPUT_LOCATION_SUCCESS: 'FETCH_INPUT_LOCATION_SUCCESS',
	CURRENT_CITY: 'CURRENT_CITY',
	FETCH_BUSINESS_LOCATION_SUCCESS: 'FETCH_BUSINESS_LOCATION_SUCCESS',
	UPDATE_NEW_VLOG: 'UPDATE_NEW_VLOG'
};

const Action = {
	// Map Actions
		// adds map functionality across components
	setMapToProps: (map) => {
		return {
			type: Type.SET_MAP,
			payload: map
		}
	},
	setActivePin : (pin) => {
		return {
			type: Type.SET_ACTIVE_PIN,
			payload: pin
		}
	},
	// Video Actions
	setVideoControls: (player) => {
		return {
			type: Type.VIDEO_CONTROLS,
			payload: player
		}
	},
	playVideo: () => {
		return {
			type: Type.VIDEO_PLAY
		}
	},
	// Content Actions

	fetchInputLocation: (location) => {
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place,neighborhood,region,locality&access_token=${process.env.MAPBOX_KEY}`

		return dispatch => {
				fetch(endpoint)
					.then(res => res.json())
					.then(json => dispatch(Action.fetchInputLocationSuccess(json)))
		}
		
	},
	fetchInputLocationSuccess: (res) => {
		return {
			type: Type.FETCH_INPUT_LOCATION_SUCCESS,
			payload: res
		}	
	},
	getCurrentCity: (city) => {
		return {
			type: Type.CURRENT_CITY,
			payload: city
		}
	},
	fetchBusinessLocation: (business, bbox) => {
		const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${business}.json?types=poi&bbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}&access_token=${process.env.MAPBOX_KEY}`

		return dispatch => {
				fetch(endpoint)
					.then(res => res.json())
					.then(json => dispatch(Action.fetchBusinessLocationSuccess(json)))
		}
	},
	fetchBusinessLocationSuccess: (res) => {
		return {
			type: Type.FETCH_BUSINESS_LOCATION_SUCCESS,
			payload: res
		}	
	},
	updateNewVlog: (biz, update) => {
		let newVlog = Object.assign(biz, update);
		return {
			type: Type.UPDATE_NEW_VLOG,
			payload: newVlog
		}
	}

}

export { Type, Action };
