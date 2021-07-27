import ReactWeather, { useOpenWeather } from 'react-open-weather';

const WeatherApp = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '08390fc393d2276544338b99e9e9b235',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric',
  });
  return (
    <div     style={{
      width: '40%'
    }}>
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    /></div>
  );
};

export default WeatherApp;