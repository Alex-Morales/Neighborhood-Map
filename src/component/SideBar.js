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
  
  inputChange = (event) => {
    const query = event.target.value;
    this.setState({query});
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
