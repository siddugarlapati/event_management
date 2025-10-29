import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const services = [
  {
    id: 1,
    name: "Weddings",
    icon: "💍",
    description: "Create the wedding of your dreams with our comprehensive planning services.",
    features: [
      "Venue selection and management",
      "Catering coordination",
      "Decoration and ambiance design",
      "Photography and videography",
      "Guest management and logistics",
    ],
  },
  {
    id: 2,
    name: "Corporate Events",
    icon: "🏢",
    description: "Professional event management for conferences, seminars, and corporate gatherings.",
    features: [
      "Conference planning and coordination",
      "Audio-visual setup",
      "Catering and hospitality",
      "Registration and ticketing",
      "Post-event reporting and analytics",
    ],
  },
  {
    id: 3,
    name: "Concerts & Performances",
    icon: "🎵",
    description: "Bring your musical vision to life with our entertainment event expertise.",
    features: [
      "Artist booking and management",
      "Sound and lighting design",
      "Stage setup and production",
      "Crowd management",
      "Technical support and coordination",
    ],
  },
  {
    id: 4,
    name: "House Warmings",
    icon: "🏠",
    description: "Celebrate your new home with a memorable housewarming party.",
    features: [
      "Theme and decoration planning",
      "Guest list management",
      "Catering services",
      "Entertainment options",
      "Setup and cleanup services",
    ],
  },
];

export default function Services() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-12 gradient-blush">
        <div className="container max-w-6xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting unforgettable experiences. Explore our bespoke event planning services, tailored to create moments you'll cherish forever.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="luxury-card space-y-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon and Title */}
                <div className="space-y-3">
                  <div className="text-5xl">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground">{service.name}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg mt-4"
                  onClick={() => setLocation("/contact")}
                >
                  Inquire About {service.name}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 gradient-lavender">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Why Choose ArtCulture?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring creativity, professionalism, and attention to detail to every event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Our experienced professionals have planned hundreds of successful events.",
              },
              {
                title: "Custom Solutions",
                description: "Every event is unique. We tailor our services to your specific needs.",
              },
              {
                title: "Vendor Network",
                description: "Access to our curated network of premium vendors and service providers.",
              },
              {
                title: "Attention to Detail",
                description: "We handle every aspect, so you can focus on enjoying your event.",
              },
              {
                title: "Transparent Pricing",
                description: "Clear, upfront pricing with no hidden fees or surprises.",
              },
              {
                title: "24/7 Support",
                description: "Our team is available whenever you need us, before and during your event.",
              },
            ].map((item, idx) => (
              <div key={idx} className="luxury-card text-center space-y-3">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Plan Your Event?
          </h2>
          <p className="text-lg text-muted-foreground">
            Get in touch with our team to discuss your vision and receive a personalized proposal.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
            onClick={() => setLocation("/contact")}
          >
            Start Planning
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
