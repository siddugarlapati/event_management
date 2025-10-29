import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const portfolioItems = [
  {
    id: 1,
    title: "Elegant Garden Wedding",
    category: "Weddings",
    image: "https://via.placeholder.com/400x300?text=Garden+Wedding",
    clientName: "Sarah & John",
    testimonial: "ArtCulture made our wedding day absolutely perfect. Every detail was flawless!",
    rating: 5,
  },
  {
    id: 2,
    title: "Corporate Tech Summit",
    category: "Corporate",
    image: "https://via.placeholder.com/400x300?text=Tech+Summit",
    clientName: "TechCorp Inc.",
    testimonial: "Professional, organized, and exceeded all our expectations.",
    rating: 5,
  },
  {
    id: 3,
    title: "Jazz Concert Evening",
    category: "Concerts",
    image: "https://via.placeholder.com/400x300?text=Jazz+Concert",
    clientName: "Music Lovers Club",
    testimonial: "The atmosphere was magical. Perfectly executed event!",
    rating: 5,
  },
  {
    id: 4,
    title: "Modern House Warming",
    category: "House Warmings",
    image: "https://via.placeholder.com/400x300?text=House+Warming",
    clientName: "The Johnson Family",
    testimonial: "Our friends are still talking about how amazing it was!",
    rating: 5,
  },
  {
    id: 5,
    title: "Luxury Beach Wedding",
    category: "Weddings",
    image: "https://via.placeholder.com/400x300?text=Beach+Wedding",
    clientName: "Emma & Michael",
    testimonial: "Stunning execution. ArtCulture is the best in the business.",
    rating: 5,
  },
  {
    id: 6,
    title: "Annual Gala Dinner",
    category: "Corporate",
    image: "https://via.placeholder.com/400x300?text=Gala+Dinner",
    clientName: "Luxury Foundation",
    testimonial: "Elegance and sophistication at every turn.",
    rating: 5,
  },
];

const categories = ["All", "Weddings", "Corporate", "Concerts", "House Warmings"];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof portfolioItems[0] | null>(null);
  const [, setLocation] = useLocation();

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-12 gradient-blush">
        <div className="container max-w-6xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Our Past Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the magic we've created for our clients. Each event is a masterpiece of planning and execution.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "border-primary text-primary hover:bg-primary/5"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-bold">
                      View Details
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-primary mb-2">{item.category}</p>
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-foreground text-white p-2 rounded-lg hover:bg-foreground/80 transition-colors z-10"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {selectedImage.title}
                </h2>
                <p className="text-primary font-semibold mb-4">{selectedImage.category}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">Client Testimonial</h3>
                <div className="bg-card p-4 rounded-lg space-y-3">
                  <p className="text-foreground italic">"{selectedImage.testimonial}"</p>
                  <p className="text-sm text-muted-foreground">— {selectedImage.clientName}</p>
                  <div className="flex gap-1">
                    {[...Array(selectedImage.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg"
                onClick={() => {
                  setSelectedImage(null);
                  setLocation("/contact");
                }}
              >
                Start Your Event Planning
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 gradient-lavender">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Create Your Own Masterpiece?
          </h2>
          <p className="text-lg text-muted-foreground">
            Let us bring your event vision to life with the same excellence and attention to detail.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
            onClick={() => setLocation("/contact")}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
