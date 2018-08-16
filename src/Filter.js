import React, { Component } from 'react'

class Filter extends Component {

	option = (location) => {
		return( <option value={ location.name } key={ location.name }> { location.name } </option> )
	}

	handleChange = (e) => {
		this.props.onSelectorChange(e)
	}

	render() {
		return (
			<select onChange={ this.handleChange } id="place-filter">
				<option value="all">All</option>
				{ this.props.locations.map( location => this.option(location) ) }
			</select>
		)
	}
}

export default Filter