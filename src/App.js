import React, { Component } from 'react'
import * as Locations from '../src/data/locations.json'
import Place from '../src/Place'
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
				this.displayInfo(location)
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

	fetchInfo = (location) => {
		fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=200&exintro&explaintext&titles=${location.wiki}&format=json&origin=*&formatversion=2`)
			.then( response => response.json())
			.then( data => {
				let info = data.query.pages[0].extract

				this.setState( {
					locationInfo: info
				})
			})
	}

	displayInfo = (location) => {
		this.fetchInfo(location)
		let marker = this.state.markers.filter( marker =>
			marker.title === location.title
		)
		marker[0].setAnimation(window.google.maps.Animation.BOUNCE)
		setTimeout( () => marker[0].setAnimation(null), 2100)
	}

	filterInfo = (location) => {
		this.fetchInfo(location)
		this.state.markers.forEach( marker => {
			marker.setMap(this.state.map)
			if (marker.title === location.title) {
				marker.setAnimation(window.google.maps.Animation.BOUNCE)
				setTimeout( () => marker.setAnimation(null), 2100)
			} else {
				marker.setMap(null)
			}
		})
	}

	resetAll = () => {
		let places = document.querySelectorAll('.place')
		places.forEach( place => {
			place.style.display = 'block'
		})
		this.state.markers.forEach( marker => {
			marker.setMap(this.state.map)
			marker.setAnimation(window.google.maps.Animation.DROP)
		})
		this.setState( { locationInfo: '' } )
	}

	optionFilter = (e) => {
		this.state.locations.forEach( location => {
			let thisPlace = document.querySelector(`#${location.name}`)

			if (e.target.value === 'all') {
				this.resetAll()
			} else if (e.target.value === thisPlace.id) {
				thisPlace.style.display = 'block'
				this.filterInfo(location)
			} else {
				thisPlace.style.display = 'none'
			}
		})
	}

	selectorFilter = () => {
		return(
			<select onChange={ this.optionFilter } name="" id="place-filter">
				<option value="all">All</option>
				{ this.state.locations.map( location => this.option(location) ) }
			</select>
		 )
	}

	option = (location) => {
		return( <option value={ location.name } key={ location.name }> { location.name } </option> )
	}

	display = () => {
		return (
			<div>
				<h4>From Wikipedia:</h4>
				<div>{ this.state.locationInfo }</div>
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
						{ this.state.locations.map( location => (
							<Place
								key= { location.name }
								location= { location }
								onPlaceClick= { this.displayInfo }
							/>
						))}
					</section>
						{ this.display() }
				</aside>
				<div id="map" role="application"></div>
      </div>
    )
  }
}

export default App
