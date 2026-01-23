import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const contentVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export default function Modal({
  children,
  onClose,
  className = "",
}: ModalProps) {
  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: "spring", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#1a1718] border border-white/10 rounded-xl shadow-2xl ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
