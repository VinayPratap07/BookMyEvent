import { useQuery } from "@tanstack/react-query";
import HeroSection from "../Components/Hero.Section";
import Card from "../Components/card";
import { getAllEvents } from "../API/ShowApi";
import LoadingScreen from "../Components/Loading";
import ErrorState from "../Components/Error";
import type { Show } from "../API/API_Response";

function HomePage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorState />;
  }

  return (
    <div>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.show.map((event: Show) => (
            <Card key={event.event_id} shows={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
