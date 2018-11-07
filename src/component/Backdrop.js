import React from 'react'
import '../App.css'

const backdrop = props => (
  <div className="backdrop" onClick={props.click} />
);

export default backdrop;
