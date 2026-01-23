import { motion, type Transition } from "framer-motion";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface HeroSectionProps {
  onCreateClick: () => void;
}

const shimmerTransition: Transition = {
  repeat: Infinity,
  repeatType: "loop",
  duration: 2,
  repeatDelay: 3,
  ease: "easeInOut",
};

export default function HeroSection({ onCreateClick }: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-12 flex justify-center"
    >
      <div className="rounded-2xl p-6 sm:p-8 max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-(--color-primary) to-white mb-4">
          Parcel Management
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
          Efficiently track, manage, and organize your shipments with our
          comprehensive real-time dashboard and CRUD system.
        </p>
        <Button
          onClick={onCreateClick}
          variant="primary"
          size="lg"
          className="relative overflow-hidden shadow-lg shadow-(--color-primary)/20 hover:scale-105 transition-transform w-full sm:w-auto"
        >
          <div className="relative z-10 flex items-center">
            <Icon name="plus" className="mr-2" size={20} />
            Create New Parcel
          </div>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "400%" }}
            transition={shimmerTransition}
            className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/60 to-transparent -skew-x-12"
          />
        </Button>
      </div>
    </motion.div>
  );
}
