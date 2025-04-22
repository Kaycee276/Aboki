import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollReveal = ({
  children,
  duration = 0.6,
  delay = 0,
  direction = "up", // 'up', 'down', 'left', 'right'
  fadeIn = true,
  once = true,
  distance = 40, // Distance to offset before animation
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "0px 0px -50px 0px",
  });

  // Directional offsets
  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const { x, y } = getOffset();

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: fadeIn ? 0 : 1,
        x,
        y,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 0.77, 0.47, 0.97],
      }}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
