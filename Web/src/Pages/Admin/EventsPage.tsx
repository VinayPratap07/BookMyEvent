import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import type { Event } from "../../Types/Events";
import EventCard from "../../Components/Events/ShowCard";
import EventFormModal from "../../Components/Events/ShowFormModal";
import { useEvents } from "../../Hooks/useEvents";
import LoadingScreen from "../../Components/Loading";
import ErrorState from "../../Components/Error";

function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const { isLoading, error, data, addEvent, isAdding } = useEvents();

  // Open modal for creating an event
  const openAddModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an event
  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-950/40 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manage Events
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage event details and schedule shows.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all"
        >
          <FiPlus className="w-4 h-4" />
          Add New Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {data.map((event: Event) => (
          <EventCard
            key={event.event_id}
            event={event}
            onEdit={openEditModal}
            onAddEvent={() => console.log("Event Added")}
            onArchive={() => console.log("Event Archived")}
          />
        ))}
      </div>

      {/* Add / Edit Event Modal */}
      {isModalOpen && (
        <EventFormModal
          editingEvent={editingEvent}
          onClose={closeModal}
          onSave={(formData) => {
            addEvent(formData);
            closeModal();
          }}
          isAdding={isAdding}
        />
      )}
    </div>
  );
}

export default EventsPage;
