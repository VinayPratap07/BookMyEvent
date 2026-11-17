import { useSearchParams } from "react-router-dom";

import LoadingScreen from "../../Components/Loading";
import ErrorState from "../../Components/Error";

import LayoutHeader from "../../Components/ScreensLayout/LayoutHeader";
import VenueBounds from "../../Components/ScreensLayout/VenueBounds";
import SeatCategories from "../../Components/ScreensLayout/SeatCategories";
import LayoutMetrics from "../../Components/ScreensLayout/LayoutMetrics";
import SeatingGrid from "../../Components/ScreensLayout/SeatingGrid";

import { useScreenLayout } from "../../Hooks/useScreenLayout";

function ScreensLayout() {
  const [searchParams] = useSearchParams();

  const screenId = searchParams.get("screenId")?.trim() ?? "";

  const {
    data,
    isLoading,
    error,
    isPending,

    targetCapacity,
    rowCount,
    colCount,
    seats,
    selectedTier,

    rowLabels,
    activeCount,
    tierBreakdown,
    isOverCapacity,

    setTargetCapacity,
    setSelectedTier,

    handleDimensionChange,
    handleReset,
    applyTierToSeat,
    handlePublishLayout,
  } = useScreenLayout({ screenId });

  if (error) {
    return <ErrorState />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8 select-none">
      {/* Header */}
      <LayoutHeader
        onReset={handleReset}
        onPublish={handlePublishLayout}
        isPending={isPending}
        isOverCapacity={isOverCapacity}
      />

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <VenueBounds
          screenName={data?.screen?.screen_name}
          targetCapacity={targetCapacity}
          rowCount={rowCount}
          colCount={colCount}
          onCapacityChange={setTargetCapacity}
          onDimensionChange={handleDimensionChange}
        />

        <div className="lg:col-span-3 space-y-6">
          <SeatCategories
            selectedTier={selectedTier}
            onSelectTier={setSelectedTier}
          />

          <LayoutMetrics
            activeCount={activeCount}
            targetCapacity={targetCapacity}
            isOverCapacity={isOverCapacity}
            tierBreakdown={tierBreakdown}
          />
        </div>
      </div>

      {/* Seating Grid */}
      <SeatingGrid
        seats={seats}
        rowLabels={rowLabels}
        onApplyTier={applyTierToSeat}
      />
    </div>
  );
}

export default ScreensLayout;
