import { useDebounce } from '@/hooks/useDebounce';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useWeather } from '@/hooks/useWeather';
import { ILocation } from '@/types/location';
import { useState } from 'react';
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
  const { setLocation } = useWeather();
  const [debouncedQuery, query, setQuery] = useDebounce<string>('', 1000);
  const [inputFocused, setInputFocused] = useState(false);

  const { locations, isLoading, error } = useLocationSearch(
    debouncedQuery,
    inputFocused
  );

  const handleSelectLocation = (location: ILocation) => {
    setLocation(location);
    setQuery(location.display_name);
    setInputFocused(false);
  };

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
