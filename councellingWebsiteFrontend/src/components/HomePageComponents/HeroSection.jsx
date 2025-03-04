import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-100 to-amber-50 py-16 px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-75"></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold text-gray-800">
          Welcome to <span className="text-blue-600">JoSAA 2025</span>
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          The Joint Seat Allocation Authority (JoSAA) 2025 has been set up by the Ministry of Education 
          to manage and regulate joint seat allocation for <b className="font-semibold">121 institutes</b> for the academic year 2025-26.
        </p>
        
        <p className="mt-4 text-lg text-gray-700">
          This includes <span className="font-semibold">23 IITs, 31 NITs, IIEST Shibpur, 26 IIITs</span>, and 
          <span className="font-semibold"> 40 Other-Government Funded Technical Institutes (Other-GFTIs).</span>
          Admission to all the academic programs offered by these institutes will be made through a single platform.
        </p>

        <div className="flex flex-wrap justify-center mt-8 space-x-6">
          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
            <p className="text-4xl font-bold text-blue-700">121+</p>
            <p className="text-sm text-gray-600">Institutes</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
            <p className="text-4xl font-bold text-blue-700">23</p>
            <p className="text-sm text-gray-600">IITs</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
            <p className="text-4xl font-bold text-blue-700">31</p>
            <p className="text-sm text-gray-600">NITs</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="text-center">
            <p className="text-4xl font-bold text-blue-700">26</p>
            <p className="text-sm text-gray-600">IIITs</p>
          </motion.div>
        </div>

        <div className="mt-8 space-x-4">
          <Button className="px-6 py-3 text-lg cursor-pointer bg-blue-600 hover:bg-blue-700 text-white">
            Registration
          </Button>
          <Button variant="outline" className="px-6 py-3 text-lg cursor-pointer border-gray-700 text-gray-700">
            About Us
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
