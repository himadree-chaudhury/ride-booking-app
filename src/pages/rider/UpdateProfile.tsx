import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user.api";
import type { IResponseError } from "@/types/error-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// * Update form validation using Zod
const updateSchema = z.object({
  name: z
    .string("Please enter your name")
    .max(100, "Name must be at most 100 characters long")
    .optional(),
  phone: z.string("Please enter a valid phone number").optional(),
  picture: z
    .url("Please enter a valid picture URL")
    .optional()
    .or(z.literal("")),
});

export function UpdateProfile({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetUserQuery(undefined);
  const user = data?.data;
  const navigate = useNavigate();
  
  // *Form type check-up via Zod & setting default values
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      picture: user?.picture,
    },
  });


  // *Form submission handler
  const onSubmit = async (data: z.infer<typeof updateSchema>) => {
    const toastId = toast.loading("Updating user...");
    const userInfo = {
      name: data.name,
      phone: data.phone,
      picture: data.picture,
    };

    try {
      await updateUser(userInfo);
      toast.success("User updated successfully", { id: toastId });
      navigate("/rider/profile");
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  return (
    <div
      className={cn("mx-auto flex max-w-sm flex-col gap-6", className)}
      {...props}
    >
      {!user.isVerified ? (
        <p className="text-destructive text-center text-sm">
          Your profile is not verified. Please verify your profile to continue.
        </p>
      ) : (
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="123-456-7890" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/profile.jpg"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>

      <div className="text-center text-sm">
        {!user.isVerified ? "Want to get verified?" : "Already updated?"}{" "}
        {!user.isVerified ? (
          <Link
            to="/rider/profile/verify"
            className="underline underline-offset-4"
          >
            Get Verified
          </Link>
        ) : (
          <Link to="/rider/profile" className="underline underline-offset-4">
            Visit Profile
          </Link>
        )}
      </div>
    </div>
  );
}
