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
		// this.testWiki()
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


  render() {
    return (
      <div className="App">
        <div id="map" role="application"></div>
      </div>
    );
  }
}

export default App;
