import React, {Component} from "react";

export default class ItemList extends Component {
  render() {
    return (
      <li className="listItem" onClick={()=> this.props.handleListItemClick(this.props)} tabIndex="0" >
        <img src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix}
        alt={this.props.categories[0].name}
        />
        {this.props.name}
      </li>
    )
  }
}
