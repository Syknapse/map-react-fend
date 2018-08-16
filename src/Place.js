import React, { Component } from 'react'

class Place extends Component {

	handleClick = () => {
		this.props.onPlaceClick(this.props.location)
	}

	render() {
		return (
			<div id={this.props.location.name} className='place' key={ this.props.location.name } onClick={ this.handleClick } >
				<h3>{ this.props.location.name }</h3>
				<div>{ this.props.location.title }</div>
				<hr/>
			</div>
		)
	}
}

export default Place