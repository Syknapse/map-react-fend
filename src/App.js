import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor() {
		super()
		this.state = {
			map: ''
		}
	}

	componentDidMount() {
		this.loadMap()
		this.testWiki()
	}

	initMap = () => {
		const plazaLarga = {lat: 37.182652, lng: -3.593314}
		let map = new window.google.maps.Map(document.getElementById('map'), {
			center: plazaLarga,
			zoom: 20
		})
		let marker = new window.google.maps.Marker({
			position: plazaLarga,
			map: map
		})
	}

	loadMap() {
		// Create a script tag for the Google map credentials
		const mapScript = document.createElement('script')
		mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA7S0jbcOmdypcdzYL8ZXA9JG1BGbcRNzY&callback=initMap'
		mapScript.async = true

		window.initMap = this.initMap
		document.body.appendChild(mapScript)
	}

	testWiki() {
		fetch('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=200&exintro&explaintext&titles=Albaicín&format=json&origin=*&formatversion=2')
			.then( response => response.json())
			.then( data => {
				console.log('data', data)
				console.log(data.query.pages[0].extract)
			})
	}

  render() {
    return (
      <div className="App">
        <div id="map" role="application"></div>
      </div>
    );
  }
}

export default App;
