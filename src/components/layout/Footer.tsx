import WebTitle from "@/assets/icons/logo.svg";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  // *Current Year For The Copyright Notice
  const currentYear = new Date().getFullYear();

  return (
    <div className="section-layout container">
      {/* Top Section With Logo And Social Media Links */}
      <div className="sm:flex-centric py-5 sm:justify-between">
        <div className="flex-centric mb-3 gap-3 sm:mb-0">
          <img src={WebTitle} alt="Cabsy" />
          <h3>Cabsy</h3>
        </div>
        <div className="flex-centric space-x-4 transition-colors duration-100">
          {/* Social Media Links */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>

      {/* Middle Section With Footer Links */}
      <div className="font-footer grid grid-cols-1 gap-6 px-5 text-sm md:grid-cols-2 md:px-0 lg:grid-cols-4">
        {/* Company Section */}
        <div>
          <h3 className="mb-3 font-semibold">Company</h3>
          <ul className="space-y-2">
            {/* Map Through Company-Related Links */}
            {[
              "About",
              "Jobs",
              "List your property",
              "Partnerships",
              "Newsroom",
              "Investor Relations",
              "Advertising",
              "Affiliate Marketing",
              "Feedback",
            ].map((item) => (
              <li key={item} className="cursor-pointer hover:underline">
                <Link to={item}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore Section */}
        <div>
          <h3 className="mb-3 font-semibold">Explore</h3>
          <ul className="space-y-2">
            {/* Map Through Explore-Related Links */}
            {[
              "United States of America travel guide",
              "Hotels in United States of America",
              "Vacation rentals in United States of America",
              "Vacation packages in United States of America",
              "Domestic flights",
              "Car rentals in United States of America",
              "All accommodation types",
              "One Key credit cards",
            ].map((item) => (
              <li key={item} className="cursor-pointer hover:underline">
                <Link to={item}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="mb-3 font-semibold">Policies</h3>
          <ul className="space-y-2">
            {/* Map Through Policy-Related Links */}
            {[
              "Privacy",
              "Cookies",
              "Terms of use",
              "One Key™ terms and conditions",
              "Terms and conditions",
              "Accessibility",
              "Your privacy choices",
              "Content guidelines and reporting content",
            ].map((item) => (
              <li key={item} className="cursor-pointer hover:underline">
                <Link to={item}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="mb-3 font-semibold">Help</h3>
          <ul className="space-y-2">
            {/* Map Through Help-Related Links */}
            {[
              "Support",
              "Cancel your rental booking",
              "Delete your profile",
              "Refund basics",
              "Use an Cabsy coupon",
              "International travel documents",
            ].map((item) => (
              <li key={item} className="cursor-pointer hover:underline">
                <Link to={item}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="font-credit mt-10 border-t pt-4 text-center text-xs">
        {/* Copyright Notice */}
        <p>&copy; {currentYear} Cabsy Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
