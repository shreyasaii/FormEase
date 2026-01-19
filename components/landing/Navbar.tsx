"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Languages", href: "#languages" },
  { label: "Privacy", href: "#privacy" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border backdrop-blur-sm">
      <div className="container-width px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo → Landing Page (/app) */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold">FormEase</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="default"
              onClick={() => router.push("/app")}
            >
              Try Demo
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={() => router.push("/app")}
            >
              Upload Form
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/app");
                  }}
                >
                  Try Demo
                </Button>
                <Button
                  variant="default"
                  size="default"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/app");
                  }}
                >
                  Upload Form
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
