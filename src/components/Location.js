import React, { Component } from 'react';

class Location extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.cityName !== nextProps.cityName) {
          return true;
        }
        if (this.props.prov !== nextProps.prov) {
          return true;
        }
        return false;
      }
    
    render() {
        return (
            <h5 className="w-widget-location">{this.props.cityName}{' '}{this.props.prov}</h5>
        );
    }
}

export default Location;