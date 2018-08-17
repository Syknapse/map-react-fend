import React, { Component } from 'react'

class Place extends Component {

	handleClick = () => {
		this.props.onPlaceClick(this.props.location)
	}

	render() {
		return (
			<div id={this.props.location.name} className='place' key={ this.props.location.name } onClick={ this.handleClick } tabIndex="0">
				<h2>{ this.props.location.name }</h2>
				<div>{ this.props.location.title }</div>
			</div>
		)
	}
}

export default Place