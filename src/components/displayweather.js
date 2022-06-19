import React from "react";
import './css/displayweather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDroplet, faThermometer0, faLocationDot} from '@fortawesome/free-solid-svg-icons';

class Displayweather extends React.Component {
    render() {
      if(this.props.showweather){
        return <div className="displayweatherContainer">
        <div className="displayweatherHeader">
        <h2> Weather in</h2>
        </div>
        <div className="displayweatherofCity">
        <img alt="weather images" src={`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`}/>
          <h2>{this.props.celsius}°C</h2>
          <span className="cloudDescription">{this.props.clouddescription}</span>
          <span><FontAwesomeIcon icon={faLocationDot}  className="locationdot"/> {this.props.city}, {this.props.country}</span>
        </div>
        <div className="displayFeelslike">
        <FontAwesomeIcon icon={faThermometer0} className="thermoawesome"/>
          <div className="displayFeelsliketext">
            <span>{this.props.feelslike}°C Feels like</span>
          </div>
        </div>
        <div className="displayHumidity">
        <FontAwesomeIcon icon={faDroplet} className="humidityawesome"/>
        <div className="displayHumiditytext">
        <span>{this.props.humidity}</span>
        <span>Humidity</span>
         </div>
        </div>
      </div>
      }
    }
}

export default Displayweather;