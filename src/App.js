import React, { Component } from 'react';
import './App.css';
import Map from "./component/Map"
import YelpAPI from "./API/"

class App extends Component {
  componentDidMount() {
    YelpAPI.search({
      location: "Folsom,CA",
      term: "tacos"
    }).then(results => console.log(results));
  }
  render() {
    return (
      <div className="App">
        <Map/>
      </div>
    );
  }
}

export default App;
