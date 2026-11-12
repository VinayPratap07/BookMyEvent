import { useState } from "react";
import { FiSliders, FiX, FiCheckCircle } from "react-icons/fi";

import ScreenForm from "./ScreenForm";
import type { Screen, ScreenFormData } from "../../Types/screen";

interface ScreenModalProps {
  screen: Screen | null;
  onClose: () => void;
  onSave: (data: ScreenFormData) => void;
}

const defaultFormData: ScreenFormData = {
  screen_id: "",
  screen_name: "",
  screen_type: "Dolby Atmos 2D",
  total_seats: 180,
  status: "Operational",
};

function ScreenModal({ screen, onClose, onSave }: ScreenModalProps) {
  const [formData, setFormData] = useState<ScreenFormData>(() =>
    screen
      ? {
          screen_id: screen.screen_id,
          screen_name: screen.screen_name,
          screen_type: screen.screen_type,
          total_seats: screen.total_seats,
          status: screen.status,
        }
      : {
          ...defaultFormData,
          screen_name: "Audi",
        },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEditing = Boolean(screen);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12141c] border border-purple-900/50 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#23263b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-400">
              <FiSliders className="w-4 h-4" />
            </div>

            <h3 className="text-lg font-bold text-white">
              {isEditing ? "Edit Screen Configuration" : "Add New Screen"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <ScreenForm formData={formData} setFormData={setFormData} />

          <div className="pt-4 border-t border-[#23263b] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all shadow-md shadow-purple-950"
            >
              <FiCheckCircle className="w-4 h-4" />

              <span>{isEditing ? "Save Changes" : "Create Screen"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScreenModal;
