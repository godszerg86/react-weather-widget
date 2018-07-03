import React, {Component} from 'react';

class LowHighTemp extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.minTemp !== nextProps.minTemp) {
      return true;
    }

    if (this.props.maxTemp !== nextProps.maxTemp) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <p className="w-widget-week-day-container">
        <span
          className={this.props.minTemp > 0
          ? 'w-widget-week-day-temperature'
          : 'w-widget-week-day-temperature w-widget-minus'}>{Math.abs(this.props.minTemp)}</span>
        <span
          className={this.props.maxTemp > 0
          ? 'w-widget-week-day-temperature'
          : 'w-widget-week-day-temperature w-widget-minus'}>{Math.abs(this.props.maxTemp)}</span>
      </p>
    );
  }
}

export default LowHighTemp;