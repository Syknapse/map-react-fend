import React, { Component } from 'react'

class Display extends Component {

	render() {
		if (this.props.info) {
			return (
				<div>
					<h4>From Wikipedia:</h4>
					<div>{ this.props.info }</div>
				</div>
			)
		} else {
			return null
		}
	}
}

export default Display