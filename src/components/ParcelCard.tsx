import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { Icon } from "./Icon";
import type { Parcel } from "../types/parcel";

interface ParcelCardProps {
  parcel: Parcel;
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}

export const ParcelCard: React.FC<ParcelCardProps> = ({
  parcel,
  onEdit,
  onDelete,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-(--color-primary)/30 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 rounded-lg bg-(--color-primary)/10 flex items-center justify-center shrink-0 group-hover:bg-(--color-primary)/20 transition-colors">
            <Icon
              name="package"
              className="text-(--color-primary)]"
              size={24}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1 truncate">
              {parcel.name}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {parcel.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Quantity</p>
          <p className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-(--color-primary)]">{parcel.quantity}</span>
            <span className="text-sm text-gray-500">units</span>
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400 mb-1">Weight</p>
          <p className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-(--color-primary)]">{parcel.weight}</span>
            <span className="text-sm text-gray-500">kg</span>
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="flex-1 group/btn"
        >
          <Icon
            name="edit"
            className="mr-2 group-hover/btn:scale-110 transition-transform"
            size={16}
          />
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
          className="flex-1 group/btn"
        >
          <Icon
            name="trash"
            className="mr-2 group-hover/btn:scale-110 transition-transform"
            size={16}
          />
          Delete
        </Button>
      </div>
    </motion.div>
  );
};
