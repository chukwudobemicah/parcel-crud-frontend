import type { ValidationErrors, CreateParcelInput } from "../types/parcel";

/**
 * Validate parcel form input
 */
export const validateParcelInput = (
  input: Partial<CreateParcelInput>,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name validation
  if (!input.name?.trim()) {
    errors.name = "Name is required";
  } else if (input.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters";
  } else if (input.name.trim().length > 100) {
    errors.name = "Name must not exceed 100 characters";
  }

  // Description validation
  if (!input.description?.trim()) {
    errors.description = "Description is required";
  } else if (input.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (input.description.trim().length > 500) {
    errors.description = "Description must not exceed 500 characters";
  }

  // Quantity validation
  if (input.quantity === undefined || input.quantity === null) {
    errors.quantity = "Quantity is required";
  } else if (input.quantity < 1) {
    errors.quantity = "Quantity must be at least 1";
  } else if (input.quantity > 10000) {
    errors.quantity = "Quantity must not exceed 10,000";
  } else if (!Number.isInteger(input.quantity)) {
    errors.quantity = "Quantity must be a whole number";
  }

  // Weight validation
  if (input.weight === undefined || input.weight === null) {
    errors.weight = "Weight is required";
  } else if (input.weight <= 0) {
    errors.weight = "Weight must be greater than 0";
  } else if (input.weight > 5000) {
    errors.weight = "Weight must not exceed 5,000 kg";
  }

  return errors;
};

/**
 * Check if there are any validation errors
 */
export const hasErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
