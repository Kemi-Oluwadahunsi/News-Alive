import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/kaliceagbaiaka01",
  },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/oluwakemi_od" },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCf7rWsAGlQXVzKFDUXwjdZQ",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/oluwakemi_od/",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/oluwakemi-oluwadahunsi/",
  },
];

const exploreLinks = [
  "About",
  "Partners",
  "Job Opportunities",
  "Advertise",
  "Membership",
];

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12">
      <div className="container mx-auto px-8 xl:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div className="">
          <h3 className="text-xl font-bold mb-4">Contact the Publisher</h3>
          <p className="text-gray-400">oluwakemioluwadahunsi@gmail.com</p>
          <p className="text-gray-400">+60 111 321 9046</p>
        </div>
        <div className="lg:ml-12 xl:ml-0">
          <h3 className="text-xl font-bold mb-4 ">Explorate</h3>
          <ul className="space-y-2">
            {exploreLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:ml-8 xl:ml-0">
          <h3 className="text-xl font-bold mb-4">Headquarter</h3>
          <p className="text-gray-400">12, Jalan Ampang,</p>
          <p className="text-gray-400">50450 Kuala Lumpur,</p>
          <p className="text-gray-400">Malaysia</p>
        </div>
        <div className="lg:ml-4 xl:ml-0">
          <h3 className="text-xl font-bold mb-4">Connections</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label={social.name}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} | KodeMaven</p>
      </div>
    </footer>
  );
}
