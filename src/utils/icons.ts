import { GitHubLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  CalendarDays,
  CloudDrizzle,
  CloudRain,
  CloudSun,
  CloudSunRain,
  Cloudy,
  Command,
  Droplets,
  Eye,
  Gauge,
  Logs,
  Map,
  Navigation,
  SlidersHorizontal,
  Snowflake,
  SunDim,
  Sunset,
  Thermometer,
  ThermometerSun,
  User,
  UsersRound,
  Wind,
} from 'lucide-react';

export const WeatherIcon = CloudSunRain;
export const CityIcon = Logs;
export const MapIcon = Map;
export const SettingsIcon = SlidersHorizontal;
export const ProfileIcon = User;

export const CommandIcon = Command;
export const SearchIcon = MagnifyingGlassIcon;

export const GitHubIcon = GitHubLogoIcon;

export const DrizzleIcon = CloudDrizzle;
export const RainIcon = CloudRain;
export const SnowIcon = Snowflake;
export const ClearSkyIcon = CloudSun;
export const CloudyIcon = Cloudy;
export const NavigationIcon = Navigation;
export const ThermoIcon = ThermometerSun;
export const SunsetIcon = Sunset;
export const WindIcon = Wind;
export const GaugeIcon = Gauge;
export const DropletsIcon = Droplets;
export const ThermometerIcon = Thermometer;
export const EyeIcon = Eye;
export const PeopleIcon = UsersRound;
export const CalenderIcon = CalendarDays;
export const SunIcon = SunDim;

export type IconType = typeof WeatherIcon;
