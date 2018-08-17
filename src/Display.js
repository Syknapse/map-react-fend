import React, { Component } from 'react'

class Display extends Component {

	/* animate = () => {
		const container = document.querySelector('.display')

		console.log(container.classList)
		if (this.props.info) {
			container.classList.add('animate')
		} else {
			container.classList.remove('animate')
		}

	} */
	
	content = () => {
		if (this.props.info) {
			return (
				<div>
					<h4>From Wikipedia:</h4>
					<p>{ this.props.info }</p>
				</div>
			)
		} else {
			return null
		}
	}
	
	render() {
		return (
			<div className="display">
				{ this.content() }
			</div>
		)
	}
}

export default Display