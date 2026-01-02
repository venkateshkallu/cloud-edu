"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="bg-blue-900 py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in whitespace-nowrap">
            Learn{" "}
            <span className="text-green-400">Azure</span>
            {" "}and Advance Your Career.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in whitespace-nowrap" style={{ animationDelay: "0.1s" }}>
            Build skills for your future with hands-on training and certifications
          </p>

          {/* Search Bar */}
          <div className="relative max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden flex items-center">
              <div className="flex-1 flex items-center px-6">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Find courses, certifications, or topics"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <Button 
                className="m-2 bg-blue-800 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};