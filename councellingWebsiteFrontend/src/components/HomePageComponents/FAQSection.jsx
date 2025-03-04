import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useInView } from "framer-motion";

const faqs = [
  {
    question: "How can I register for JOSAA Counseling?",
    answer:
      "You can register on the official JOSAA portal by providing your JEE rank and necessary documents.",
  },
  {
    question: "What are the eligibility criteria for seat allotment?",
    answer:
      "Eligibility depends on JEE Main/Advanced rank, category, and institute-specific requirements.",
  },
  {
    question: "Can I change my selected college after seat allotment?",
    answer:
      "Yes, you can opt for 'float' or 'slide' options based on availability in later rounds.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-150px" });

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={ref}
      className="relative bg-gradient-to-r from-blue-100 to-amber-50 p-10 rounded-none"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 text-center"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border rounded-lg p-4 bg-white shadow-md hover:bg-gray-100 duration-100 cursor-pointer"
          >
            <button
              className="flex justify-between items-center w-full text-lg font-medium text-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
