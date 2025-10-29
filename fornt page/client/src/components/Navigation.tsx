import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { useTheme } from "@/contexts/ThemeContext";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Vendors", href: "/vendors" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-border"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setLocation("/")}
          >
            {APP_LOGO && (
              <img
                src={APP_LOGO}
                alt={APP_TITLE}
                className="h-8 w-8 rounded-full"
              />
            )}
            <span className="font-bold text-lg text-primary hidden sm:inline">
              {APP_TITLE}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => setLocation(link.href)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} className="text-accent" />
              ) : (
                <Moon size={20} className="text-primary" />
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {user?.role === "admin" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setLocation("/admin")}
                    className="hidden sm:inline-flex"
                  >
                    Dashboard
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => (window.location.href = getLoginUrl())}
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-accent/10 rounded-lg"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in-up">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  setLocation(link.href);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            {user?.role === "admin" && (
              <button
                onClick={() => {
                  setLocation("/admin");
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-foreground hover:bg-accent/10 rounded-lg transition-colors"
              >
                Dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
