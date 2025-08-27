import { getLocationName } from "@/utils/location";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

// Component to display a location with loading state
const LocationDisplay = ({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) => {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      try {
        const name = await getLocationName(lat, lng);
        setLocationName(name);
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocationName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, [lat, lng]);

  return (
    <div className="flex items-center gap-3">
      <MapPin className="text-muted-foreground h-5 w-5" />
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        {isLoading ? (
          <p className="text-muted-foreground font-medium">
            Loading address...
          </p>
        ) : (
          <p className="font-medium">{locationName}</p>
        )}
      </div>
    </div>
  );
};

export default LocationDisplay;
