import React, {Component} from "react";
import VenueList from "./VenueList"

export default class SideBar extends Component {

  constructor(props) {
    super(props)
    //DON'T CALL this.setState() here!
    this.state = {
      query: '',
      venues: [],
    }
  }
  
  hideSbux = () => {
    const checkbox=document.getElementById('myCheck')
    if(checkbox.checked === true) {
      console.log("CHECKED!");
      const venues = this.props.venues.filter(venue => !venue.name.includes('Starbucks'));
      console.log(venues);
      this.props.updateSuperState({venues})
      return venues;
    }
    if(checkbox.checked === false){
      console.log("NOT CHECKED, DO NOTHING!");
      console.log(this.props.venues);
      return this.props.venues;
    }
  };

  handleFilterVenues = () => {
    if(this.state.query.trim() !== '') {
      const venues = this.props.venues.filter(venue =>  venue.name
        .toLowerCase()
        .includes(this.state.query.toLowerCase()))
        return venues;
    }
    return this.props.venues;
  };

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
      <form role="search" className="form">
        <input
          type={"search"}
          id={"search"}
          placeholder={"Filter venues"}
          onChange={this.inputChange}
          aria-label="Filter venues search bar"
        />

          {/*Click to hide ALL Starbucks
          <input
            type={"checkbox"}
            id={"myCheck"}
            onClick={this.hideSbux}
            aria-label="Hide starbucks checkbox"
          />*/}
      </form>

        <VenueList {...this.props}
        venues = {this.handleFilterVenues()}
        handleListItemClick={this.props.handleListItemClick}
        />
      </div>
    )
  }
}
