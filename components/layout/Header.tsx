"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const topNavItems = [
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Solutions", href: "/solutions", hasDropdown: true },
  { label: "Company", href: "/company", hasDropdown: true },
  { label: "Pricing", href: "/pricing", hasDropdown: false },
];

const universityNavItems = [
  { label: "Self-paced Learning", href: "/courses", hasDropdown: true },
  { label: "Instructor-led Training", href: "/training", hasDropdown: true },
  { label: "Credentials", href: "/credentials", hasDropdown: true },
  { label: "Skills", href: "/skills", hasDropdown: false },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation Group */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/favicon_io/favicon-32x32.png"
                  alt="Azure LearnHub"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-gray-900 font-bold text-xl tracking-tight">
                  Azure LearnHub
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1">
                {topNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* University Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 h-14">
            {/* University Brand and Navigation Group */}
            <div className="flex items-center gap-8">
              {/* University Brand */}
              <Link href="/" className="flex items-center gap-2">
                <span className="text-gray-900 font-semibold text-lg">
                  Azure LearnHub University
                </span>
              </Link>

              {/* University Navigation - Adjacent to brand */}
              <nav className="hidden lg:flex items-center gap-6">
                {universityNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {topNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4">
              {universityNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;