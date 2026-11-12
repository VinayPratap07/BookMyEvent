import type { Screen, ScreenFormData } from "../../Types/screen";

interface ScreenFormProps {
  formData: ScreenFormData;
  setFormData: React.Dispatch<React.SetStateAction<ScreenFormData>>;
}

function ScreenForm({ formData, setFormData }: ScreenFormProps) {
  const updateField = <K extends keyof ScreenFormData>(
    field: K,
    value: ScreenFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

        {/* <div>
          <label className="block text-gray-400 mb-1.5">
            Audio Calibration
          </label>

          <select
            value={formData.sound}
            onChange={(e) =>
              updateField("sound", e.target.value as Screen["sound"])
            }
            className="w-full bg-[#0c0d12] border border-[#23263b] rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-600 text-xs"
          >
            <option value="Dolby Atmos">Dolby Atmos</option>
            <option value="IMAX 12.0 Channel">IMAX 12.0 Channel</option>
            <option value="7.1 Surround">7.1 Surround</option>
          </select>
        </div> */}
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
