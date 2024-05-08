import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';
import { City } from 'country-state-city';
import { useInView } from 'react-intersection-observer';

interface City {
  name: string;
  stateCode: string;
}

interface Props {
  selectedCountry: string;
  onValueChange: (city: string) => void;
}

const loadCount: number = 10;

export const InfiniteScrollSelect: React.FC<Props> = ({ selectedCountry, onValueChange }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView();

  const loadMoreCities = () => {
    if (hasMore) {
      const nextCities =
        City.getCitiesOfCountry(selectedCountry)?.slice(cities.length, cities.length + loadCount) ||
        [];
      if (nextCities.length === 0) {
        setHasMore(false);
      } else {
        setCities((prevCities) => [...prevCities, ...nextCities]);
      }
    }
  };

  const handleCityChange = useCallback(
    (city: string) => {
      onValueChange(city);
    },
    [onValueChange]
  );

  useEffect(() => {
    const initialCities = City.getCitiesOfCountry(selectedCountry)?.slice(0, 10) || [];
    setCities(initialCities);
    setHasMore(true);
  }, [selectedCountry]);

  useEffect(() => {
    if (inView) {
      loadMoreCities();
    }
  }, [inView, loadMoreCities]);

  return (
    <Select onValueChange={handleCityChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select City" />
      </SelectTrigger>
      <SelectContent ref={contentRef} className="max-h-56 overflow-y-auto">
        <SelectGroup>
          <SelectLabel className="capitalize">{selectedCountry} Cities</SelectLabel>
          {cities.map((c, index) => (
            <SelectItem key={c.name + c.stateCode} value={`${c.stateCode} - ${c.name}`}>
              {c.stateCode} - {c.name}
            </SelectItem>
          ))}
          <div ref={ref} />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
