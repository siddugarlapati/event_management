import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Star, ArrowRight } from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-32 gradient-blush overflow-hidden">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Your Perfect Event Brought to Life
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From intimate gatherings to grand celebrations, ArtCulture creates unforgettable moments for weddings, concerts, and more.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Trusted by 1000+ clients</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                  onClick={() => setLocation("/contact")}
                >
                  Start Planning
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 rounded-lg"
                  onClick={() => setLocation("/services")}
                >
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="hidden md:block">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center shadow-lg">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg">Event Showcase</p>
                  <p className="text-sm">Premium imagery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our bespoke event planning services, tailored to create moments you'll cherish forever.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Weddings", icon: "💍" },
              { name: "Corporate", icon: "🏢" },
              { name: "Concerts", icon: "🎵" },
              { name: "House Warmings", icon: "🏠" },
            ].map((service) => (
              <div
                key={service.name}
                className="luxury-card card-hover cursor-pointer group"
                onClick={() => setLocation("/services")}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Expertly crafted {service.name.toLowerCase()} experiences
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-lg"
              onClick={() => setLocation("/services")}
            >
              View All Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 gradient-lavender">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Past Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the magic we've created for our clients
            </p>
          </div>

          {/* Portfolio Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-muted-foreground">Event {i}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-lg"
              onClick={() => setLocation("/portfolio")}
            >
              View Full Portfolio
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Plan Your Dream Event?
          </h2>
          <p className="text-lg text-muted-foreground">
            Get in touch with our team to discuss your vision and create an unforgettable experience.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
            onClick={() => setLocation("/contact")}
          >
            Contact Us Today
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
