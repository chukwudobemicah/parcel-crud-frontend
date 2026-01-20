import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParcelCard } from "./ParcelCard";
import { Icon } from "./Icon";
import type { Parcel } from "../types/parcel";

interface ParcelListProps {
  parcels: Parcel[];
  onEdit: (parcel: Parcel) => void;
  onDelete: (id: string) => void;
}

export const ParcelList: React.FC<ParcelListProps> = ({
  parcels,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (parcels.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
          <Icon name="package" className="text-gray-600" size={48} />
        </div>
        <h3 className="text-2xl font-bold text-gray-400 mb-2">
          No Parcels Yet
        </h3>
        <p className="text-gray-500">
          Get started by creating your first parcel
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="relative">
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search parcels by name or description..."
            className="w-full max-w-[450px] pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between text-sm text-gray-400"
      >
        <p>
          Showing{" "}
          <span className="text-[var(--color-primary)] font-semibold">
            {filteredParcels.length}
          </span>{" "}
          of <span className="text-white font-semibold">{parcels.length}</span>{" "}
          parcels
        </p>
      </motion.div>

      {/* Parcel Grid */}
      <AnimatePresence mode="popLayout">
        {filteredParcels.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredParcels.map((parcel, index) => (
              <ParcelCard
                key={parcel.id}
                parcel={parcel}
                onEdit={() => onEdit(parcel)}
                onDelete={() => onDelete(parcel.id)}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/5 rounded-lg border border-white/10"
          >
            <Icon
              name="search"
              className="mx-auto text-gray-600 mb-4"
              size={48}
            />
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
