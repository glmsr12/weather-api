import axios from 'axios';
import React, { useState } from 'react';
import { BsWind } from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
import { TbTemperature } from 'react-icons/tb';



function App() {
  // connection to api for location search
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=72fd74bac248eeb35c639ebdfd046704`




  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        ></input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p> {data.main.feels_like.toFixed()} °F</p> : null}
              <p className="icons"><TbTemperature size={40} /></p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p className="icons"><WiHumidity size={40} /></p>
            </div>
            <div className="wind">
              {data.main ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p className="icons"><BsWind size={40} /></p>
            </div>
          </div>
        }

      </div>



    </div >
  );
}

export default App;
