import React, {Component} from "react";
import ListItem from "./ListItem"

export default class VenueList extends Component {
  render() {
    return (
      <ul className="venueList">
        <ListItem/>
        <ListItem/>
        <ListItem/>
      </ul>
    )
  }
}
