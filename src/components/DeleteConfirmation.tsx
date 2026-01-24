import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { Icon } from "./Icon";
import type { Parcel } from "../types/parcel";

interface DeleteConfirmationProps {
  parcel: Parcel;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  parcel,
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#1a1718] border border-red-500/30 rounded-xl p-6 max-w-md w-full shadow-2xl shadow-red-500/20"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
              <Icon name="alert" className="text-red-500" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Delete Parcel?
              </h3>
              <p className="text-gray-400 text-sm">
                Are you sure you want to delete this parcel? This action cannot
                be undone.
              </p>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 mb-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Icon
                name="package"
                className="text-(--color-primary)"
                size={20}
              />
              <p className="font-semibold text-white">{parcel.name}</p>
            </div>
            <p className="text-sm text-gray-400 pl-8">{parcel.description}</p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="danger"
              size="lg"
              onClick={onConfirm}
              className="flex-1"
            >
              <Icon name="trash" className="mr-2" size={18} />
              Delete
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={onCancel}
              className="flex-1"
            >
              <Icon name="x" className="mr-2" size={18} />
              Cancel
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
