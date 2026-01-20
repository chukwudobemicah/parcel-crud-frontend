import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Parcel,
  CreateParcelInput,
  UpdateParcelInput,
} from "../types/parcel";
import { generateId } from "../utils/helpers";

interface ParcelState {
  parcels: Parcel[];
  createParcel: (input: CreateParcelInput) => Parcel;
  updateParcel: (input: UpdateParcelInput) => void;
  deleteParcel: (id: string) => void;
  getParcelById: (id: string) => Parcel | undefined;
}

export const useParcelStore = create<ParcelState>()(
  persist(
    (set, get) => ({
      parcels: [],

      createParcel: (input: CreateParcelInput) => {
        const newParcel: Parcel = {
          ...input,
          id: generateId(),
        };
        set((state) => ({
          parcels: [...state.parcels, newParcel],
        }));
        return newParcel;
      },

      updateParcel: (input: UpdateParcelInput) => {
        set((state) => ({
          parcels: state.parcels.map((parcel) =>
            parcel.id === input.id ? { ...parcel, ...input } : parcel,
          ),
        }));
      },

      deleteParcel: (id: string) => {
        set((state) => ({
          parcels: state.parcels.filter((parcel) => parcel.id !== id),
        }));
      },

      getParcelById: (id: string) => {
        return get().parcels.find((parcel) => parcel.id === id);
      },
    }),
    {
      name: "parcel-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
