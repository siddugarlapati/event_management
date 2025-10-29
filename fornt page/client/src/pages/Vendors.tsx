import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const vendorData = [
  {
    id: 1,
    name: "Gourmet Catering Co.",
    category: "Caterers",
    location: "Downtown",
    description: "Premium catering services with international cuisine expertise.",
    rating: 5,
    email: "info@gourmetcatering.com",
    phone: "+1 (234) 567-8901",
    website: "www.gourmetcatering.com",
  },
  {
    id: 2,
    name: "Elegant Decorations",
    category: "Decorators",
    location: "Midtown",
    description: "Stunning floral and event decoration designs.",
    rating: 5,
    email: "hello@elegantdecor.com",
    phone: "+1 (234) 567-8902",
    website: "www.elegantdecor.com",
  },
  {
    id: 3,
    name: "Lens & Light Photography",
    category: "Photographers",
    location: "Uptown",
    description: "Professional photography capturing your special moments.",
    rating: 5,
    email: "contact@lensandlight.com",
    phone: "+1 (234) 567-8903",
    website: "www.lensandlight.com",
  },
  {
    id: 4,
    name: "Harmony Entertainment",
    category: "Performers",
    location: "Downtown",
    description: "Live bands, DJs, and entertainment for all occasions.",
    rating: 5,
    email: "booking@harmonyent.com",
    phone: "+1 (234) 567-8904",
    website: "www.harmonyent.com",
  },
  {
    id: 5,
    name: "Grand Ballroom Venue",
    category: "Venues",
    location: "Downtown",
    description: "Luxurious venue with state-of-the-art facilities.",
    rating: 5,
    email: "reservations@grandballroom.com",
    phone: "+1 (234) 567-8905",
    website: "www.grandballroom.com",
  },
  {
    id: 6,
    name: "Taste of Italy Catering",
    category: "Caterers",
    location: "Midtown",
    description: "Authentic Italian cuisine and traditional recipes.",
    rating: 5,
    email: "orders@tasteofit aly.com",
    phone: "+1 (234) 567-8906",
    website: "www.tasteofitaly.com",
  },
];

const categories = ["All", "Caterers", "Decorators", "Photographers", "Performers", "Venues"];
const locations = ["All", "Downtown", "Midtown", "Uptown"];

export default function Vendors() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [, setLocation] = useLocation();

  const filteredVendors = vendorData.filter((vendor) => {
    const categoryMatch = selectedCategory === "All" || vendor.category === selectedCategory;
    const locationMatch = selectedLocation === "All" || vendor.location === selectedLocation;
    return categoryMatch && locationMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-12 gradient-blush">
        <div className="container max-w-6xl mx-auto px-4 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            Our Vendor Network
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with our curated network of premium vendors and service providers.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
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

          {/* Location Filter */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Location</h3>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={selectedLocation === location ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${
                    selectedLocation === location
                      ? "bg-primary text-white"
                      : "border-primary text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          {filteredVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <div key={vendor.id} className="luxury-card space-y-4">
                  {/* Vendor Header */}
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-2xl">🏢</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{vendor.name}</h3>
                    <p className="text-sm text-primary font-semibold">{vendor.category}</p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm">{vendor.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(vendor.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({vendor.rating}.0)</span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <a
                      href={`mailto:${vendor.email}`}
                      className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      <Mail size={16} className="text-primary" />
                      {vendor.email}
                    </a>
                    <a
                      href={`tel:${vendor.phone}`}
                      className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      <Phone size={16} className="text-primary" />
                      {vendor.phone}
                    </a>
                    <a
                      href={`https://${vendor.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      <Globe size={16} className="text-primary" />
                      {vendor.website}
                    </a>
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg mt-4"
                    onClick={() => setLocation("/contact")}
                  >
                    Contact Vendor
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No vendors found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-lavender">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Need Help Choosing Vendors?
          </h2>
          <p className="text-lg text-muted-foreground">
            Our team can help you select the perfect vendors for your event.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
            onClick={() => setLocation("/contact")}
          >
            Contact Our Team
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
