import { useLocation } from "wouter";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { APP_TITLE } from "@/const";

export default function Footer() {
  const [, setLocation] = useLocation();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Vendors", href: "/vendors" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent">{APP_TITLE}</h3>
            <p className="text-sm text-background/80">
              Creating unforgettable moments for your most cherished events.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-accent">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => setLocation(link.href)}
                    className="text-sm text-background/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-accent">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Mail size={16} className="text-accent" />
                <a href="mailto:hello@artculture.com" className="hover:text-accent transition-colors">
                  hello@artculture.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/80">
                <Phone size={16} className="text-accent" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/80">
                <MapPin size={16} className="text-accent mt-0.5" />
                <span>123 Event Street, City, State 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-accent">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background/10 hover:bg-accent/20 rounded-lg transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} className="text-accent" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/80">
            <p>© 2025 {APP_TITLE}. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Terms of Service
              </a>
              <button
                onClick={() => setLocation("/contact")}
                className="hover:text-accent transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
