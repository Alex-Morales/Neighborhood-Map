import React, {Component} from "react";
import VenueList from "./VenueList"

export default class SideBar extends Component {

  constructor(props) {
    super(props)
    //DON'T CALL this.setState() here!
    this.state = {
      query: ''
    }
  }
  handleFilterVenues = () => {

  }
  inputChange = (event) => {
    const query = event.target.value;
    this.setState({query});
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name.toLowerCase().includes(query.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if(isMatched) {
        marker.isVisible = true;
      }
      else {
         marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({markers})
    return console.log(query)
  }

  render() {
    return (
      <div className="sideBar">
        <input
          type={"search"}
          id={"search"}
          placeholder={"Filter venues"}
          onChange={this.inputChange}
        />
        <VenueList {...this.props}
        handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    )
  }
}
