import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Displayweather from './components/displayweather';
import axios from 'axios';
import debounce from 'lodash.debounce';

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        celsius: '',
        city: '',
        humidity: '',
        feelslike: '',
        clouddescription: '',
        icon: '',
        country: '',
        message: '',
        findcity: '',
        show: false,
        regionNamesInEnglish: new Intl.DisplayNames(['en'], { type: 'region' }),
      };
      this.onChangeDebounced = debounce(this.onChangeDebounced, 2000);
    }

    searchCity = (e) => {
      let regexcity = /^[a-zA-Z',.\s-]{1,25}$/
      this.setState({
        findcity: e.target.value,
      }, () => {
        if(this.state.findcity.length > 2 && regexcity.test(this.state.findcity)){
          this.onChangeDebounced(this.state.findcity);
        } else {
          this.setState({
            show: false,
          })
        }
      })
      
    }

    onChangeDebounced = async (cityname) => {
      try {
       
        const responsecity = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.REACT_APP_WEATHER_APIKEY}&units=metric`);
        this.setState({
          show: true,
          celsius: Math.floor(responsecity.data.main.temp),
          city: responsecity.data.name,
          humidity: responsecity.data.main.humidity,
          feelslike: Math.floor(responsecity.data.main.feels_like),
          clouddescription: responsecity.data.weather[0].description,
          icon: responsecity.data.weather[0].icon,
          country: this.state.regionNamesInEnglish.of(responsecity.data.sys.country),
        }, () => {});
      } catch (error) {
        console.log(error)
     }
    }

    getPostion = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
    }

    getCityLocation = async () => {
      try {
        let showposition = await this.getPostion();
        let getLatitude = showposition.coords.latitude;
        let getLongitude = showposition.coords.longitude; 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${getLatitude}&lon=${getLongitude}&appid=${process.env.REACT_APP_WEATHER_APIKEY}&units=metric`);
        this.setState({
          show: true,
          celsius: Math.floor(response.data.main.temp),
          city: response.data.name,
          humidity: response.data.main.humidity,
          feelslike: Math.floor(response.data.main.feels_like),
          clouddescription: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          country: this.state.regionNamesInEnglish.of(response.data.sys.country),
        }, () => {});
      } catch (error) {
        console.error(error);
      }
    }
    render() {
      return (
        <div className="App">
          <div className='weatherApp'>
          <div className='searchCity'>
            <div className='weatherHeader'>
            <h2>Weather App <FontAwesomeIcon icon={solid('cloud')} className="weatherCloud" /></h2>
            </div>
            <div className='enterCity'>
            <input type='text' placeholder='Enter city name' onChange={(e) => this.searchCity(e)}/>
            <span>{this.state.message}</span>
            </div>
            <div className='getDevicelocation'>
              <button onClick={this.getCityLocation}>Get Device Location</button>
            </div>
          </div>
          <Displayweather 
          showweather={this.state.show}
          celsius={this.state.celsius}
          city={this.state.city}
          humidity={this.state.humidity}
          feelslike={this.state.feelslike}
          clouddescription={this.state.clouddescription}
          icon={this.state.icon}
          country={this.state.country}
          />
         </div>
        </div>
      )
    }
}

export default App;
