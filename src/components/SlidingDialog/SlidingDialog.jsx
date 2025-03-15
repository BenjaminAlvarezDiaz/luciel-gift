import React, { useState, useEffect } from "react";
import { motion, AnimatePresence  } from "framer-motion";

import styles from "./SlidingDialog.module.css";

const SlidingDialog = ({ message, duration = 3 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration * 1000);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
        {visible && (
        <motion.div
            initial={{ x: "10%", opacity: 0 }} // Empieza fuera de la pantalla (derecha)
            animate={{ x: 0, opacity: 1 }} // Se desliza hacia la izquierda
            exit={{ x: "60%", opacity: 0, scale: 0 }} // Se contrae al desaparecer
            transition={{ duration: 0.5 }}
            style={{}}
            className={styles.animation_container}
        >
      {message}
    </motion.div>)}
    </AnimatePresence>
  );
};

export default SlidingDialog;