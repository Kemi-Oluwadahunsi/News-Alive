// This is the header component, it handles the navigation links for the project. Fully optimized and responsive.

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Newspaper, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 max-w-[1440px] mx-auto transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900 shadow-[0px_0px_10px_rgba(37,99,235,0.5)]"
          : "bg-inherit border-b border-[rgba(37,99,235,0.5)]"
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 py-4 flex justify-between items-center">
        <Link to="/" className="inline-flex items-center">
          <Newspaper className="h-8 w-8 text-blue-500 mr-2" />
          <span className="text-2xl font-bold text-white tracking-tight">
            News<span className="text-blue-500">Alive</span>
          </span>
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex space-x-12 xl:space-x-[6rem]">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={linkVariants}
              >
                <Link
                  to={link.path}
                  className={`text-white hover:text-blue-400 transition-colors duration-300 ${
                    location.pathname === link.path
                      ? "border-b-2 border-blue-400"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <button
          className="text-white lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            ref={menuRef}
            className="fixed inset-y-0 top-[9.5%] z-20 shadow-2xl right-0 w-64 sm:w-[40%] bg-gray-900 p-8 lg:hidden border-l border-[rgba(29,78,216,0.5)]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <ul className=" space-y-8 sm:space-y-12">
              {navLinks.map((link, i) => (
                <motion.li key={link.name} custom={i} variants={linkVariants}>
                  <Link
                    to={link.path}
                    className="text-white flex justify-center items-center hover:text-blue-400 transition-colors duration-300 text-lg sm:text-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
