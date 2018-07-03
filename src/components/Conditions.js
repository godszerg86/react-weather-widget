import React, {Component} from 'react';

class Conditions extends Component {
  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.pressure !== nextProps.pressure) {
      return true;
    }

    if (this.props.humidity !== nextProps.humidity) {
      return true;
    }

    if (this.props.wind !== nextProps.wind) {
      return true;
    }

    if (this.props.windDirection !== nextProps.windDirection) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <ul className="w-widget-weather-params">
        <li>
          <i className="w-widget-climacon"></i>
          <span>{this.props.pressure}
            mm Hg</span>
        </li>
        <li>
          <i className="w-widget-climacon"></i>
          <span>{this.props.humidity}% humidity</span>
        </li>
        <li>
          <i className="w-widget-climacon"></i>
          <span>{this.props.wind}m/s {this.props.windDirection}</span>
        </li>
      </ul>
    );
  }
}

export default Conditions;