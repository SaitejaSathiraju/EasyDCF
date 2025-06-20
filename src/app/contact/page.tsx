"use client";

import { ReNavbar } from "@/components/magicui/renav";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Footer from "@/components/magicui/footer";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <ReNavbar />
      <div className="relative w-full min-h-screen overflow-visible flex flex-col items-center justify-center gap-12 py-16 bg-white px-4 sm:px-8 lg:px-16">
        <DotPattern className="absolute inset-0 w-full min-h-screen h-full z-0" />

        <div className="relative z-10 max-w-5xl w-full mx-auto text-gray-800">
          <h1 className="text-5xl font-extrabold text-center mb-10">
            Contact <span className="text-orange-600">EasyDCF</span>
          </h1>

          <p className="text-center text-lg mb-14 max-w-3xl mx-auto">
            We’re headquartered in Hyderabad, India, dedicated to empowering MSMEs across the nation. Whether you have questions, partnership ideas, or want to invest, we’re here to connect.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Left: Contact Details + Socials */}
            <div className="space-y-10">
              <div className="bg-orange-50 border border-orange-300 rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-3">
                  <FaMapMarkerAlt /> Our Location
                </h2>
                <p className="text-lg leading-relaxed">
                  EasyDCF Pvt Ltd <br />
                  5th Floor, TechPark Towers <br />
                  Hitech City, Hyderabad <br />
                  Telangana, India - 500081
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-300 rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-3">
                  <FaEnvelope /> Email & Phone
                </h2>
                <p className="text-lg mb-3">
                  Email:{" "}
                  <a href="mailto:support@easydcf.in" className="text-orange-600 hover:underline">
                    support@easydcf.in
                  </a>
                </p>
                <p className="text-lg">
                  Phone:{" "}
                  <a href="tel:+914012345678" className="text-orange-600 hover:underline">
                    +91 40 1234 5678
                  </a>
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-300 rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-3">
                  Connect with Us
                </h2>
                <div className="flex gap-8 text-orange-600 text-3xl justify-start">
                  <a
                    href="https://www.linkedin.com/company/easydcf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-orange-700 transition"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://twitter.com/easydcf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="hover:text-orange-700 transition"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://facebook.com/easydcf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-orange-700 transition"
                  >
                    <FaFacebook />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Google Map + Contact Form */}
            <div className="space-y-10">
              {/* Google Map Embed */}
              <div className="rounded-lg overflow-hidden shadow-md h-72 md:h-96 border-2 border-orange-500 bg-white">
                <iframe
                  title="EasyDCF Hyderabad Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.521676139525!2d78.38671221489832!3d17.447649406106534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb917ff76e140d%3A0x1524db8f3a25b33c!2sTech%20Park%2C%20HITEC%20City%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1697635221584!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact Form */}
              <section className="bg-white">
                <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Send Us a Message</h2>
                <form
                  className="max-w-xl mx-auto space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for reaching out! We'll get back to you shortly.");
                    e.currentTarget.reset();
                  }}
                >
                  <div>
                    <label htmlFor="name" className="block mb-2 font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 font-semibold">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Write your message here..."
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-10 rounded-full transition"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
