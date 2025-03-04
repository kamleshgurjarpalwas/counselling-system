import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";

const links = [
  { title: "JOSAA Counseling Guidelines", path: "/rules" },
  { title: "Seat Matrix Information", path: "/seat-matrix" },
  { title: "Opening & Closing Ranks", path: "/opening-closing-rank" },
  { title: "Participating Institutes", path: "/institutes" },
  { title: "Counseling Schedule & Deadlines", path: "/schedule" }
];

const UsefulLinks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-150px" });

  return (
    <div
      ref={ref}
      className="relative bg-gradient-to-r from-blue-100 to-amber-50 py-10 px-6 rounded-none"
    >
      
      <motion.h2
        className="text-3xl font-bold text-gray-800 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Useful Links
      </motion.h2>

      <ul className="mt-8 space-y-4 max-w-xl mx-auto">
        {links.map((link, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-4 rounded-md shadow-md flex items-center space-x-3 hover:bg-gray-100 transition"
          >
            <ArrowRightCircle className="text-blue-600" size={22} />
            <Link
              to={link.path}
              className="text-blue-600 hover:underline font-medium text-lg"
            >
              {link.title}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default UsefulLinks;
