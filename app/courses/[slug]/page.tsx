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
    description: "Learn to convert SQL or relational models to the document model, design data relationships, and enforce schema validation. Enhance your ability to create efficient, well-structured applications with robust data models.",
    duration: "1.25 Hours",
    isFree: true,
    type: "skill",
    topics: ["Data Modeling", "Developer", "Essentials"],
    videoId: "EE8ZTQxa0AM", // MongoDB Introduction video
    objectives: [
      {
        title: "Model for Workloads",
        description: "Map the relational model to the document model and apply the methodology to data modeling.",
      },
      {
        title: "Design Relationships",
        description: "Identify and model relationships between entities using embedding and referencing patterns.",
      },
      {
        title: "Validate Schemas",
        description: "Implement schema validation rules to enforce document structure and data integrity.",
      },
    ],
    content: [
      "If you're a developer with experience in SQL and relational databases, but new to document databases, this Relational to Document Model Skill Badge is designed to help you bridge that gap. In this badge, you'll learn how to take the data modeling knowledge you already have and apply it to the document model – a structure optimized for modern, performance-driven applications.",
      "Traditional relational data modeling often starts by defining normalized tables, their relationships, and constraints. In contrast, document databases encourage a different way of thinking. Here, the goal is to design documents that reflect how your application actually accesses data. Instead of separating data into multiple tables, you'll learn to group related data together – because in document databases, data that is accessed together should be stored together. This principle is at the heart of efficient schema design.",
      "You'll start by identifying the workload of an application – in this case, a bookstore that sells audiobooks, eBooks, and print titles. Using this practical example, you'll map out which pieces of data (or entities) your application manages, how those entities interact, and how they change over time. With this context, you'll explore the second phase of schema design: identifying the relationships between those entities and understanding how to model them in a document database.",
      "Throughout the badge, you'll draw connections between familiar SQL concepts and document database features. For example, you'll see how schema validation can be used to enforce structure and constraints, just like you're used to in a relational setup – but with more flexibility. You'll apply validation rules to a reviews collection in the bookstore app, gaining hands-on experience with powerful schema design tools. Labs are integrated throughout the course to give you opportunities to practice what you learn in real-world scenarios. These interactive exercises are designed to reinforce your understanding and build your confidence as you transition from SQL to document databases.",
      "When data is stored separately, the cost is two or more retrievals. But if we store it together, we only have to retrieve data once.",
      "Once we've identified a workload and the entities in our bookstore application, we will apply the second phase of the schema design methodology, identifying and modeling the relationships that exist between those entities. We'll cover the different types of relationships that are possible with document databases and consider how they apply to the relationships between the entities in our bookstore application.",
      "To further apply your prior SQL knowledge, we'll explore how schema validation lets you enforce the rules governing the structure of the documents in your application.",
      "To learn more about this, we'll set up schema validation rules for reviews collection in our bookstore app. You'll have plenty of opportunities to practice what you learned by completing labs that present real world scenarios.",
      "This way, you'll build your knowledge and get comfortable with the software at the same time.",
      "When you're finished, you'll be ready to put your new skills to the test.",
      "To earn your badge, simply complete all the related content and then take the short test at the end. After passing the test, you'll receive an official Credly badge via the email you provided. Be sure to share your badge on LinkedIn to show off your new skills.",
    ],
  },
  "schema-patterns": {
    title: "Schema Patterns and Anti-patterns",
    description: "How to apply schema design patterns and identify anti-patterns. Learn best practices for designing efficient document schemas.",
    duration: "1.5 Hours",
    isFree: true,
    type: "skill",
    topics: ["Schema Design", "Best Practices", "Developer"],
    videoId: "leNCfU5SYR8", // MongoDB Schema Design video
    objectives: [
      {
        title: "Understand Patterns",
        description: "Learn common schema design patterns used in document databases.",
      },
      {
        title: "Identify Anti-patterns",
        description: "Recognize and avoid common schema design mistakes.",
      },
      {
        title: "Apply Best Practices",
        description: "Implement schema patterns effectively in your applications.",
      },
    ],
    content: [
      "Schema design is crucial for building performant applications. This course teaches you the patterns that work and the anti-patterns to avoid.",
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
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
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Who is this Course Good for?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {course.content[0]}
                  </p>

                  {/* Badge Card */}
                  <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                    <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex flex-col items-center justify-center p-4 border border-primary/20">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        VBUV Skill
                      </span>
                      <h3 className="text-sm font-bold text-foreground text-center mb-3">
                        {course.title}
                      </h3>
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-foreground leading-relaxed">
                        Upon completion of the <strong>{course.title}</strong> skill check, you will earn a Credly Badge that you are able to share with your network.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Learning Objectives */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-8">
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
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {objective.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {objective.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* What to Expect */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    What to Expect in this Course
                  </h2>
                  <div className="space-y-6 text-muted-foreground leading-relaxed">
                    {course.content.slice(1).map((paragraph, contentIndex) => (
                      <p key={`content-${contentIndex}`}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                {/* Let's Get Started */}
                <section className="mb-12">
                  <h2 className="text-xl font-bold text-foreground">
                    Let's get started.
                  </h2>
                </section>
              </div>
            )}

            {activeTab === "authors" && (
              <div className="animate-fade-in py-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Course Authors</h2>
                <p className="text-muted-foreground">
                  This course was created by expert instructors with years of industry experience.
                </p>
              </div>
            )}

            {activeTab === "testimonials" && (
              <div className="animate-fade-in py-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">What Learners Say</h2>
                <p className="text-muted-foreground">
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