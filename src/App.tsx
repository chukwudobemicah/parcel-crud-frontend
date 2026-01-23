import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Parcel, CreateParcelInput, FormMode } from "./types/parcel";
import { useParcelStore } from "./store/parcelStore";
import { useToastStore } from "./store/toastStore";
import {
  ParcelForm,
  ParcelList,
  DeleteConfirmation,
  Navbar,
  ToastContainer,
  Modal,
  HeroSection,
} from "./components";
import useStopScroll from "./hooks/useStopScroll";

const TOAST_MESSAGES = {
  create: "Parcel created successfully!",
  update: "Parcel updated successfully!",
  delete: "Parcel deleted successfully",
} as const;

function App() {
  const { parcels, createParcel, updateParcel, deleteParcel } =
    useParcelStore();
  const { addToast } = useToastStore();

  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | undefined>();
  const [parcelToDelete, setParcelToDelete] = useState<Parcel | undefined>();
  const [showForm, setShowForm] = useState(false);

  useStopScroll(showForm);

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

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Navbar onCreateClick={handleCreateClick} />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <HeroSection onCreateClick={handleCreateClick} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ParcelList
              parcels={parcels}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {showForm && (
          <Modal
            onClose={closeForm}
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <ParcelForm
              mode={formMode}
              parcel={selectedParcel}
              onSubmit={handleFormSubmit}
              onCancel={closeForm}
            />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {parcelToDelete && (
          <DeleteConfirmation
            parcel={parcelToDelete}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setParcelToDelete(undefined)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
