import { motion } from "framer-motion";

const Whitepaper = () => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="text-white text-xl"
  >
    <h2 className="font-bold text-2xl mb-4">Whitepaper</h2>
    <p>
      This page contains all the details about Aboki.eth’s vision and
      technology.
    </p>
  </motion.section>
);

export default Whitepaper;
