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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
import { getLocationName } from "@/utils/location";
import {
  AlertTriangle,
  MapPin,
  MessageCircle,
  Phone,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

// Emergency contacts type
interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  isPrimary: boolean;
}

const Emergency = () => {
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [pickupLocationName, setPickupLocationName] = useState<string>("");
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<
    EmergencyContact[]
  >([
    {
      id: "1",
      name: "Emergency Contact 1",
      phone: "+1234567890",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Emergency Contact 2",
      phone: "+0987654321",
      isPrimary: false,
    },
  ]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  // Get current location
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

  // Get location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Call emergency number
  const callEmergencyNumber = (number: string) => {
    window.open(`tel:${number}`, "_self");
    toast.loading("Calling Emergency Services", {
      description: `Connecting to ${number}...`,
    });
  };

  // Send SMS to emergency contact
  const sendEmergencySMS = (contact: EmergencyContact) => {
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
  const shareViaWhatsApp = (contact: EmergencyContact) => {
    const message = `EMERGENCY: I need help! I am at ${pickupLocationName}. My current location is: ${currentLocation ? `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}` : "Unknown location"}`;
    window.open(
      `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    toast.success("WhatsApp Message Sent", {
      description: `Location shared with ${contact.name} via WhatsApp.`,
    });
  };

  // Add new emergency contact
  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        isPrimary: emergencyContacts.length === 0,
      };
      setEmergencyContacts([...emergencyContacts, contact]);
      setNewContact({ name: "", phone: "" });
      toast.success("Contact Added", {
        description: `${newContact.name} has been added to your emergency contacts.`,
      });
    }
  };

  // Remove emergency contact
  const removeEmergencyContact = (id: string) => {
    setEmergencyContacts(
      emergencyContacts.filter((contact) => contact.id !== id),
    );
    toast.success("Contact Removed", {
      description: "Emergency contact has been removed.",
    });
  };

  // Set primary contact
  const setPrimaryContact = (id: string) => {
    setEmergencyContacts(
      emergencyContacts.map((contact) => ({
        ...contact,
        isPrimary: contact.id === id,
      })),
    );
    toast.success("Primary Contact Updated", {
      description: "Your primary emergency contact has been updated.",
    });
  };

  return (
    <>
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
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {contact.phone}
                      </p>
                      {contact.isPrimary && (
                        <Badge variant="outline" className="mt-1">
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
                      <span className="font-medium">Location:</span> {pickupLocationName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Latitude:</span> {currentLocation.lat.toFixed(6)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Longitude:</span> {currentLocation.lng.toFixed(6)}
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
            <Button onClick={() => setIsSettingsOpen(true)} variant="secondary">
              <Settings className="mr-2 h-4 w-4" />
              Manage Contacts
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Contacts Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Emergency Contacts Settings
            </DialogTitle>
            <DialogDescription>
              Manage your emergency contacts. These contacts will be notified in
              case of an emergency.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Add New Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Contact Name"
                      value={newContact.name}
                      onChange={(e) =>
                        setNewContact({ ...newContact, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1234567890"
                      value={newContact.phone}
                      onChange={(e) =>
                        setNewContact({ ...newContact, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={addEmergencyContact}
                  disabled={!newContact.name || !newContact.phone}
                >
                  Add Contact
                </Button>
              </CardContent>
            </Card>

            {/* Existing Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Your Emergency Contacts</CardTitle>
                <CardDescription>
                  {emergencyContacts.length} contacts saved
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.length === 0 ? (
                  <p className="text-muted-foreground py-4 text-center">
                    No emergency contacts added yet.
                  </p>
                ) : (
                  emergencyContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 rounded-full p-2">
                          <User className="text-primary h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Switch
                            checked={contact.isPrimary}
                            onCheckedChange={() =>
                              setPrimaryContact(contact.id)
                            }
                          />
                          <span className="text-sm">Primary</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEmergencyContact(contact.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setIsSettingsOpen(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Emergency;
