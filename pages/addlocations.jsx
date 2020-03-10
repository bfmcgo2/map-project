import { Component } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { addLocation, firestore } from '../lib/firebase';

import GlobalStyles from 'styles/styles.scss';

import Geocode from '../components/Geocode';
import LocationBuilder from '../components/LocationBuilder';

const Map = dynamic( () =>
	import('../components/Map'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)



class AddLocations extends Component {
	static getInitialProps = async ({ query }) => {
		const collectionRef = await firestore.collection('locations').get();
		const getLocations = collectionRef.docs.map(d => {

			return {
				id: d.id,
				data: d.data()
			}
		});

		return { 
			santa_fe : getLocations,
			query 
		}
	}

	render() {
		let { query, santa_fe } = this.props
		let queryPin = [parseFloat(query.lng), parseFloat(query.lat)]
		return(
			<div>
				<Map queryPin = { queryPin } locationPins = { santa_fe }/>
				<LocationBuilder />
			</div>
			
		)
	}
	
}


export default withRouter(AddLocations);