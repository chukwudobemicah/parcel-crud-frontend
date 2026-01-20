import { AnimatePresence, motion } from "framer-motion";
import { useToastStore, ToastType } from "../store/toastStore";
import { Icon } from "./Icon";

const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.3 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const getIconForType = (type: ToastType) => {
  switch (type) {
    case "success":
      return "check";
    case "error":
      return "x";
    default:
      return "package";
  }
};

const getColorForType = (type: ToastType) => {
  switch (type) {
    case "success":
      return "border-l-[var(--color-primary)] shadow-[var(--color-primary)]/20";
    case "error":
      return "border-l-red-500 shadow-red-500/20";
    default:
      return "border-l-blue-500 shadow-blue-500/20";
  }
};

const getIconColor = (type: ToastType) => {
  switch (type) {
    case "success":
      return "text-[var(--color-primary)]";
    case "error":
      return "text-red-500";
    default:
      return "text-blue-500";
  }
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`
              pointer-events-auto
              flex items-center gap-3 
              min-w-[300px] max-w-md 
              p-4 rounded-xl 
              bg-[#1a1718]/90 backdrop-blur-md 
              border border-white/10 border-l-4
              shadow-xl ${getColorForType(toast.type)}
            `}
          >
            <div
              className={`p-1 rounded-full bg-white/5 ${getIconColor(toast.type)}`}
            >
              <Icon name={getIconForType(toast.type)} size={18} />
            </div>

            <p className="flex-1 text-sm font-medium text-white/90">
              {toast.message}
            </p>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
            >
              <Icon name="x" size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
