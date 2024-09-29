// This footer component contains the some links, social connect links, and contact information.
import { Facebook, Twitter, Linkedin, Github, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/kaliceagbaiaka01",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/kemi_oluwadahunsi",
  },
  {
    name: "WhatSapp",
    icon: MessageCircle,
    url: "https://wa.me/601113219046",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Kemi-Oluwadahunsi",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/oluwakemioluwadahunsi/",
  },
];

const exploreLinks = [
  { name: "About", path: "/about" },
  { name: "Articles", path: "/articles" },
  { name: "Write to Us", path: "/contact" },
  { name: "Advertise", path: "/advertise" },
  { name: "Membership", path: "/membership" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="space-y-8 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              Contact the Publisher
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail
                  className="h-6 w-6 text-gray-400 mr-2"
                  aria-hidden="true"
                />
                <a
                  href="mailto:oluwakemioluwadahunsi@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  oluwakemioluwadahunsi@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone
                  className="h-6 w-6 text-gray-400 mr-2"
                  aria-hidden="true"
                />
                <a
                  href="tel:+601113219046"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  +60 111 321 9046
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-1 lg:ml-16 xl:ml-0">
            <h3 className="text-xl font-bold text-white mb-4">Explore</h3>
            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-1 lg:ml-4 xl:ml-0">
            <h3 className="text-xl font-bold text-white mb-4">Headquarters</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p className="flex items-start">
                <MapPin
                  className="h-6 w-6 text-gray-400 mr-1 mt-1 "
                  aria-hidden="true"
                />
                <span>
                  12, Jalan Ampang,
                  <br />
                  50450 Kuala Lumpur,
                  <br />
                  Malaysia
                </span>
              </p>
            </address>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              Connect with Us
            </h3>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} KodeMaven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}