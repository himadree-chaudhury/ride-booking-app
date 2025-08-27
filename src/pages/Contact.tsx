import Heading from "@/components/modules/common/Heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactMutation } from "@/redux/features/user.api";
import type { IResponseError } from "@/types/error-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

const Contact = () => {
  const [contact] = useContactMutation();
  // Initialize form with react-hook-form and Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Simulate form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Sending message...");
    try {
      const response = await contact(data).unwrap();
      if (response?.success) {
        toast.success("Message sent successfully!", { id: toastId });
        form.reset(); // Reset form after successful submission
      }
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  return (
    <div className="container mx-auto">
      <title>Contact | Cabsy</title>
      <Heading
        title="CONTACT"
        heading="Contact With Us"
        description="Get in touch with our team for any inquiries or support."
      />

      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-background rounded-2xl p-8 shadow-md"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write your message..."
                      className="rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <Card className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Mail className="text-muted-foreground h-5 w-5" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">support@cabsy.com</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <Phone className="text-muted-foreground h-5 w-5" />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">+880 1234 567 890</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center gap-3">
              <MapPin className="text-muted-foreground h-5 w-5" />
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                123 Main Street, Dhaka, Bangladesh
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
