import { useState } from "react";
import type { Parcel, CreateParcelInput, FormMode } from "../types/parcel";
import { useParcelStore } from "../store/parcelStore";
import { useToastStore } from "../store/toastStore";

const TOAST_MESSAGES = {
  create: "Parcel created successfully!",
  update: "Parcel updated successfully!",
  delete: "Parcel deleted successfully",
} as const;

export function useParcelManager() {
  const { parcels, createParcel, updateParcel, deleteParcel } =
    useParcelStore();
  const { addToast } = useToastStore();

  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | undefined>();
  const [parcelToDelete, setParcelToDelete] = useState<Parcel | undefined>();
  const [showForm, setShowForm] = useState(false);

  const openForm = (mode: FormMode, parcel?: Parcel) => {
    setFormMode(mode);
    setSelectedParcel(parcel);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedParcel(undefined);
  };

  const handleCreateClick = () => openForm("create");
  const handleEditClick = (parcel: Parcel) => openForm("edit", parcel);

  const handleDeleteClick = (id: string) => {
    const parcel = parcels.find((p) => p.id === id);
    if (parcel) setParcelToDelete(parcel);
  };

  const handleFormSubmit = (input: CreateParcelInput) => {
    if (formMode === "create") {
      createParcel(input);
      addToast(TOAST_MESSAGES.create, "success");
    } else if (selectedParcel) {
      updateParcel({ ...input, id: selectedParcel.id });
      addToast(TOAST_MESSAGES.update, "info");
    }
    closeForm();
  };

  const handleDeleteConfirm = () => {
    if (parcelToDelete) {
      deleteParcel(parcelToDelete.id);
      addToast(TOAST_MESSAGES.delete, "error");
      setParcelToDelete(undefined);
    }
  };

  const handleDeleteCancel = () => {
    setParcelToDelete(undefined);
  };

  return {
    // Data
    parcels,
    formMode,
    selectedParcel,
    parcelToDelete,
    showForm,

    // Actions
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleFormSubmit,
    handleDeleteConfirm,
    handleDeleteCancel,
    closeForm,
  };
}

export default useParcelManager;
