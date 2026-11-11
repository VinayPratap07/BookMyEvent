import type { Screen } from "../../Types/screen";
import ScreensCard from "./ScreensCard";

interface ScreensGridProps {
  screens: Screen[];
  onEdit: (screen: Screen) => void;
  onDelete: (id: string) => void;
}

function ScreensGrid({ screens, onEdit, onDelete }: ScreensGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {screens.map((screen) => (
        <ScreensCard
          key={screen.id}
          screen={screen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ScreensGrid;
