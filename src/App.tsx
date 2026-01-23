import { AnimatePresence, motion } from "framer-motion";
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
import useParcelManager from "./hooks/useParcelManager";

function App() {
  const {
    parcels,
    formMode,
    selectedParcel,
    parcelToDelete,
    showForm,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleFormSubmit,
    handleDeleteConfirm,
    handleDeleteCancel,
    closeForm,
  } = useParcelManager();

  useStopScroll(showForm);

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
            onCancel={handleDeleteCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
