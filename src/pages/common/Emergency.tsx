import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
import { useGetUserQuery } from "@/redux/features/user.api";
import type { IContact } from "@/types/user-type";
import { getLocationName } from "@/utils/location";
import {
  AlertTriangle,
  MapPin,
  MessageCircle,
  Phone,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";
const Emergency = () => {
  const { data } = useGetUserQuery(undefined);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pickupLocationName, setPickupLocationName] = useState<string>("");
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  // *Get current location
  const getCurrentLocation = () => {
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocationLoading(false);
          toast.success("Location Updated", {
            description: "Your current location has been retrieved.",
          });
          try {
            const [pickupName] = await Promise.all([
              getLocationName(
                position.coords.latitude,
                position.coords.longitude,
              ),
            ]);

            setPickupLocationName(pickupName);
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocationLoading(false);
          toast.error("Location Error", {
            description:
              "Could not retrieve your location. Please check permissions.",
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      );
    } else {
      setIsLocationLoading(false);
      toast.error("Geolocation Not Supported", {
        description: "Your browser doesn't support geolocation.",
      });
    }
  };

  // *Get location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // *Call emergency number
  const callEmergencyNumber = (number: string) => {
    window.open(`tel:${number}`, "_self");
    toast.loading("Calling Emergency Services", {
      description: `Connecting to ${number}...`,
    });
  };

  // *Send SMS to emergency contact
  const sendEmergencySMS = (contact: IContact) => {
    const message = `EMERGENCY: I need help! I am at ${pickupLocationName}. My current location is: ${currentLocation ? `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}` : "Unknown location"}`;
    window.open(
      `sms:${contact.phone}?body=${encodeURIComponent(message)}`,
      "_self",
    );
    toast.success("SMS Sent", {
      description: `Emergency message sent to ${contact.name}.`,
    });
  };

  // Share location via WhatsApp
  const shareViaWhatsApp = (contact: IContact) => {
    const message = `EMERGENCY: I need help! I am at ${pickupLocationName}. My current location is: ${currentLocation ? `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}` : "Unknown location"}`;
    window.open(
      `https://wa.me/${contact?.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    toast.success("WhatsApp Message Sent", {
      description: `Location shared with ${contact?.name} via WhatsApp.`,
    });
  };

  return (
    <>
      {/* SOS Floating Button - Only visible during active ride */}
      <div className="fixed right-6 bottom-6 z-50">
        <Button
          onClick={() => setIsSOSModalOpen(true)}
          className="h-16 w-16 animate-pulse rounded-full bg-red-600 shadow-lg hover:bg-red-700"
        >
          <Shield className="h-8 w-8" />
        </Button>
      </div>

      {/* SOS Modal */}
      <Dialog open={isSOSModalOpen} onOpenChange={setIsSOSModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Emergency Assistance
            </DialogTitle>
            <DialogDescription>
              Please select an emergency option. Your location will be shared
              with the selected contact.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Call Police */}
            <Card className="border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Phone className="mr-2 h-5 w-5 text-red-600" />
                  Call Emergency Services
                </CardTitle>
                <CardDescription>
                  Immediately call local emergency services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => callEmergencyNumber("911")}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call 911
                </Button>
              </CardContent>
            </Card>

            {/* Notify Emergency Contacts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <User className="mr-2 h-5 w-5" />
                  Notify Emergency Contacts
                </CardTitle>
                <CardDescription>
                  Send your location to your emergency contacts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {data?.data?.sosContacts?.map((contact: IContact) => (
                  <div
                    key={contact._id}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {contact.phone}
                      </p>
                      {contact.isPrimary && (
                        <Badge variant="build" className="mt-1">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendEmergencySMS(contact)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareViaWhatsApp(contact)}
                      >
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Location Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MapPin className="mr-2 h-5 w-5" />
                  Your Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentLocation ? (
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Location:</span>{" "}
                      {pickupLocationName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Latitude:</span>{" "}
                      {currentLocation.lat.toFixed(6)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Longitude:</span>{" "}
                      {currentLocation.lng.toFixed(6)}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={getCurrentLocation}
                      disabled={isLocationLoading}
                    >
                      {isLocationLoading ? "Updating..." : "Refresh Location"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">
                      Location not available. Please enable location services.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={getCurrentLocation}
                      disabled={isLocationLoading}
                    >
                      {isLocationLoading
                        ? "Getting Location..."
                        : "Get Location"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsSOSModalOpen(false)}>
              Cancel
            </Button>
            <Button asChild variant="secondary">
              <Link
                to={`/${data?.data?.role && data?.data?.role.toLowerCase()}/sos-contact`}
                className="flex items-center"
              >
                <Settings className="mr-2 h-4 w-4" />
                Manage Contacts
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Emergency;
