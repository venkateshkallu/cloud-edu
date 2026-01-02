"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseCategories } from "./CourseCategories";
import { CourseCard } from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "Relational to Document Model",
    description: "How to model for workloads, design relationships, and validate schemas.",
    type: "skill" as const,
    isFree: true,
    slug: "relational-to-document-model",
    category: "popular",
  },
  {
    id: 2,
    title: "Schema Patterns and Anti-patterns",
    description: "How to apply schema design patterns and identify anti-patterns.",
    type: "skill" as const,
    isFree: true,
    slug: "schema-patterns",
    category: "popular",
  },
  {
    id: 3,
    title: "Building AI-Powered Search with Vector Search",
    description: "How to use Vector Search for AI-Powered search applications.",
    type: "skill" as const,
    isFree: true,
    slug: "vector-search",
    category: "popular",
  },
  {
    id: 4,
    title: "CRUD Operations Fundamentals",
    description: "How to perform CRUD operations in modern applications.",
    type: "skill" as const,
    isFree: true,
    slug: "crud-operations",
    category: "skills",
  },
  {
    id: 5,
    title: "VB100: Database & Security",
    description: "Basics: Explore how to harness database capabilities for secure applications.",
    type: "training" as const,
    isFree: false,
    slug: "vb100-database-security",
    category: "instructor",
  },
  {
    id: 6,
    title: "VB200: Optimizations & Performance",
    description: "Understand the fundamentals of indexing in theory and practice.",
    type: "training" as const,
    isFree: false,
    slug: "vb200-optimizations",
    category: "instructor",
  },
  {
    id: 7,
    title: "Building RAG Apps Using Modern Stack",
    description: "How to build and optimize RAG applications using modern technologies.",
    type: "skill" as const,
    isFree: true,
    slug: "rag-apps",
    category: "skills",
  },
  {
    id: 8,
    title: "Aggregation Fundamentals",
    description: "How to build aggregation pipelines to process, transform, and analyze data.",
    type: "skill" as const,
    isFree: true,
    slug: "aggregation-fundamentals",
    category: "popular",
  },
  {
    id: 9,
    title: "VB300: Production Readiness",
    description: "Ensure high availability with Replication, Sharding, and Monitoring.",
    type: "training" as const,
    isFree: false,
    slug: "vb300-production",
    category: "instructor",
  },
];

export const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState("popular");

  const filteredCourses = courses.filter((course) => {
    if (activeCategory === "popular") return true;
    if (activeCategory === "skills") return course.type === "skill";
    if (activeCategory === "instructor") return course.type === "training";
    return course.category === activeCategory;
  });

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <CourseCategories
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.slice(0, 6).map((course, index) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              type={course.type}
              isFree={course.isFree}
              slug={course.slug}
              delay={index * 100}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="hero" size="lg">
            View Full Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};