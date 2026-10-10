import HeroSection from "../Components/Hero.Section";
import Card from "../Components/card";

//Sample data
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Prateek Kuhad: The Silhouettes Tour",
    category: "Music",
    date: "Sat, Nov 28 • 6:30 PM",
    location: "JLN Stadium, Delhi",
    price: 1499,
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewCount: 320,
    isLiked: false,
  },
  {
    id: 2,
    title: "Bass Camp: Anubhav Singh Bassi Live",
    category: "Comedy",
    date: "Sun, Dec 06 • 8:00 PM",
    location: "Siri Fort Auditorium, Delhi",
    price: 799,
    imageUrl:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewCount: 1250,
    isLiked: true,
  },
];

function HomePage() {
  return (
    <div>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLE_EVENTS.map((event) => (
            <Card key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
