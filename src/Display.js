import React, { Component } from 'react'

class Display extends Component {

	content = () => {
		if (this.props.info) {
			return (
				<div>
					<p tabIndex="0">{ this.props.info }</p>
					<a href={`https://en.wikipedia.org/wiki/${this.props.link}`} target="_blank" tabIndex="0">From Wikipedia =></a>
				</div>
			)
		} else {
			return null
		}
	}
	
	render() {
		return (
			<div className="display" tabIndex="0">
				{ this.content() }
			</div>
		)
	}
}

export default Display