// Interface for location data from Nominatim API
interface LocationData {
  display_name: string;
  lat: string;
  lon: string;
}

// Function to get location name from coordinates
export const getLocationName = async (
  lat: number,
  lon: number,
): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data: LocationData = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error fetching location:", error);
    return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  }
};
