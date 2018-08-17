import React, { Component } from 'react'

class Place extends Component {

	handleClick = () => {
		this.props.onPlaceClick(this.props.location)
	}

	render() {
		return (
			<div id={this.props.location.name} className='place' key={ this.props.location.name } onClick={ this.handleClick } tabIndex="0">
				<h3 tabIndex="0">{ this.props.location.name }</h3>
				<div tabIndex="0">{ this.props.location.title }</div>
				<hr/>
			</div>
		)
	}
}

export default Place