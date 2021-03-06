/* global google */
import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map"
import FoursquareAPI from "./API/"
import SideBar from "./component/SideBar"
import Toolbar from "./component/Toolbar"
import Backdrop from "./component/Backdrop"

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
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      },
      error: false,
      sideDrawerOpen: false,
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
        });
        marker.animation=google.maps.Animation.BOUNCE;

  }

  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    console.log(marker);
    this.handleMarkerClick(marker);
    this.setState({sideDrawerOpen: false});
  }
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };
  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

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
    }).catch(error => {
      this.setState({ error: true })
    });
  }

  render() {
    let sideDrawer;
    let backdrop;
    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
      sideDrawer = <SideBar {...this.state}
        handleListItemClick={this.handleListItemClick}
      />
    }
    if(this.state.error) {
      return <div style={{ textAlign: "center" }}>
        <h1>Error loading app</h1>
        <p>Please try again.</p>
      </div>;
    }
    return (
      <div style={{height: '100%'}}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        {sideDrawer}
        {backdrop}
        <main className="App" style={{marginTop:'80px'}}>
          {/*<SideBar {...this.state}
          handleListItemClick={this.handleListItemClick}
          />*/}
          <Map {...this.state}
            handleMarkerClick={this.handleMarkerClick}
          />
        </main>
      </div>
    );
  }
}

export default App;
