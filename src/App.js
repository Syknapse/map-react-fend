import React, { Component } from 'react'
import * as Locations from '../src/data/locations.json'
import Place from '../src/Place'
import Filter from '../src/Filter'
import Display from '../src/Display'
import './App.css'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			map: '',
			locations: Locations,
			locationInfo: '',
			locationLink: '',
			markers: []
		}
	}

	componentDidMount() {
		this.loadMap()
	}

	loadMap = () => {
		// Create a script tag for the Google map credentials
		const mapScript = document.createElement('script')
		mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA7S0jbcOmdypcdzYL8ZXA9JG1BGbcRNzY&callback=initMap'
		mapScript.async = true
		mapScript.onerror = () => {
			document.write('Something went terribly wrong. Your map is probably in an alternative universe! (It is not your fault, try reloading)')
			window.stop()
		}

		window.initMap = this.initMap
		document.body.appendChild(mapScript)
	}

	initMap = () => {
		const cuestaDelInfierno = {lat: 37.179307, lng: -3.588260}
		let map = new  window.google.maps.Map(document.getElementById('map'), {
			center: cuestaDelInfierno,
			zoom: 15
		})
		this.setState( { map } )
		this.createMarkers()
	}

	createMarkers = () => {
		this.state.locations.forEach( location => {
			let marker = new window.google.maps.Marker({
				position: location.coordinates,
				map: this.state.map,
				title: location.title,
				animation: window.google.maps.Animation.DROP,
			})
			this.state.markers.push(marker)

			marker.addListener('click', () => {
				this.displayInfo(location)
			})
		})
	}

	fetchInfo = (location) => {
		this.animateOut()
		fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=500&exintro&explaintext&titles=${location.wiki}&format=json&origin=*&formatversion=2`)
			.then( response => response.json())
			.then( data => {
				let info = data.query.pages[0].extract
				let infoTitle = data.query.pages[0].title

				// Info to display about each place and the title used in the link url
				this.setState( {
					locationInfo: info,
					locationLink: infoTitle
				})
				this.animateIn()
			})
			.catch( error => {
				this.setState( {
					locationInfo: 'We are terribly sorry, it seems the internet has been deleted (we suspect cats did it). Try reloading the page.'
				})
				console.log(error)
			})
	}

	bounceMarker = (marker) => {
		marker.setAnimation(window.google.maps.Animation.BOUNCE)
		setTimeout( () => marker.setAnimation(null), 2100)
	}

	// Display info and bounce selected marker
	displayInfo = (location) => {
		this.fetchInfo(location)
		let marker = this.state.markers.filter( marker =>
			marker.title === location.title
		)
		this.bounceMarker(marker[0])
	}

	// Display info and remove unselected markers
	filterMarkers = (location) => {
		this.fetchInfo(location)
		this.state.markers.forEach( marker => {
			marker.setMap(this.state.map)
			if (marker.title === location.title) {
				this.bounceMarker(marker)
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

	// Filtering places and markers
	filterPlaces = (e) => {
		this.state.locations.forEach( location => {
			let thisPlace = document.querySelector(`#${location.name}`)

			if (e.target.value === 'all') {
				this.resetAll()
			} else if (e.target.value === thisPlace.id) {
				thisPlace.style.display = 'block'
				this.filterMarkers(location)
			} else {
				thisPlace.style.display = 'none'
			}
		})
	}

	// Animation for Place info
	animateOut = () => {
		const container = document.querySelector('.display')
		container.style.transform = 'translateX(-600px)'
	}

	animateIn = () => {
		const container = document.querySelector('.display')
		container.style.transform = 'translateX(0)'
	}

	render() {
		return (
		<div className="App" tabIndex="0">
					<div id="map" role="application"></div>
					<aside>
						<h1 tabIndex="0">Granada Places</h1>
						<Filter
							locations= { this.state.locations }
							onSelectorChange= { this.filterPlaces }
						/>
						<Display
							info= { this.state.locationInfo }
							link= { this.state.locationLink }
						/>
						<section>
							{ this.state.locations.map( location => (
								<Place
									key= { location.name }
									location= { location }
									onPlaceClick= { this.displayInfo }
								/>
							))}
						</section>
					</aside>
		</div>
		)
	}
}

export default App
