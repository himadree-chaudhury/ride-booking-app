import Heading from "@/components/modules/common/Heading";

const Contact = () => {
  return (
    <div>
      <Heading
        title={"CONTACT"}
        heading={"Contact With Us"}
        description={"Get in touch with our team for any inquiries or support."}
      />

      <div className="grid gap-12 md:grid-cols-2">
        {/* Contact Form */}
        <form className="rounded-2xl  p-8 shadow-md">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
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

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 *:border *:p-3 *:rounded-2xl *:shadow-md">
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
