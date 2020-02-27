import { Component } from 'react';
import { firestore } from '../../lib/firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Helpers
import MapContainer from './helpers/map';
	// Pins
import LocationPins from './helpers/location_pins';
import QueryMarker from './helpers/query_marker';
import Prices from './helpers/prices';
import LocationPopup from './helpers/popup';
// Styles
import s from './Map.scss';
// Redux
import { MapAction } from '../../redux-store/map/map.actions';


class Map extends Component {

	static defaultProps = {
		hover_marker: null,
		map_center: [-71.2278118412173,46.80942018867191],
		zoom : [12.126913726486569]
	}

	render() {
		let { setMapToProps, businesses, hoverPin, hover_marker, map_center, zoom, queryCoords, map, locationPins } = this.props
		
		return(
			<MapContainer
				className = {s('Map')}
				style = {'mapbox://styles/bfmcgo2/cje1yog8zc5xi2rq99geum951'}
				zoom = { zoom }
				center = { (isNaN(queryCoords[0])||isNaN(queryCoords[1]) ? map_center : queryCoords ) }
				onStyleLoad= { map => {
				  	setMapToProps(map);
			  	}}>
			  	{ 
			  		// LOCATION PINS
			  		locationPins ? (
				  		<LocationPins 
				  			locationPins = { locationPins }
				  			hoverPin = { hoverPin } />
					  	) : (<div></div>)
			  	}
			  	{ 
			  		// QUERY PINS
			  		queryCoords ? (
				  		<QueryMarker 
				  		queryCoords = { queryCoords }/>
					  	) : (<div></div>)
			  	}
			  	{
			  		hover_marker ? (
			  			<LocationPopup 
			  				hover_marker= {hover_marker}/>
			  		) : (<div></div>)
			  	}

			  	
			</MapContainer>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return {
		businesses: state.businesses,
		hover_marker: state.map.hover_id,
		map: state.map.set_map
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setMapToProps(map) {
			dispatch(MapAction.setMapToProps(map));
		},
		hoverPin(pin) {
			dispatch(MapAction.hoverPin(pin))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Map);