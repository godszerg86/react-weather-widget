import React, { Component } from 'react';

class DayOfTheWeek extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dayOfWeek !== nextProps.dayOfWeek) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <h5 className="w-widget-week-day">{this.props.dayOfWeek}</h5>
    );
  }
}

export default DayOfTheWeek;