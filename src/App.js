import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map"
import FoursquareAPI from "./API/"

class App extends Component {
  constructor() {
    super();
    // Don't call this.setState() here!
    this.state = {
      venues: [],
      center: [],
      markers: [],
      zoom: 12
    };
  }
  componentDidMount() {
    FoursquareAPI.search({
      near: "Folsom,CA",
      query: "tacos",
      limit: 10
    }).then(results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen:false,
            isVisible:true,
          };
        });
        this.setState({ venues, center, markers });
        console.log(results)
        console.log({ markers })
    });
  }
  render() {
    return (
      <div className="App">
        <Map {...this.state} />
      </div>
    );
  }
}

export default App;
