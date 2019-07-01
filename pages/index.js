import dynamic from 'next/dynamic';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Action } from 'redux-store/actions';

import GlobalStyles from 'styles/styles.scss';

const MapComponent = dynamic(()=>
	import('../components/MapComponent'),
	{
		loading: () => <div></div>,
		ssr:false
	}
)
import Video from '../components/VideoPlayer';



class Index extends Component {
	static getInitialProps ({ reduxStore, req }) {
		const isServer = !!req

		return {}
	}

	static defaultProps = {
		count: 0
	}

	toggle = () => {
		const { toggleTap } = this.props
		toggleTap()
	}

	increment = () => {
		const { incrementCount } = this.props
		incrementCount()
	}

	decrement = () => {
		const { decrementCount } = this.props
		decrementCount()
	}

	render() {
		const { tap, count } = this.props;

		return (
			<section>
				<MapComponent />
				<div className="video-container">
					<Video />
				</div>	
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {
		tap: state.tap,
		count: state.count
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleTap() {
			dispatch(Action.toggleTap());
		},
		incrementCount() {
			dispatch(Action.incrementCount());
		},
		decrementCount() {
			dispatch(Action.decrementCount());
		}
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);
