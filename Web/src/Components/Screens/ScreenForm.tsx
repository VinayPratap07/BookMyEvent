import { useNavigate } from "react-router-dom";
import type { Screen, ScreenFormData } from "../../Types/screen";

interface ScreenFormProps {
  formData: ScreenFormData;
  setFormData: React.Dispatch<React.SetStateAction<ScreenFormData>>;
  screenId?: string;
}

function ScreenForm({ formData, setFormData, screenId }: ScreenFormProps) {
  const navigate = useNavigate();

  const updateField = <K extends keyof ScreenFormData>(
    field: K,
    value: ScreenFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditLayout = () => {
    if (!screenId) return;
    navigate(`/admin/screens/layout?screenId=${encodeURIComponent(screenId)}`);
  };

  return (
    <div className="space-y-4 text-xs font-medium">
      <div>
        <label className="block text-gray-400 mb-1.5">
          Screen Identifier / Name
        </label>

        <input
          type="text"
          required
          value={formData.screen_name}
          onChange={(e) => updateField("screen_name", e.target.value)}
          placeholder="e.g. Audi 4 (Grand Luxe)"
          className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-4 py-2.5 text-white outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-1.5">
            Projection Standard
          </label>

          <select
            value={formData.screen_type}
            onChange={(e) =>
              updateField(
                "screen_type",
                e.target.value as Screen["screen_type"],
              )
            }
            className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
          >
            <option value="IMAX 2D/3D">IMAX 2D/3D</option>
            <option value="Dolby Atmos 2D">Dolby Atmos 2D</option>
            <option value="4DX">4DX</option>
            <option value="Standard Digital">Standard Digital</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-400 mb-1.5">Total Capacity</label>

          <input
            type="number"
            min="20"
            required
            value={formData.total_seats}
            onChange={(e) => updateField("total_seats", Number(e.target.value))}
            className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
          />
        </div>
      </div>

      {screenId && (
        <div>
          <label className="block text-gray-400 mb-1.5">Seating Layout</label>
          <button
            type="button"
            onClick={handleEditLayout}
            className="w-full bg-[#161822] hover:bg-[#1e2130] border border-[#23263b] hover:border-purple-600 rounded-xl px-4 py-2.5 text-purple-400 font-semibold transition-all text-xs flex items-center justify-center gap-2"
          >
            Edit Layout
          </button>
        </div>
      )}

      <div>
        <label className="block text-gray-400 mb-1.5">Operational Status</label>

        <div className="flex gap-3">
          {(["Operational", "Maintenance"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => updateField("status", option)}
              className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                formData.status === option
                  ? option === "Operational"
                    ? "bg-emerald-950/60 border-emerald-600 text-emerald-300"
                    : "bg-amber-950/60 border-amber-600 text-amber-300"
                  : "border-[#23263b] text-gray-400 hover:bg-[#161822]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScreenForm;
