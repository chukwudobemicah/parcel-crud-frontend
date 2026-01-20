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
  Button,
  Icon,
  ToastContainer,
} from "./components";

function App() {
  const { parcels, createParcel, updateParcel, deleteParcel } =
    useParcelStore();
  const { addToast } = useToastStore();

  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedParcel, setSelectedParcel] = useState<Parcel | undefined>();
  const [parcelToDelete, setParcelToDelete] = useState<Parcel | undefined>();
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setFormMode("create");
    setSelectedParcel(undefined);
    setShowForm(true);
  };

  const handleEditClick = (parcel: Parcel) => {
    setFormMode("edit");
    setSelectedParcel(parcel);
    setShowForm(true);
  };

  const handleDeleteClick = (id: string) => {
    const parcel = parcels.find((p) => p.id === id);
    if (parcel) {
      setParcelToDelete(parcel);
    }
  };

  const handleFormSubmit = (input: CreateParcelInput) => {
    if (formMode === "create") {
      createParcel(input);
      addToast("Parcel created successfully!", "success");
    } else if (selectedParcel) {
      updateParcel({ ...input, id: selectedParcel.id });
      addToast("Parcel updated successfully!", "info");
    }
    setShowForm(false);
    setSelectedParcel(undefined);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedParcel(undefined);
  };

  const handleDeleteConfirm = () => {
    if (parcelToDelete) {
      deleteParcel(parcelToDelete.id);
      addToast("Parcel deleted successfully", "error");
      setParcelToDelete(undefined);
    }
  };

  const handleDeleteCancel = () => {
    setParcelToDelete(undefined);
  };

  return (
    <div className="min-h-screen">
      <ToastContainer />
      {/* Navbar */}
      <Navbar onCreateClick={handleCreateClick} />

      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 flex justify-center"
          >
            <div className="rounded-2xl p-6 sm:p-8 max-w-3xl w-full text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-white mb-4">
                Parcel Management
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
                Efficiently track, manage, and organize your shipments with our
                comprehensive real-time dashboard and CRUD system.
              </p>
              <Button
                onClick={handleCreateClick}
                variant="primary"
                size="lg"
                className="shadow-lg shadow-[var(--color-primary)]/20 hover:scale-105 transition-transform w-full sm:w-auto"
              >
                <Icon name="plus" className="mr-2" size={20} />
                Create New Parcel
              </Button>
            </div>
          </motion.div>

          {/* Parcel List */}
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
      </div>

      {/* Parcel Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleFormCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1718] border border-white/10 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <ParcelForm
                mode={formMode}
                parcel={selectedParcel}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {parcelToDelete && (
          <DeleteConfirmation
            parcel={parcelToDelete}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
