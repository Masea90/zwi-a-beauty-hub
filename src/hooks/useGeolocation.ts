import { useState, useCallback } from 'react';

interface GeolocationResult {
  country: string;
  climateType: string;
}

// Map latitude to climate type (simplified)
function getClimateFromLatitude(lat: number): string {
  const absLat = Math.abs(lat);
  
  if (absLat <= 10) return 'tropical';
  if (absLat <= 23.5) return 'tropical';
  if (absLat <= 35) return 'mediterranean';
  if (absLat <= 50) return 'temperate';
  if (absLat <= 60) return 'continental';
  return 'continental';
}

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = useCallback(async (): Promise<GeolocationResult | null> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setError('Geolocation not supported');
        setIsLoading(false);
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Use a free reverse geocoding API
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            
            if (!response.ok) throw new Error('Geocoding failed');
            
            const data = await response.json();
            const country = data.countryName || '';
            const climateType = getClimateFromLatitude(latitude);
            
            setIsLoading(false);
            resolve({ country, climateType });
          } catch (err) {
            // Fallback: just use climate from latitude
            const climateType = getClimateFromLatitude(latitude);
            setIsLoading(false);
            resolve({ country: '', climateType });
          }
        },
        (err) => {
          let errorMessage = 'Failed to get location';
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage = 'Location unavailable';
              break;
            case err.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          setError(errorMessage);
          setIsLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 600000, // Cache for 10 minutes
        }
      );
    });
  }, []);

  return { detectLocation, isLoading, error };
}
