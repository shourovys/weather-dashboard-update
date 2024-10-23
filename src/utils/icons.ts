import { GitHubLogoIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  CloudSunRain,
  Command,
  Logs,
  Map,
  SlidersHorizontal,
  User,
} from 'lucide-react';

export const WeatherIcon = CloudSunRain;
export const CityIcon = Logs;
export const MapIcon = Map;
export const SettingsIcon = SlidersHorizontal;
export const ProfileIcon = User;

export const CommandIcon = Command;
export const SearchIcon = MagnifyingGlassIcon;

export const GitHubIcon = GitHubLogoIcon;

export type IconType = typeof WeatherIcon;
