const getWeatherBG = (weatherMain: string) => {
  switch (weatherMain) {
    case 'Drizzle':
      return '/images/bg/drizzle.webp';
    case 'Rain':
      return '/images/bg/rain.webp';
    case 'Snow':
      return '/images/bg/snow.webp';
    case 'Clear':
      return '/images/bg/clear.webp';
    case 'Clouds':
      return '/images/bg/cloudy.webp';
    default:
      return '/images/bg/clear.webp';
  }
};

export default getWeatherBG;
