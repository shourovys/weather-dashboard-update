import {
  ClearSkyIcon,
  CloudyIcon,
  DrizzleIcon,
  RainIcon,
  SnowIcon,
} from '@/utils/icons';

const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain) {
    case 'Drizzle':
      return DrizzleIcon;
    case 'Rain':
      return RainIcon;
    case 'Snow':
      return SnowIcon;
    case 'Clear':
      return ClearSkyIcon;
    case 'Clouds':
      return CloudyIcon;
    default:
      return ClearSkyIcon;
  }
};

export default getWeatherIcon;
