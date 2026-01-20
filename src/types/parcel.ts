/**
 * Parcel entity type definition
 */
export interface Parcel {
  id: string;
  name: string;
  description: string;
  quantity: number;
  weight: number;
}

/**
 * Type for creating a new parcel (without id)
 */
export type CreateParcelInput = Omit<Parcel, "id">;

/**
 * Type for updating a parcel (all fields optional except id)
 */
export type UpdateParcelInput = Partial<Omit<Parcel, "id">> & { id: string };

/**
 * Form modes for the ParcelForm component
 */
export type FormMode = "create" | "edit";

/**
 * Form validation errors
 */
export interface ValidationErrors {
  name?: string;
  description?: string;
  quantity?: string;
  weight?: string;
}
