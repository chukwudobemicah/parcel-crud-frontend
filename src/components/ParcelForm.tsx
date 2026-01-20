import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { Icon } from "./Icon";
import type { Parcel, CreateParcelInput, FormMode } from "../types/parcel";
import { useToastStore } from "../store/toastStore";

interface ParcelFormProps {
  mode: FormMode;
  parcel?: Parcel;
  onSubmit: (input: CreateParcelInput) => void;
  onCancel: () => void;
}

export const ParcelForm: React.FC<ParcelFormProps> = ({
  mode,
  parcel,
  onSubmit,
  onCancel,
}) => {
  const { addToast } = useToastStore();
  // Use a separate internal state with strings for number inputs
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    weight: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === "edit" && parcel) {
      setFormData({
        name: parcel.name,
        description: parcel.description,
        quantity: String(parcel.quantity),
        weight: String(parcel.weight),
      });
    } else if (mode === "create") {
      // Reset to empty values when creating new parcel
      setFormData({
        name: "",
        description: "",
        quantity: "",
        weight: "",
      });
    }
  }, [mode, parcel]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    const quantity = Number(formData.quantity);
    if (!formData.quantity || isNaN(quantity) || quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }

    const weight = Number(formData.weight);
    if (!formData.weight || isNaN(weight) || weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert string values to numbers before submitting
      onSubmit({
        name: formData.name,
        description: formData.description,
        quantity: Number(formData.quantity),
        weight: Number(formData.weight),
      });
    } else {
      addToast("Please fill in all required fields correctly", "error");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Store all values as strings, allowing empty values
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allowed keys: Backspace, Delete, Tab, Escape, Enter
    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
      ].includes(e.key)
    ) {
      return;
    }

    // Allow combinations like Ctrl+A, Ctrl+C, Ctrl+V, etc.
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    const isQuantity = e.currentTarget.name === "quantity";

    // For quantity, only allow numbers. For weight, allow numbers and ONE decimal point
    if (isQuantity) {
      // Ensure that it is a number and stop the keypress
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    } else {
      // For weight (decimals allowed)
      // Allow numbers and dot
      if (!/^[0-9.]$/.test(e.key)) {
        e.preventDefault();
      }

      // Prevent multiple dots
      if (e.key === "." && e.currentTarget.value.includes(".")) {
        e.preventDefault();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 bg-[#1a1718]/95 backdrop-blur-sm border-b border-white/10">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center">
            <Icon
              name="package"
              className="text-[var(--color-primary)]"
              size={20}
            />
          </div>
          {mode === "create" ? "Create New Parcel" : "Edit Parcel"}
        </h2>
        <button
          onClick={onCancel}
          className="w-8 h-8 cursor-pointer rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <Icon name="x" className="text-gray-400" size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 sm:p-6 space-y-4 sm:space-y-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            label="Parcel Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter parcel name"
            error={errors.name}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter parcel description"
            error={errors.description}
            rows={4}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="0"
              error={errors.quantity}
              min="1"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Input
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="0.0"
              error={errors.weight}
              step="0.01"
              min="0.01"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col-reverse sm:flex-row gap-3 pt-4"
        >
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={onCancel}
            className="flex-1"
          >
            <Icon name="x" className="mr-2" size={18} />
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" className="flex-1">
            <Icon name="check" className="mr-2" size={18} />
            {mode === "create" ? "Create Parcel" : "Update Parcel"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};
