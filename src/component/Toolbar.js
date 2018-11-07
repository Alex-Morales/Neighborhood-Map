import React from 'react'
import '../App.css';
import DrawerToggleButton from "./DrawerToggleButton"


const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar-nav">
      <div>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
       <div className="spacer" />
      <div><h1 aria-label="Home">Coffee shops in Folsom, CA</h1></div>
    </nav>
  </header>
);

export default toolbar;
