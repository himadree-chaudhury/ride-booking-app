import Heading from "@/components/modules/common/Heading";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div>
      <title>Contact | Cabsy</title>
      <Heading
        title={"CONTACT"}
        heading={"Contact With Us"}
        description={"Get in touch with our team for any inquiries or support."}
      />

      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <form className="rounded-2xl p-8 shadow-md">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="jon@example.com"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            ></textarea>
          </div>

          <Button className="w-full">Send Message</Button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 *:rounded-2xl *:border *:p-3 *:shadow-md">
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="">support@cabsy.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Phone</h3>
            <p className="">+880 1234 567 890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Address</h3>
            <p className="">123 Main Street, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
