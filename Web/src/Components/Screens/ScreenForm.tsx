import { useNavigate } from "react-router-dom";
import type { Screen, ScreenFormData } from "../../Types/screen_Type";
import { FiInfo } from "react-icons/fi";

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

  const isSeatCountValid =
    formData.total_rows > 0 &&
    formData.total_columns > 0 &&
    formData.total_rows * formData.total_columns === formData.total_seats;

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
          <div className="flex items-center gap-2 mb-1.5">
            <label className="text-gray-400">Total Capacity</label>

            <div className="relative group">
              <FiInfo className="w-3.5 h-3.5 text-gray-500 cursor-help" />

              <span
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2
        hidden group-hover:block w-48 p-2 text-xs text-white
        bg-gray-800 rounded-lg shadow-lg z-10"
              >
                Count each aisle as one empty seat when calculating total
                capacity
              </span>
            </div>
          </div>

          <input
            type="number"
            min="20"
            required
            value={formData.total_seats}
            onChange={(e) => updateField("total_seats", Number(e.target.value))}
            className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
          />
        </div>

        {/* Rows and Columns */}
        <div>
          <label className="block text-gray-400 mb-1.5">Total Columns</label>

          <input
            type="number"
            required
            value={formData.total_columns}
            onChange={(e) =>
              updateField("total_columns", Number(e.target.value))
            }
            className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1.5">Total Rows</label>

          <input
            type="number"
            required
            value={formData.total_rows}
            onChange={(e) => updateField("total_rows", Number(e.target.value))}
            className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
          />
        </div>
      </div>
      {!isSeatCountValid && (
        <p className="text-red-400 text-xs mt-2">
          Rows × Columns must equal Total Capacity (
          {formData.total_rows * formData.total_columns} /{" "}
          {formData.total_seats})
        </p>
      )}

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
