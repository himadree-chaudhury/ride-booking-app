import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  useAddEmergencyContactMutation,
  useGetUserQuery,
  useRemoveEmergencyContactMutation,
  useUpdateEmergencyContactMutation,
} from "@/redux/features/user.api";
import type { IResponseError } from "@/types/error-type";
import type { IContact } from "@/types/user-type";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useToast } from "@/components/ui/use-toast";
import { Shield, User, X } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// * Contact form validation using Zod
const contactSchema = z.object({
  name: z
    .string("Please enter a name")
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  phone: z
    .string("Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long"),
});

const SetupContact = () => {
  const { data } = useGetUserQuery(undefined);
  const [addEmergencyContact] = useAddEmergencyContactMutation();
  const [removeEmergencyContact] = useRemoveEmergencyContactMutation();
  const [updateEmergencyContact] = useUpdateEmergencyContactMutation();
  const emergencyContacts: IContact[] = data?.data?.sosContacts || [];

  // *Add new emergency contact
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Adding contact...");
    try {
      const response = await addEmergencyContact(data).unwrap();
      toast.success("Contact added successfully", {
        id: toastId,
        description: `${response.name} has been added to your emergency contacts.`,
      });
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  // *Remove emergency contact
  const handleRemoveEmergencyContact = async (id: string) => {
    const toastId = toast.loading("Removing contact...");
    try {
      await removeEmergencyContact(id).unwrap();
      toast.success("Contact removed successfully", {
        id: toastId,
        description: `The contact has been removed from your emergency contacts.`,
      });
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  // *Set primary contact
  const handleSetPrimaryContact = async (id: string) => {
    const toastId = toast.loading("Setting primary contact...");
    try {
      await updateEmergencyContact(id).unwrap();
      toast.success("Primary Contact Updated", {
        id: toastId,
        description: "Your primary emergency contact has been updated.",
      });
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  return (
      <div className="mx-auto max-w-2xl">
          <title>Emergency Contacts | Cabsy</title>
      <p className="text-muted-foreground mb-4 text-sm">
        Emergency contacts are essential in critical situations. These contacts
        will be notified in case of an emergency. But they can only be accessed
        when you are on a <strong>Ride</strong> that is in either the{" "}
        <em>Pickup</em> or <em>In-Transit</em> state.
      </p>
      <div className="grid gap-4">
        {/* Add New Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Add Contact
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Existing Contacts */}
        <Card>
          <CardHeader className="flex items-center">
            <Shield className="mr-2 h-7 w-7" />
            <div>
              <CardTitle>Your Emergency Contacts</CardTitle>
              <CardDescription>
                {emergencyContacts.length} contacts saved
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center">
                No emergency contacts added yet.
              </p>
            ) : (
              emergencyContacts.map((contact) => (
                <div
                  key={contact._id}
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
                        checked={contact?.isPrimary}
                        onCheckedChange={() =>
                          handleSetPrimaryContact(contact._id)
                        }
                      />
                      <span className="text-sm">Primary</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveEmergencyContact(contact._id)}
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
    </div>
  );
};
export default SetupContact;
