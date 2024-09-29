// This is the contact component where a user can send email directly to the website owner. The direct message is implemented using the emailjs library. Kindly check the .env.sample file to check what IDs are needed for this functionality to work, all you have to do here is uncomment the codes and replace the onSubmit value in the form to "sendEmail". But for now, I only log a success message for submission purpose.

import { useState, useRef } from "react";
import { motion } from "framer-motion";
// import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [
    status,
    // setStatus
  ] = useState("");
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message submitted successfully");
    setName("");
    setEmail("");
    setMessage("");
  };

  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   setStatus("sending");

  //   emailjs
  //     .sendForm(
  //       import.meta.env.VITE_SERVICE_ID,
  //       import.meta.env.VITE_TEMPLATE_ID,
  //       form.current,
  //       import.meta.env.VITE_USER_ID
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //         setStatus("success");
  //         toast.success("Message sent successfully!");
  //         setName("");
  //         setEmail("");
  //         setMessage("");
  //       },
  //       (error) => {
  //         console.log(error.text);
  //         setStatus("error");
  //         toast.error("Error sending message. Please try again.");
  //       }
  //     );
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto my-16 p-6 bg-gray-800 rounded-lg shadow-xl "
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <form ref={form} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>
      <Toaster position="top-right" richColors />
    </motion.div>
  );
}
