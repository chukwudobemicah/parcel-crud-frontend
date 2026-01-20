import { useState, useCallback } from "react";
import type {
  Parcel,
  CreateParcelInput,
  UpdateParcelInput,
} from "../types/parcel";
import { generateId } from "../utils/helpers";

/**
 * Custom hook for managing parcel CRUD operations
 */
export const useParcels = () => {
  const [parcels, setParcels] = useState<Parcel[]>([
    // Sample data for demonstration
    {
      id: generateId(),
      name: "Electronics Package",
      description: "High-value electronics shipment with fragile items",
      quantity: 5,
      weight: 12.5,
    },
    {
      id: generateId(),
      name: "Books Collection",
      description: "Educational books for library",
      quantity: 50,
      weight: 45.0,
    },
  ]);

  /**
   * Create a new parcel
   */
  const createParcel = useCallback((input: CreateParcelInput) => {
    const newParcel: Parcel = {
      ...input,
      id: generateId(),
    };
    setParcels((prev) => [...prev, newParcel]);
    return newParcel;
  }, []);

  /**
   * Update an existing parcel
   */
  const updateParcel = useCallback((input: UpdateParcelInput) => {
    setParcels((prev) =>
      prev.map((parcel) =>
        parcel.id === input.id ? { ...parcel, ...input } : parcel,
      ),
    );
  }, []);

  /**
   * Delete a parcel
   */
  const deleteParcel = useCallback((id: string) => {
    setParcels((prev) => prev.filter((parcel) => parcel.id !== id));
  }, []);

  /**
   * Get a parcel by ID
   */
  const getParcelById = useCallback(
    (id: string) => {
      return parcels.find((parcel) => parcel.id === id);
    },
    [parcels],
  );

  return {
    parcels,
    createParcel,
    updateParcel,
    deleteParcel,
    getParcelById,
  };
};
