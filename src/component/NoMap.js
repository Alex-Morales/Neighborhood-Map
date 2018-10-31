import React, {Component} from "react"

class NoMap extends Component {
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

    render = () => {
        return (
          <div>
            {this.state.show
              ?
              (<div>
                  <h1>Error loading map</h1>
                  <p>Network error. Check internet connection.</p>
              </div>):(<div><h1>Loading...</h1></div>)
            }
          </div>
        )
    }
}
export default NoMap;
