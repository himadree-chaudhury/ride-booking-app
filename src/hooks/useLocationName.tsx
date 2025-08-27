import { useEffect, useState } from "react";
import { getLocationName } from "@/utils/location";

export function useLocationName(lat?: number, lon?: number) {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (!lat || !lon) return;

    let mounted = true;

    getLocationName(lat, lon).then((res) => {
      if (mounted) setName(res);
    });

    return () => {
      mounted = false;
    };
  }, [lat, lon]);

  return name;
}
