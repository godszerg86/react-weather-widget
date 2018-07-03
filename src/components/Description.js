import React, {Component} from 'react';

class Description extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.sky !== nextProps.sky) {
          return true;
        }
    
        return false;
      }
  render() {
    return (
      <div className="w-widget-weather-desc">
        <span>{this.props.sky}</span>
      </div>
    );
  }
}

export default Description;