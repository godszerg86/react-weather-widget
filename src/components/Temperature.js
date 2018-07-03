import React, {Component} from 'react';

class Temperature extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.temp !== nextProps.temp) {
      return true;
    }
    if (this.props.feelsLike !== nextProps.feelsLike) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <p className={this.props.temp > 0 ? "w-widget-temperature" : "w-widget-temperature w-widget-minus"}>{Math.abs(this.props.temp)}
        <span className={this.props.feelsLike > 0 ? "w-widget-temperature-feels" : "w-widget-temperature-feels w-widget-minus"}>{Math.abs(this.props.feelsLike)} {' '} feels</span>
      </p>
    );
  }
}

export default Temperature;