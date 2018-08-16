import React, { Component } from 'react'
import * as Locations from '../src/data/locations.json'
import './App.css'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			map: '',
			locations: Locations,
			locationInfo: '',
			markers: []
		}
	}

	componentDidMount() {
		this.loadMap()
	}

	initMap = () => {
		const cuestaDelInfierno = {lat: 37.179307, lng: -3.588260}
		let map = new  window.google.maps.Map(document.getElementById('map'), {
			center: cuestaDelInfierno,
			zoom: 15
		})
		this.setState( { map } )

		this.state.locations.forEach( location => {
			let marker = new window.google.maps.Marker({
				position: location.coordinates,
				map: map,
				title: location.title,
				animation: window.google.maps.Animation.DROP,
			})
			this.state.markers.push(marker)

			marker.addListener('click', () => {
				// this.displayInfo(location)
				this.placeActions(location)
			})
		})
	}

	displayInfo = (location) => {
		fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=200&exintro&explaintext&titles=${location.wiki}&format=json&origin=*&formatversion=2`)
			.then( response => response.json())
			.then( data => {
				let info = data.query.pages[0].extract

				this.setState( {
					locationInfo: info
				})
			})
	}

	loadMap = () => {
		// Create a script tag for the Google map credentials
		const mapScript = document.createElement('script')
		mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA7S0jbcOmdypcdzYL8ZXA9JG1BGbcRNzY&callback=initMap'
		mapScript.async = true

		window.initMap = this.initMap
		document.body.appendChild(mapScript)
	}

	placeActions = (location) => {
		this.displayInfo(location)
		let marker = this.state.markers.filter( marker =>
			marker.title === location.title
		)
		marker[0].setAnimation(window.google.maps.Animation.BOUNCE)
		setTimeout( () => marker[0].setAnimation(null), 2100)
	}

	optionFilter = (e) => {

		console.log(e.target.value)
		this.state.locations.forEach( location => {
			let places = document.querySelectorAll('.place')
			let thisPlace = document.querySelector(`#${location.name}`)

			if (e.target.value === 'all') {
				places.forEach( place => {
					place.style.display = 'block'
				})
				this.setState( { locationInfo: '' } )
			} else if (e.target.value === thisPlace.id) {
				thisPlace.style.display = 'block'
				this.placeActions(location)
			} else {
				thisPlace.style.display = 'none'
			}
			// console.log(thisPlace.id)
		})
		/* let marker = this.state.markers.filter( marker =>
			marker.title === location.title
		) */
		// marker[0].setAnimation(window.google.maps.Animation.BOUNCE)
		// setTimeout( () => marker[0].setAnimation(null), 2100)
	}

	selectorFilter = () => {
		return(
			<select onChange={ this.optionFilter } name="" id="">
				<option value="all">All</option>
				{ this.state.locations.map( location => this.option(location) ) }
			</select>
		 )
	}

	option = (location) => {
		return( <option value={ location.name } key={ location.name }> { location.name } </option> )
	}

	place = (location) => {
		return (
			<div id={location.name} className='place' key={ location.name } onClick={ () => this.placeActions(location) } >
				<h3>{ location.name }</h3>
				<div>{ location.title }</div>
				<hr/>
			</div>
		)
	}

  render() {
    return (
      <div className="App">
				<aside>
					{ this.selectorFilter() }
					<section>
						<h2>Granada Places</h2>
						{ this.state.locations.map( location => this.place(location) ) }
					</section>
					<div onClick={ this.initMap }>{ this.state.locationInfo }</div>
				</aside>
        <div id="map" role="application"></div>
      </div>
    )
  }
}

export default App
