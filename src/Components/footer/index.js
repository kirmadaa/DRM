import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-[#596780] relative border border-t-primary body-font bg-[#FFFCE4]">
      {/* Hello world */}
      <footer>
        <div className="container px-5 pt-24 pb-5 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="text-sm grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
              <Link className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <img
                  src="/web/logo_blue.svg"
                  className="w-32  mb-2 mix-blend-darken"
                  alt="footer logo "
                />
              </Link>
              <div className="flex items-center md:w-[250px] w-full">
                <p className="mt-2 text-sm text-[#596780] font-[200]">
                  A place for your team, industry standards, and concepts With
                  the help of our service, you can easily link to and integrate
                  with your choice CRM to improve data augmentation across
                  networks.
                </p>
              </div>
            </div>
            <div className="w-full px-4 lg:pl-10">
              <h2 className="title-font font-medium text-lg tracking-widest mb-3">
                Quick Links
              </h2>
              <nav className="list-none mb-10  font-[300]">
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/privacy-policy">Privacy Policy</Link>
                </li>
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/terms-and-conditions">Terms & Conditions</Link>
                </li>
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/cookie-policy">Cookie Policy</Link>
                </li>
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/contact-us">Contact Us</Link>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:pl-10 relative z-50">
              <h2 className="title-font font-medium text-lg tracking-widest mb-3">
                Quick Links
              </h2>
              <nav className="list-none mb-10  font-[300]">
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/about-us">About Us</Link>
                </li>
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/feedback">Feedback</Link>
                </li>
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/testimonials">Testimonials</Link>
                </li>
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/notice">Notices</Link>
                </li>
                <li className="my-5  text-sm flex  md:justify-start justify-center">
                  <Link to="/web/career">Career</Link>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:pl-10">
              <h2 className="title-font font-medium text-lg tracking-widest mb-3">
                Reach us
              </h2>
              <nav className="list-none mb-10  font-[300]">
                <li className="my-3 text-sm flex justify-center lg:justify-start md:justify-start items-center">
                  <i className="bx bx-envelope text-lg mr-2  " />
                  <Link to="/">hello@altrr.in</Link>
                </li>
                <li className="my-3 text-sm flex justify-center lg:justify-start md:justify-start items-center">
                  <i className="bx bx-phone-call mr-2 text-lg  " />
                  <Link to="/">+91 9960306216</Link>
                </li>
                <li className="my-3 text-sm flex justify-center lg:justify-start md:justify-start items-start">
                  <i className="bx bx-map mr-2 text-lg  " />
                  <Link to="/">
                    9th Floor, V.B Capitol Building, Range Hill Rd, Bhoslenagar,
                    Shivajinagar, Pune, Maharashtra 411007, India
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="container mx-auto grid grid-cols-2 gap-2 md:pl-20 pb-8 pt-5 px-5 ">
          <div className="flex items-center uppercase ">
            <p className="text-[#596780] font-[300] text-sm text-center sm:text-left">
              © ALtrr 2023
            </p>
          </div>
          <div className=" px-8 flex justify-end sm:justify-center lg:justify-end items-center gap-5">
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
