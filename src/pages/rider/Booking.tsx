import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import envConfig from "@/config/env";
import { useRequestRideMutation } from "@/redux/features/ride.api";
import type { IResponseError } from "@/types/error-type";
import type { IRide } from "@/types/ride-type";
import axios from "axios";
import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { toast } from "sonner";
import z from "zod";
import Confirmation from "./Confirmation";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Interface for Nominatim result
interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  boundingbox?: [string, string, string, string];
}

// Props for Autocomplete component
interface AutocompleteProps {
  onPlaceSelect: (place: NominatimResult | null) => void;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

// Autocomplete component for pickup and destination
const PlaceAutocomplete: React.FC<AutocompleteProps> = ({
  onPlaceSelect,
  placeholder,
  value,
  onChange,
}) => {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [hasSelected, setHasSelected] = useState(false); // track manual select
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value || hasSelected) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value,
          )}&limit=5&email=your@email.com`,
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [value, hasSelected]);

  const handleSelect = (place: NominatimResult) => {
    onPlaceSelect(place);
    onChange(place.display_name);
    setSuggestions([]);
    setHasSelected(true); // prevent re-fetch
  };

  const handleChange = (val: string) => {
    setHasSelected(false); // reset if user types again
    onChange(val);
  };

  return (
    <div className="relative mb-2 w-full">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 p-2"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-muted">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="cursor-pointer p-2 hover:bg-background"
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Component to handle map clicks and bounds updates
interface MapHandlerProps {
  pickup: NominatimResult | null;
  destination: NominatimResult | null;
  setPickup: (place: NominatimResult | null) => void;
  setDestination: (place: NominatimResult | null) => void;
  setPickupQuery: (query: string) => void;
  setDestinationQuery: (query: string) => void;
}

export const MapHandler: React.FC<MapHandlerProps> = ({
  pickup,
  destination,
  setPickup,
  setDestination,
  setPickupQuery,
  setDestinationQuery,
}) => {
  const map = useMap();

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&email=your@email.com`,
        );
        const place: NominatimResult = response.data;
        if (!pickup) {
          setPickup(place);
          setPickupQuery(place.display_name);
        } else if (!destination) {
          setDestination(place);
          setDestinationQuery(place.display_name);
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }
    },
  });

  useEffect(() => {
    if (!map || (!pickup && !destination)) return;

    const bounds = L.latLngBounds([]);
    if (pickup) {
      bounds.extend([parseFloat(pickup.lat), parseFloat(pickup.lon)]);
    }
    if (destination) {
      bounds.extend([parseFloat(destination.lat), parseFloat(destination.lon)]);
    }

    if (pickup || destination) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, pickup, destination]);

  return null;
};

// Component to render route path
interface RouteHandlerProps {
  pickup: NominatimResult | null;
  destination: NominatimResult | null;
}

export const RouteHandler: React.FC<RouteHandlerProps> = ({ pickup, destination }) => {
  const [path, setPath] = useState<L.LatLng[]>([]);

  useEffect(() => {
    if (!pickup || !destination) {
      setPath([]);
      return;
    }

    const fetchRoute = async () => {
      try {
        const response = await axios.get(
          `https://graphhopper.com/api/1/route?point=${pickup.lat},${pickup.lon}&point=${destination.lat},${destination.lon}&vehicle=car&locale=en&points_encoded=false&key=${envConfig.API_KEY}`,
        );

        const paths = response.data.paths;
        if (!paths || paths.length === 0) {
          console.error("No route found");
          setPath([]);
          return;
        }

        const coordinates = paths[0].points.coordinates;
        setPath(
          coordinates.map(([lon, lat]: [number, number]) => L.latLng(lat, lon)),
        );
      } catch (error: any) {
        console.error("Error fetching route:", error.response?.data || error);
        setPath([]);
      }
    };

    fetchRoute();
  }, [pickup, destination]);

  return path.length > 0 ? <Polyline positions={path} color="#0078A6" /> : null;
};

// *Schema to validate pickup & destination
const RideSchema = z.object({
  pickup: z.object({
    lat: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Invalid pickup latitude"),
    lon: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Invalid pickup longitude"),
  }),
  destination: z.object({
    lat: z
      .string()
      .refine((val) => !isNaN(parseFloat(val)), "Invalid destination latitude"),
    lon: z
      .string()
      .refine(
        (val) => !isNaN(parseFloat(val)),
        "Invalid destination longitude",
      ),
  }),
});

// *Main component
const Booking: React.FC = () => {
  const [pickup, setPickup] = useState<NominatimResult | null>(null);
  const [destination, setDestination] = useState<NominatimResult | null>(null);
  const [pickupQuery, setPickupQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [ride, setRide] = useState<IRide | null>(null);

  const [requestRide, { isLoading }] = useRequestRideMutation();

  // *Ride request handler
  const handleRequestRide = async () => {
    setRide(null);
    const toastId = toast.loading("Requesting ride...");
    try {
      const validated = RideSchema.parse({
        pickup: { lat: pickup?.lat, lon: pickup?.lon },
        destination: { lat: destination?.lat, lon: destination?.lon },
      });

      const rideLocations = {
        pickupLocation: {
          latitude: Number(validated.pickup.lat),
          longitude: Number(validated.pickup.lon),
        },
        destinationLocation: {
          latitude: Number(validated.destination.lat),
          longitude: Number(validated.destination.lon),
        },
      };

      const res = await requestRide(rideLocations).unwrap();
      toast.success("Ride requested successfully", {
        id: toastId,
      });
      setRide(res.data);
    } catch (error: unknown) {
      const err = (
        error as unknown as {
          data: IResponseError;
        }
      ).data;
      console.error("Ride request failed:", err);
      if (err?.message) {
        toast.error(`${err.status}: ${err.message}`, {
          id: toastId,
        });
      } else {
        alert("Please enter valid location values");
      }
    }
  };

  // Set pickup to current location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&email=your@email.com`,
            );
            const place: NominatimResult = response.data;
            setPickup(place);
            setPickupQuery(place.display_name);
          } catch (error) {
            console.error("Error getting current location:", error);
            alert("Failed to get current location. Please enter it manually.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert(
            "Geolocation permission denied. Please enter pickup location manually.",
          );
        },
      );
    } else {
      console.error("Geolocation not supported");
      alert("Geolocation not supported by your browser.");
    }
  }, []);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-center gap-6 p-4">
        <div className="space-y-2">
          <Label>Pickup Location</Label>
          <PlaceAutocomplete
            onPlaceSelect={setPickup}
            placeholder="Enter pickup location"
            value={pickupQuery}
            onChange={setPickupQuery}
          />
        </div>
        <div className="space-y-2">
          <Label>Destination Location</Label>
          <PlaceAutocomplete
            onPlaceSelect={setDestination}
            placeholder="Enter destination location"
            value={destinationQuery}
            onChange={setDestinationQuery}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleRequestRide} disabled={isLoading}>
            {isLoading ? "Requesting..." : "Request Ride"}
          </Button>
        </div>
      </div>

      <section className="h-[300px] w-full">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pickup && (
            <Marker
              position={[parseFloat(pickup.lat), parseFloat(pickup.lon)]}
              title="Pickup Location"
            />
          )}
          {destination && (
            <Marker
              position={[
                parseFloat(destination.lat),
                parseFloat(destination.lon),
              ]}
              title="Destination Location"
            />
          )}
          <MapHandler
            pickup={pickup}
            destination={destination}
            setPickup={setPickup}
            setDestination={setDestination}
            setPickupQuery={setPickupQuery}
            setDestinationQuery={setDestinationQuery}
          />
          <RouteHandler pickup={pickup} destination={destination} />
        </MapContainer>
      </section>

      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          ride && <Confirmation bookingDetails={ride} setRide={setRide} />
        )}
      </div>
    </div>
  );
};

export default Booking;
