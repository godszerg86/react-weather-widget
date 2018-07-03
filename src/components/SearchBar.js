import React, {Component} from 'react';
import SearchDropDown from './SearchDropDown';

class SearchBar extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mapQuestApiKey !== nextProps.mapQuestApiKey) {
      return true;
    }

    if (this.state.results !== nextState.results) {
      return true;
    }

    return false;
  }

  state = {
    results: [],
    value: ''
  }

  predictSearch = (event) => {
    this.setState({value: event.target.value});
    if (event.target.value.trim().length >= 2) {
      fetch(`https://www.mapquestapi.com/search/v3/prediction?key=${this.props.mapQuestApiKey}&limit=5&collection=adminArea,airport&q=${event.target.value.trim()}`)
        .then(response => response.json())
        .then(this.handlePredict)
    } else {
      this.setState({results: []});
    }
  }

  handlePredict = (data) => {
    this.setState({results: data.results});
  }

  clearSearchResults = () => {
    this.setState({results: [], value: ''});
  }

  render() {
    return (
      <div className='w-widget-arrow'>
        <svg
          fill='#efeff0'
          style={{
          'width': '25px',
          'height': '25px',
          'backgroundColor': '#b2bbbf',
          'marginLeft': '10px',
          'marginBottom': '2px',
          'textAlign': 'none'
        }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 50 50"
          version="1.1">
          <g id="surface1">
            <path
              d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z "/>
          </g>
        </svg>
        <input
          value={this.state.value}
          className='w-widget-input'
          onChange={this.predictSearch}/>
        <SearchDropDown
          fetchWeatherAndCityInfo={this.props.fetchWeatherAndCityInfo}
          results={this.state.results}
          clearSearchResults={this.clearSearchResults}/>
      </div>
    );
  }
}

export default SearchBar;