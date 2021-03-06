import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import './App.css';
import Weather from './components/Weather';

const App = () => {
  const [lat, setLat] = React.useState([]);
  const [long, setLong] = React.useState([]);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      try {
        await fetch(
          `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            console.log(result);
          });
      } catch (err) {
        throw new Error(err.message);
      }
    };
    fetchData();
  }, [lat, long]);

  return (
    <div className='App'>
      {typeof data.main != 'undefined' ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
};

export default App;
