import React, {Component} from 'react';

class SearchDropDown extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.results !== nextProps.results) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <ul className='w-widget-predict-drop'>
        {this
          .props
          .results
          .map(obj => (
            <li
              onClick={() => {
              let display = '';
              if (obj.collection[0] === 'airport') {
                display = obj.name;
              } else {
                display = obj.place.properties.city + ', ' + obj.place.properties.stateCode;
              }
              this
                .props
                .fetchWeatherAndCityInfo(obj.place.geometry.coordinates[1], obj.place.geometry.coordinates[0], display, true);
              this
                .props
                .clearSearchResults();
            }}
              key={obj.id}>{obj.displayString}</li>
          ))}
      </ul>
    );
  }
}

export default SearchDropDown;