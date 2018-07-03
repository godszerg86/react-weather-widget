import React, { Component } from 'react';

class Image extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.img !== nextProps.img) {
      return true;
    }

    return false;
  }

  render() {
    return (
     <img src={this.props.img} alt=""/>
    );
  }
}

export default Image;