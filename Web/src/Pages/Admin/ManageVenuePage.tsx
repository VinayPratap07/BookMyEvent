import { useState } from "react";
import { FiPlus } from "react-icons/fi";

//Hook
import { useScreens } from "../../Hooks/useScreens";

//Type
import type { Screen, ScreenFormData } from "../../Types/screen";

//Components
import VenueStats from "../../Components/Screens/VenueStats";
import ScreensGrid from "../../Components/Screens/ScreensGrid";
import ScreenModal from "../../Components/Screens/ScreenModal";
import LoadingScreen from "../../Components/Loading";
import ErrorState from "../../Components/Error";

function ManageVenue() {
  const {
    sc,
    isLoading,
    error,
    addScreen,
    updateScreen,
    deleteScreen,
    totalCapacity,
    activeScreensCount,
  } = useScreens();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScreen, setEditingScreen] = useState<Screen | null>(null);

  const openAddModal = () => {
    setEditingScreen(null);
    setIsModalOpen(true);
  };

  const openEditModal = (screen: Screen) => {
    setEditingScreen(screen);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingScreen(null);
  };

  const handleSaveScreen = (data: ScreenFormData) => {
    if (editingScreen) {
      updateScreen(editingScreen.screen_id, data);
    } else {
      addScreen(data);
    }

    closeModal();
  };

  const handleDeleteScreen = (id: string) => {
    deleteScreen(id);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-950/40 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Venue & Auditorium Layout
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Configure screens, audio-visual capabilities, and seat capacity.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 active:scale-[0.98] transition-all shadow-lg shadow-purple-950/50"
        >
          <FiPlus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Screen</span>
        </button>
      </div>

      {/* Statistics */}
      <VenueStats
        totalScreens={sc.length}
        activeScreens={activeScreensCount}
        totalCapacity={totalCapacity}
      />

      {/* Screen Cards */}
      <ScreensGrid
        screens={sc}
        onEdit={openEditModal}
        onDelete={handleDeleteScreen}
      />

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <ScreenModal
          key={editingScreen?.screen_id ?? "new-screen"}
          screen={editingScreen}
          onClose={closeModal}
          onSave={handleSaveScreen}
        />
      )}
    </div>
  );
}

export default ManageVenue;
