import React, { Component } from 'react';

class Summary extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.weekSummary !== nextProps.weekSummary) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <div className="w-widget-week-summary">{this.props.weekSummary}</div>
    );
  }
}

export default Summary;