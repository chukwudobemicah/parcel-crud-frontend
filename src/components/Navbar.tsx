import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";

interface NavbarProps {
  onCreateClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCreateClick }) => {
  /* Mobile Menu Icon */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-[var(--bg-primary)]/80 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
              <Icon
                name="package"
                className="text-[var(--bg-primary)]"
                size={20}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Parcel
                {/* <span className="text-[var(--color-primary)]">Hub</span> */}
              </h1>
              <p className="text-xs text-gray-500">Management System</p>
            </div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-gray-300 hover:text-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
            >
              Parcels
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-[var(--color-primary)] transition-colors duration-200 text-sm font-medium"
            >
              Reports
            </a>
          </div>

          {/* Desktop Action Button */}
          {onCreateClick && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--bg-primary)] rounded-lg font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-lg shadow-[var(--color-primary)]/20"
            >
              <Icon name="plus" size={18} />
              <span>New Parcel</span>
            </motion.button>
          )}

          {/* Mobile Menu Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-50"
          >
            <Icon
              name={isMobileMenuOpen ? "x" : "menu"}
              size={24}
              className="text-gray-300"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        className="absolute top-full left-0 right-0 md:hidden overflow-hidden bg-[#1a1718] border-b border-white/10 shadow-2xl"
      >
        <div className="px-4 py-6 space-y-4">
          <a
            href="#"
            className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Parcels
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-[var(--color-primary)] transition-colors text-base font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reports
          </a>
          {onCreateClick && (
            <button
              onClick={() => {
                onCreateClick();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary)] text-[var(--bg-primary)] rounded-lg font-semibold hover:bg-[var(--color-primary-dark)] transition-all shadow-lg shadow-[var(--color-primary)]/20"
            >
              <Icon name="plus" size={18} />
              <span>New Parcel</span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};
