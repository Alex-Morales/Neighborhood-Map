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
      name: [],
      address: [],
      zoom: 12
    };
  }
  closeMarkers = () =>  {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }

  handleMarkerClick = (marker) => {
    this.closeMarkers();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)})
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    FoursquareAPI.getVenueDetails(marker.id)
      .then(response => {
          const newVenue = Object.assign(venue, response.response.venue);
          this.setState({ venues: Object.assign(this.state.venues, newVenue) });
          console.log(newVenue)
        });
  }

  componentDidMount() {
    FoursquareAPI.search({
      near: "Folsom,CA",
      // query: "coffee",
      intent: "browse",
      categoryId: "4bf58dd8d48988d1e0931735",
      // limit: 10
    }).then(results => {
        const { venues } = results.response;
        const { center } = results.response.geocode.feature.geometry;
        const markers = venues.map(venue => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen:false,
            isVisible:true,
            name: venue.name,
            id: venue.id,
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
        <Map {...this.state}
        handleMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
