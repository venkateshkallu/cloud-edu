"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Clock, CreditCard, Share2, Award, Target, CheckCircle2, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock course data
const courseData: Record<string, {
  title: string;
  description: string;
  duration: string;
  isFree: boolean;
  type: "skill" | "training";
  topics: string[];
  videoId: string;
  objectives: Array<{ title: string; description: string }>;
  content: string[];
}> = {
  "relational-to-document-model": {
    title: "Relational to Document Model",
    description: "Learn to migrate from traditional SQL databases to Azure Cosmos DB, design scalable data models, and implement best practices for cloud-native applications. Master the transition from relational to document-based data storage in Azure.",
    duration: "1.25 Hours",
    isFree: true,
    type: "skill",
    topics: ["Azure Cosmos DB", "Cloud Migration", "NoSQL"],
    videoId: "EE8ZTQxa0AM",
    objectives: [
      {
        title: "Design Cloud Data Models",
        description: "Learn to design efficient data models for Azure Cosmos DB and understand partitioning strategies for optimal performance.",
      },
      {
        title: "Migrate Existing Applications",
        description: "Understand migration patterns and best practices for moving from SQL Server to Azure Cosmos DB.",
      },
      {
        title: "Optimize Performance",
        description: "Implement indexing strategies and query optimization techniques for Azure Cosmos DB workloads.",
      },
    ],
    content: [
      "If you're a developer with experience in SQL Server and relational databases, but new to Azure Cosmos DB, this course is designed to help you bridge that gap. You'll learn how to take your existing database knowledge and apply it to Azure's globally distributed, multi-model database service – optimized for modern, cloud-native applications.",
      "Traditional relational data modeling in SQL Server often starts by defining normalized tables, relationships, and constraints. Azure Cosmos DB encourages a different approach. Here, the goal is to design documents and containers that reflect how your application accesses data in the cloud. Instead of separating data into multiple tables, you'll learn to group related data together – because in Azure Cosmos DB, data that is accessed together should be stored together for optimal performance and cost efficiency.",
      "You'll start by identifying the workload of a cloud application – in this case, an e-commerce platform that needs global distribution and high availability. Using this practical example, you'll map out which pieces of data your application manages, how they interact, and how they scale in the cloud. With this context, you'll explore Azure Cosmos DB's partitioning strategy and how to model relationships in a document database.",
      "Throughout the course, you'll draw connections between familiar SQL Server concepts and Azure Cosmos DB features. For example, you'll see how Azure Cosmos DB's schema flexibility compares to SQL Server's rigid schema requirements, and how to implement data validation and consistency models. You'll work with real Azure resources, gaining hands-on experience with the Azure portal, SDKs, and monitoring tools.",
      "When data is distributed globally, the cost of cross-partition queries can be significant. But if we design our partition strategy correctly, we can achieve single-partition queries for optimal performance.",
      "Once we've identified a workload and the entities in our e-commerce application, we will apply Azure Cosmos DB design patterns, identifying and modeling the relationships that exist between those entities. We'll cover different consistency levels, global distribution strategies, and how they apply to real-world scenarios.",
      "To further apply your SQL knowledge, we'll explore how Azure Cosmos DB handles transactions, indexing, and query optimization compared to traditional SQL Server approaches.",
      "To learn more about this, we'll set up an Azure Cosmos DB account, configure global distribution, and implement best practices for a production workload. You'll have plenty of opportunities to practice what you learned through hands-on labs in the Azure portal.",
      "This way, you'll build your knowledge of Azure services while getting comfortable with cloud-native database design patterns.",
      "When you're finished, you'll be ready to architect and implement Azure Cosmos DB solutions in production environments.",
      "To earn your badge, simply complete all the related content and then take the short assessment at the end. After passing, you'll receive an official Microsoft Learn badge that you can share on LinkedIn to showcase your Azure expertise.",
    ],
  },
  "schema-patterns": {
    title: "Azure SQL Database Design Patterns",
    description: "Master advanced design patterns for Azure SQL Database and Azure SQL Managed Instance. Learn best practices for cloud database architecture, performance optimization, and security implementation.",
    duration: "1.5 Hours",
    isFree: true,
    type: "skill",
    topics: ["Azure SQL", "Database Design", "Cloud Architecture"],
    videoId: "leNCfU5SYR8",
    objectives: [
      {
        title: "Implement Cloud Patterns",
        description: "Learn cloud-native database design patterns specific to Azure SQL Database and Managed Instance.",
      },
      {
        title: "Optimize Performance",
        description: "Understand indexing strategies, query optimization, and performance monitoring in Azure SQL.",
      },
      {
        title: "Ensure Security & Compliance",
        description: "Implement Azure SQL security features including Always Encrypted, Row Level Security, and compliance frameworks.",
      },
    ],
    content: [
      "Database design is crucial for building performant cloud applications. This course teaches you the patterns that work in Azure SQL Database and the anti-patterns to avoid when migrating to the cloud.",
    ],
  },
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "authors", label: "Authors" },
  { id: "testimonials", label: "Testimonials" },
];

export default function CourseDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeTab, setActiveTab] = useState("overview");

  const course = slug ? courseData[slug] : null;

  if (!course) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course not found</h1>
          <Button asChild variant="hero">
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Back Link */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {course.description}
            </p>

            {/* Tabs */}
            <div className="border-b border-border mb-8">
              <div className="flex gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-6 py-3 text-sm font-medium transition-all rounded-t-lg",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-black hover:text-black hover:bg-secondary"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="animate-fade-in">
                {/* Who is this Course Good for? */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    Who is this Course Good for?
                  </h2>
                  <p className="text-gray-800 leading-relaxed mb-6">
                    {course.content[0]}
                  </p>

                  {/* Badge Card */}
                  <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                    <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex flex-col items-center justify-center p-4 border border-primary/20">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        VBUV Skill
                      </span>
                      <h3 className="text-sm font-bold text-black text-center mb-3">
                        {course.title}
                      </h3>
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-black leading-relaxed">
                        Upon completion of the <strong>{course.title}</strong> skill check, you will earn a Credly Badge that you are able to share with your network.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Learning Objectives */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-black mb-8">
                    Learning Objectives
                  </h2>
                  <div className="space-y-6">
                    {course.objectives.map((objective, objIndex) => (
                      <div key={`objective-${objIndex}`} className="flex gap-5">
                        <div className="flex-shrink-0 w-20 h-20 bg-secondary rounded-xl flex items-center justify-center">
                          {objIndex === 0 && <Target className="w-8 h-8 text-primary" />}
                          {objIndex === 1 && <CheckCircle2 className="w-8 h-8 text-primary" />}
                          {objIndex === 2 && <BookOpen className="w-8 h-8 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-black mb-2">
                            {objective.title}
                          </h3>
                          <p className="text-gray-700">
                            {objective.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* What to Expect */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    What to Expect in this Course
                  </h2>
                  <div className="space-y-6 text-gray-800 leading-relaxed">
                    {course.content.slice(1).map((paragraph, contentIndex) => (
                      <p key={`content-${contentIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                {/* Let's Get Started */}
                <section className="mb-12">
                  <h2 className="text-xl font-bold text-black">
                    Let's get started.
                  </h2>
                </section>
              </div>
            )}

            {activeTab === "authors" && (
              <div className="animate-fade-in py-8">
                <h2 className="text-2xl font-bold text-black mb-6">Course Authors</h2>
                <p className="text-gray-800">
                  This course was created by expert instructors with years of industry experience.
                </p>
              </div>
            )}

            {activeTab === "testimonials" && (
              <div className="animate-fade-in py-8">
                <h2 className="text-2xl font-bold text-black mb-6">What Learners Say</h2>
                <p className="text-gray-800">
                  Read testimonials from learners who have completed this course.
                </p>
              </div>
            )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Course Info Card */}
                <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.title} (on-demand)
                  </p>

                  {/* Earn Skill Button */}
                  <Button asChild variant="hero" size="lg" className="w-full mb-6">
                    <Link href={`/courses/${slug}/lesson`}>Earn Skill</Link>
                  </Button>

                  {/* Duration & Price */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="text-foreground font-medium">
                        {course.isFree ? "FREE" : "Paid"}
                      </span>
                    </div>
                  </div>

                  {/* Intro Video */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Intro Video</h3>
                    <div className="aspect-video bg-hero rounded-xl overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${course.videoId}`}
                        title="Intro Video"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, topicIndex) => (
                        <span
                          key={`topic-${topicIndex}`}
                          className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Share */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Share This</h3>
                    <div className="flex gap-3">
                      <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}