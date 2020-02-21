import { Type } from '../actions';
import { combineReducers } from 'redux';
import MapReducer from '../map/map.reducer';
import ContentReducer from './content_reducer';
import VideoReducer from './video_reducer';
import VlogReducer from './vlog_reducer';
import BusinessesReducer from './businesses_reducer';
import geocoderReducer from '../geocoder/geocoder.reducer';


// REDUCERS

const allReducers = combineReducers({
	map: MapReducer,
	content: ContentReducer,
	video: VideoReducer,
	vlogs: VlogReducer,
	businesses: BusinessesReducer,
	geocoder: geocoderReducer
})

export default allReducers;