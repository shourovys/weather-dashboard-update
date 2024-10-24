import { useDebounce } from '@/hooks/useDebounce';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useWeather } from '@/hooks/useWeather';
import { ILocation } from '@/types/location';
import { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../common/CommandElements';
import SaveLocation from './SaveLocation';

function SearchLocation() {
  const {
    location: currentSelectedLocation,
    setLocation,
    savedLocationsData,
  } = useWeather();
  const [debouncedQuery, query, setQuery] = useDebounce<string>('', 1000);
  const [inputFocused, setInputFocused] = useState(false);

  const initLocations: ILocation[] | undefined = savedLocationsData
    ?.slice(0, 6)
    .filter(
      (location) => location.place_id !== currentSelectedLocation?.place_id
    )
    ?.map(({ display_name, place_id, lat, lon }) => ({
      display_name,
      place_id,
      lat,
      lon,
    }));

  const { locations, isLoading, error } = useLocationSearch(
    debouncedQuery,
    inputFocused,
    initLocations
  );

  const handleSelectLocation = (location: ILocation) => {
    setLocation(location);
    setQuery(location.display_name);
    setInputFocused(false);
  };

  useEffect(() => {
    setQuery(currentSelectedLocation?.display_name || '');
  }, [currentSelectedLocation]);

  return (
    <Command className=''>
      <div className='flex items-center justify-between w-full'>
        <CommandInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 200)}
          placeholder='Search for a location...'
        />
        <SaveLocation />
      </div>

      {inputFocused && (
        <CommandList>
          {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
          {error && <CommandEmpty>{error}</CommandEmpty>}
          {!isLoading && locations.length === 0 && query && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {!isLoading && locations.length > 0 && (
            <CommandGroup heading='Suggestions'>
              {locations.map((location) => (
                <CommandItem key={location.place_id}>
                  <span
                    className='cursor-pointer w-full h-full px-2 py-1.5 '
                    onClick={() => handleSelectLocation(location)}
                  >
                    {location.display_name}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
}

export default SearchLocation;
