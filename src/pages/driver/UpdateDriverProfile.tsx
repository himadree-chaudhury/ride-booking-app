import LoadingSpinner from "@/components/layout/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  useGetDriverQuery,
  useUpdateDriverMutation,
} from "@/redux/features/driver.api";
import type { IDriver, IDriverRegistration } from "@/types/driver-type";
import type { IResponseError } from "@/types/error-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// * Update form validation using Zod
const driverUpdateSchema = z.object({
  vehicleInfo: z
    .object({
      model: z
        .string("Please enter the vehicle model")
        .min(1, "Vehicle model cannot be empty")
        .optional(),
      registrationNumber: z
        .string("Please enter the vehicle registration number")
        .min(1, "Vehicle registration number cannot be empty")
        .optional(),
      year: z
        .string("Please enter the vehicle year")
        .refine((val) => {
          const year = Number(val);
          return !isNaN(year) && year >= 2001;
        }, "Year must be 2001 or later")
        .optional(),
      maxPassengers: z
        .string("Please enter the maximum number of passengers")
        .refine((val) => {
          const passengers = Number(val);
          return !isNaN(passengers) && passengers >= 1;
        }, "Max passengers must be at least 1")
        .optional(),
    })
    .optional(),
  driverLicense: z
    .object({
      number: z
        .string("Please enter the driver license number")
        .min(1, "Driver license number cannot be empty")
        .optional(),
      expirationDate: z
        .date({
          message: "Please enter a valid expiration date",
        })
        .optional(),
    })
    .optional(),
  currentLocation: z
    .object({
      latitude: z
        .string("Please enter a valid latitude")
        .refine(
          (val) =>
            !isNaN(Number(val)) && Number(val) >= -90 && Number(val) <= 90,
          {
            message: "Latitude must be between -90 and 90",
          },
        )
        .optional(),
      longitude: z
        .string("Please enter a valid longitude")
        .refine(
          (val) =>
            !isNaN(Number(val)) && Number(val) >= -180 && Number(val) <= 180,
          {
            message: "Longitude must be between -180 and 180",
          },
        )
        .optional(),
    })
    .optional(),
});

export function UpdateDriverProfile({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [updateDriver] = useUpdateDriverMutation();
  const { data, isLoading } = useGetDriverQuery(undefined);
  const driver: IDriver = data?.data;
  const navigate = useNavigate();

  // *Form type check-up via Zod & setting default values
  const form = useForm<z.infer<typeof driverUpdateSchema>>({
    resolver: zodResolver(driverUpdateSchema),
    defaultValues: {
      vehicleInfo: {
        model: "",
        registrationNumber: "",
        year: "",
        maxPassengers: "",
      },
      driverLicense: {
        number: "",
        expirationDate: undefined,
      },
      currentLocation: {
        latitude: "",
        longitude: "",
      },
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (driver) {
      reset({
        vehicleInfo: {
          model: driver.vehicleInfo?.model ?? "",
          registrationNumber: driver.vehicleInfo?.registrationNumber ?? "",
          year: driver.vehicleInfo?.year ? String(driver.vehicleInfo.year) : "",
          maxPassengers: driver.vehicleInfo?.maxPassengers
            ? String(driver.vehicleInfo.maxPassengers)
            : "",
        },
        driverLicense: {
          number: driver.driverLicense?.number ?? "",
          expirationDate: driver.driverLicense?.expirationDate
            ? new Date(driver.driverLicense.expirationDate)
            : undefined,
        },
        currentLocation: {
          latitude: driver.currentLocation?.latitude
            ? String(driver.currentLocation.latitude)
            : "",
          longitude: driver.currentLocation?.longitude
            ? String(driver.currentLocation.longitude)
            : "",
        },
      });
    }
  }, [driver, reset]);

  const setCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // update react-hook-form values
        form.setValue("currentLocation.latitude", latitude.toString());
        form.setValue("currentLocation.longitude", longitude.toString());
        toast.success("Current location detected");
      },
      (err) => {
        toast.error("Failed to fetch location: " + err.message);
      },
    );
  };

  // *Form submission handler
  const onSubmit = async (data: z.infer<typeof driverUpdateSchema>) => {
    const toastId = toast.loading("Creating driver...");
    const driverInfo: IDriverRegistration = {
      vehicleInfo: {
        model: data?.vehicleInfo?.model || driver?.vehicleInfo.model,
        registrationNumber:
          data?.vehicleInfo?.registrationNumber ||
          driver?.vehicleInfo.registrationNumber,
        year: Number(data?.vehicleInfo?.year) || driver?.vehicleInfo.year,
        maxPassengers:
          Number(data?.vehicleInfo?.maxPassengers) ||
          driver?.vehicleInfo.maxPassengers,
      },
      driverLicense: {
        number: data?.driverLicense?.number || driver?.driverLicense.number,
        expirationDate: data?.driverLicense?.expirationDate
          ? formatISO(data.driverLicense.expirationDate)
          : driver?.driverLicense?.expirationDate
            ? formatISO(driver.driverLicense.expirationDate)
            : "",
      },
      currentLocation: {
        latitude:
          Number(data?.currentLocation?.latitude) ||
          driver?.currentLocation.latitude,
        longitude:
          Number(data?.currentLocation?.longitude) ||
          driver?.currentLocation.longitude,
      },
    };
    try {
      const response = await updateDriver(driverInfo).unwrap();
      if (response.success) {
        toast.success("Driver information updated successfully", {
          id: toastId,
        });
        navigate("/driver/driver-profile");
      }
    } catch (error: unknown) {
      const err = (error as unknown as { data: IResponseError }).data;
      toast.error(`${err.status}: ${err.message}`, { id: toastId });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div
      className={cn("mx-auto flex max-w-sm flex-col gap-6", className)}
      {...props}
    >
      <div className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="*:border-border space-y-6 *:space-y-6 *:rounded-md *:border-2 *:p-4"
          >
            <section>
              <FormField
                control={form.control}
                name="vehicleInfo.model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Toyota Camry" {...field} />
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
                name="vehicleInfo.registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC1234" {...field} />
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
                name="vehicleInfo.year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2020" type="number" {...field} />
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
                name="vehicleInfo.maxPassengers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Passengers</FormLabel>
                    <FormControl>
                      <Input placeholder="4" type="number" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section>
              <FormField
                control={form.control}
                name="driverLicense.number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="D1234567" {...field} />
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
                name="driverLicense.expirationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Driver License Expiration Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field?.value ? (
                              format(field?.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription className="sr-only">
                      Enter your latest & valid driver's license expiration
                      date.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="currentLocation.latitude"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Current Location Latitude</FormLabel>
                      <FormControl>
                        <Input placeholder="37.7749" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentLocation.longitude"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Current Location Longitude</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="-122.4194"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={setCurrentLocation}
                  className="w-fit"
                >
                  Use Current Location
                </Button>
              </div>
            </section>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>

      <div className="text-center text-sm">
        Already Updated?{" "}
        <Link
          to="/driver/driver-profile"
          className="underline underline-offset-4"
        >
          Visit Driver Profile
        </Link>
      </div>
    </div>
  );
}
