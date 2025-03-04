import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, UploadCloud, Clock, XCircle, CheckCircle } from "lucide-react";

const ImportantMessage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-150px" });

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-red-100 to-amber-50 p-6 md:p-8 rounded-xl shadow-lg border-l-4 border-red-500"
    >
      <motion.div
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center space-x-3"
      >
        <AlertTriangle className="text-red-600" size={28} />
        <h2 className="text-2xl font-bold text-red-700">Important Message</h2>
      </motion.div>

      <motion.p
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-gray-800 text-lg"
      >
        All candidates who were <strong>provisionally allotted a seat</strong> in the NIT+ system and 
        paid the Seat Acceptance Fee (SAF), <span className="font-semibold text-red-600">MUST PAY</span> 
        the <strong>Partial Admission Fee (PAF)</strong> between 
        <span className="text-red-700 font-semibold"> 24 July (10 AM) – 27 July (5 PM), 2025</span>.
      </motion.p>

      <motion.div
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center mt-4 space-x-2 text-red-700 font-medium"
      >
        <Clock size={20} />
        <p>Non-payment of the PAF will result in cancellation of the allotted seat.</p>
      </motion.div>

      <motion.p
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 text-gray-800 text-lg"
      >
        It is <span className="font-semibold text-red-600">MANDATORY</span> for all candidates who got a seat in
        <span className="text-red-700 font-semibold"> Round 5</span> to UPLOAD their DOCUMENTS for verification.
      </motion.p>

      <motion.div
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center mt-4 space-x-2 text-red-700 font-medium"
      >
        <UploadCloud size={20} />
        <p>Failure to upload documents will lead to seat cancellation.</p>
      </motion.div>

      <motion.p
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-4 text-gray-800 text-lg"
      >
        Candidates who <span className="text-red-600 font-semibold">fail to upload documents</span> 
        before the deadline <strong>will not be considered</strong> for seat allotment in the next rounds of JoSAA.
      </motion.p>

      <motion.div
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex items-center mt-4 space-x-2 text-red-700 font-medium"
      >
        <XCircle size={20} />
        <p>If your seat is canceled, you CANNOT participate in further rounds.</p>
      </motion.div>

      <motion.div
        variants={messageVariants}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex items-center mt-6 space-x-2 text-green-700 font-medium"
      >
        <CheckCircle size={22} />
        <p>Ensure all steps are completed before the deadline to confirm your seat.</p>
      </motion.div>
    </motion.div>
  );
};

export default ImportantMessage;
