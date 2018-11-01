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
    state = {
        show: false,
        timeout: null
    }
    showMessage = () => {
        this.setState({show: true});
    }
    componentDidMount = () => {
        let timeout = window.setTimeout(this.showMessage, 1000);
        this.setState({timeout});
    }
    componentWillUnmount = () => {
        window.clearTimeout(this.state.timeout);
    }
    render() {
      return (
        <MyMapComponent
        {...this.props}
        className="map"
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDuDk-Kii8G-EwKiU54qniCYki40kqVndA"
        loadingElement={<div>
          {this.state.show
            ?
            (<div>
                <h1>Error loading map</h1>
                <p>Network error. Check internet connection.</p>
            </div>):(<div><h1>Loading...</h1></div>)
          }
        </div>}
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      )
    }
  }
