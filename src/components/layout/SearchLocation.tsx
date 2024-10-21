import { useDebounce } from '@/hooks/useDebounce';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../common/CommandElement';

function SearchLocation() {
  const [debouncedQuery, query, setQuery] = useDebounce<string>('', 1000);
  const [inputFocused, setInputFocused] = useState(false);

  const { locations, isLoading, error } = useLocationSearch(
    debouncedQuery,
    inputFocused
  );

  const handleSelectLocation = (locationName: string) => {
    setQuery(locationName);
    setInputFocused(false);
  };

  return (
    <Command className=''>
      <CommandInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setTimeout(() => setInputFocused(false), 200)}
        placeholder='Search for a location...'
      />

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
                    className='cursor-pointer w-full'
                    onClick={() => handleSelectLocation(location.display_name)}
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
