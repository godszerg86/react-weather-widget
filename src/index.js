import React, {Component} from 'react';
import * as Helpers from './helpers';
import './styles/styles.css';
import './styles/climacon.css'
import Week from './components/Week/Week';
import Icon from './components/Icon';
import Temperature from './components/Temperature';
import Location from './components/Location';
import Description from './components/Description';
import Conditions from './components/Conditions';
import Image from './components/Image';
import Summary from './components/Summary';
import SearchBar from './components/SearchBar';

class WeatherWidget extends Component {

  state = {
    weather: {
      day: {}
    },
    week: [],
    city: {},
    img: '',
    notAllowed: false
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition((position) => this.fetchWeatherAndCityInfo(position.coords.latitude, position.coords.longitude), this.displayError);
    } else {
      console.log("Geolocation is not supported by this browser.");

    }
  }

  displayError = () => {
    this.setState({notAllowed: true});
  }

  fetchWeatherAndCityInfo = (lat, lon, displayName, search) => {
    let localhost = ''
    if (this.props.localhost) {
      localhost = `https://cors-anywhere.herokuapp.com/`;
    }
    if (!search) {
      fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${this.props.mapQuestApiKey}&location=${lat},${lon}`)
        .then(response => response.json())
        .then(data => this.getCityImg(data.results[0].locations[0].adminArea5, data.results[0].locations[0].adminArea3))
    } else {
      this.getCityImg(lat, lon, displayName);
    }

    fetch(`${localhost}https://api.darksky.net/forecast/${this.props.darkSkyApiKey}/${lat},${lon}?exclude=minutely,hourly,alerts,flags&units=si`)
      .catch(e => e)
      .then(response => response.json())
      .then(this.handleData)
  }

  getCityImg = (name, prov, displayName) => {
    fetch(`https://www.mapquestapi.com/staticmap/v5/map?key=${this.props.mapQuestApiKey}&center=${name},${prov}&zoom=13&size=335,251@2x&format=jpg70`)
      .then(response => response.blob())
      .then(data => this.setState((state, props) => {
        let newCityname = {}
        if (!displayName) {
          newCityname = {
            cityName: name + ',',
            prov: prov
          }
        } else {
          newCityname = {
            cityName: displayName,
            prov: ''
          }
        }
        return {
          notAllowed: false,
          img: URL.createObjectURL(data),
          city: newCityname
        }
      }))
  }

  createNewWeather = (data) => {
    const newWeather = {};
    newWeather.feelsLike = Math.round(data.currently.apparentTemperature);
    newWeather.humidity = Math.round(data.currently.humidity * 100);
    newWeather.wind = data.currently.windSpeed;
    newWeather.windDirection = Helpers.windDirection(data.currently.windBearing);
    newWeather.icon = data.currently.icon;
    newWeather.day = Helpers.dayFromTimeStamp(data.currently.time);
    newWeather.sky = data.currently.summary;
    newWeather.temp = Math.round(data.currently.temperature);
    newWeather.pressure = Math.round(data.currently.pressure);
    newWeather.weekSummary = data.daily.summary;
    return newWeather;
  }

  createNewWeek = (data) => {
    const newWeek = [];
    for (let i = 1; i < data.daily.data.length; i++) {
      newWeek.push({
        id: data.daily.data[i].time,
        day: Helpers.dayFromTimeStamp(data.daily.data[i].time),
        icon: data.daily.data[i].icon,
        maxTemp: Math.round(data.daily.data[i].temperatureHigh),
        minTemp: Math.round(data.daily.data[i].temperatureLow),
        skyClass: Helpers.skyClassIs(data.daily.data[i].icon)
      })
    }
    return newWeek;
  }

  handleData = (data) => {
    this.setState({
      weather: this.createNewWeather(data),
      week: this.createNewWeek(data)
    })
  }

  render() {

    return (
      <React.Fragment>
        <link
          href='http://fonts.googleapis.com/css?family=Roboto:400,100,300'
          rel='stylesheet'
          type='text/css'/>
        <div className="w-widget-widget-block">

          <div className="w-widget-img-area">
            <div className="w-widget-img-area-mask"></div>

            <Image img={this.state.img}/>
            <div className="w-widget-img-area-front">

              <SearchBar
                mapQuestApiKey={this.props.mapQuestApiKey}
                fetchWeatherAndCityInfo={this.fetchWeatherAndCityInfo}/> {this.state.notAllowed && (
                <div className="w-widget-error">To see local weather forecast, please allow this page to know your location</div>
              )}
              {this.state.city.cityName && (<Location cityName={this.state.city.cityName} prov={this.state.city.prov}/>)}
              {this.state.weather.day.dayOfWeek && this.state.weather.day.date && (
                <p className="w-widget-today">{this.state.weather.day.dayOfWeek}, {this.state.weather.day.date}</p>
              )}
              {this.state.weather.sky && (<Description sky={this.state.weather.sky}/>)}
              <ul className="w-widget-weather-block-info">
                <li>
                  {this.state.weather.temp && this.state.weather.feelsLike && (<Temperature
                    temp={this.state.weather.temp}
                    feelsLike={this.state.weather.feelsLike}/>)}
                </li>
                <li>{this.state.weather.icon && (<Icon icon={this.state.weather.icon}/>)}</li>
                <li>
                  {this.state.weather.pressure && this.state.weather.humidity && this.state.weather.wind && this.state.weather.windDirection && (<Conditions
                    pressure={this.state.weather.pressure}
                    humidity={this.state.weather.humidity}
                    wind={this.state.weather.wind}
                    windDirection={this.state.weather.windDirection}/>)}
                </li>
              </ul>
            </div>
          </div>
          <Summary weekSummary={this.state.weather.weekSummary}/> {this.state.week && (<Week week={this.state.week}/>)}
        </div>

      </React.Fragment>
    )
  }
}

export default WeatherWidget;