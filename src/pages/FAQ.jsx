import { motion } from "framer-motion";

const FAQ = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="text-white text-xl"
  >
    <h2 className="font-bold text-2xl mb-4">Frequently Asked Questions</h2>
    <ul className="list-disc pl-6">
      <li>What is Aboki.eth?</li>
      <li>How do I connect my wallet?</li>
      <li>Is it safe to use?</li>
    </ul>
  </motion.section>
);

export default FAQ;
