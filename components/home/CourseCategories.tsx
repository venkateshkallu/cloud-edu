"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "popular", label: "Popular Training" },
  { id: "skills", label: "Skills" },
  { id: "self-paced", label: "Self-paced Learning" },
  { id: "instructor", label: "Instructor-led Training" },
  { id: "labs", label: "Labs" },
];

interface CourseCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CourseCategories = ({ activeCategory, onCategoryChange }: CourseCategoriesProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
            activeCategory === category.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};