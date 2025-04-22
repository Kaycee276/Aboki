import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";

const faqData = [
  {
    question: "What is Aboki.eth?",
    answer:
      "Aboki.eth is a decentralized platform that allows you to stake digital assets, borrow fiat, and repay loans with ease.",
  },
  {
    question: "How do I connect my wallet?",
    answer:
      "Click on the 'Connect Wallet' button and choose your preferred wallet provider such as Phantom or Metamask.",
  },
  {
    question: "Is it safe to stake my assets?",
    answer:
      "Yes. Your assets are locked securely in smart contracts, and you maintain full control until the loan is repaid.",
  },
];

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div
      onClick={toggle}
      className="bg-[#203470] border border-[#4169E1] rounded-xl p-4 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <BiChevronDown className="text-white" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 mt-2"
          >
            {answer}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-12 px-4 max-w-4xl mx-auto"
    >
      <h2 className="text-white text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <FAQItem
            key={idx}
            {...item}
            isOpen={openIndex === idx}
            toggle={() => toggleFAQ(idx)}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;
