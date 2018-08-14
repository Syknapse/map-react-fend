import React, { Component } from 'react'
import * as Locations from '../src/data/locations.json'
import './App.css'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			map: '',
			locations: Locations,
			locationInfo: [],
			markers: []
		}
	}

	componentDidMount() {
		this.loadMap()
	}

	initMap = () => {
		const plazaLarga = {lat: 37.182652, lng: -3.593314}
		let map = new  window.google.maps.Map(document.getElementById('map'), {
			center: plazaLarga,
			zoom: 15
		})
		this.setState( { map } )

		this.state.locations.forEach( location => {
			let marker = new window.google.maps.Marker({
				position: location.coordinates,
				map: map,
				title: location.title,
				label: location.label,
				animation: window.google.maps.Animation.DROP
			})
			this.state.markers.push(marker)
			let info = 'Monkey in the skies with diamonds'
			let infowindow = new window.google.maps.InfoWindow({
				content: info
			})
			// add event listener to each marker to open info display. pass 'location' to display function
			// this could be google map's infowindow

			// this.displayInfo(location)
			// console.log( this.state )
			// console.log( this.state.locations )
			// console.log(this.state.map)
			marker.addListener('click', () => {
				infowindow.open(map, marker)
				console.log(this.state)
			})
		})
		// MARKER ANIMATION BOUNCE: marker.setAnimation(window.google.maps.Animation.BOUNCE)
		// console.log(this.state.markers)
	}

	displayInfo = ( location ) => {
		// take location.wiki, add to url, fetch wiki page
		fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=200&exintro&explaintext&titles=${location.wiki}&format=json&origin=*&formatversion=2`)
			.then( response => response.json())
			.then( data => {
				let text = data.query.pages[0].extract
				console.log(text)
				// this.setState( { locationInfo: text } )
				// console.log( this.state.locationInfo )
				// console.log( this.state )
				// console.log(this.state.locationInfo)
				// this.state.locationInfo.push(text)
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

	/* testWiki = () => {
		fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=200&exintro&explaintext&titles=Albaicín&format=json&origin=*&formatversion=2')
			.then( response => response.json())
			.then( data => {
				console.log('data', data)
				console.log(data.query.pages[0].extract)
			})
	} */

  render() {
    return (
      <div className="App">
				<aside>bruhahahaaa</aside>
        <div id="map" role="application"></div>
      </div>
    );
  }
}

export default App
