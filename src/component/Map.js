/* global google */
import React, {Component} from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

  const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
    <GoogleMap
      role="application"
      aria-label="map"
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      center={{
        lat: parseFloat(props.center.lat),
        lng: parseFloat(props.center.lng)
      }}
    >
      {props.markers &&
        props.markers
          .filter(marker => marker.isVisible)
          .map((marker,idx, arr) => {
            const venueInfo = props.venues.find(venue => venue.id===marker.id);
            return <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.handleMarkerClick(marker)}
            animation={arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
            isOpen={arr.length === 1 ? true : false}
            tabIndex="0"
            >

              {marker.isOpen &&
                venueInfo.bestPhoto && (
                  <InfoWindow>
                <>
                  <img
                    src={`${venueInfo.bestPhoto.prefix}100x100${venueInfo.bestPhoto.suffix}`}
                    alt={`${venueInfo.name}`}
                  />
                  <p>{ venueInfo.name }</p>
                  <p>{ venueInfo.location.address }</p>
                </>
              </InfoWindow>
            )}
            </Marker>
          })
      }
    </GoogleMap>
  ))
);

  export default class Map extends Component {
    constructor() {
    super();
    this.state = {
      error: false
    };
    }

    componentDidMount = () => {
      window.gm_authFailure = () => {
        this.setState({ error: true });
      };
    }

    render() {
      return (
        <div className="mapContainer">
          {!this.state.error && (
          <MyMapComponent
          {...this.props}
          className="map"
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDuDk-Kii8G-EwKiU54qniCYki40kqVndA"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh`}} />}
          mapElement={<div style={{ height: `100%` }} />}
          />
          )}
          {this.state.error && (
            <div style={{ textAlign: "center" }}>
              <h1>Error loading map</h1>
              <p>Network error. Check internet connection.</p>
            </div>
          )}
        </div>

          // <MyMapComponent
          // {...this.props}
          // className="map"
          // googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDuDk-Kii8G-EwKiU54qniCYki40kqVndA" //A
          // loadingElement={<div style={{ height: `100%` }} />}
          // containerElement={<div style={{ height: `100%`, width: `75%` }} />}
          // mapElement={<div style={{ height: `100%` }} />}
          // />
      )
    }
  }
