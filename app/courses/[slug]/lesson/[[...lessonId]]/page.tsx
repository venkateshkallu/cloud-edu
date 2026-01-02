"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Home, X, ChevronDown, ChevronRight, ArrowRight, Menu, MessageSquare, FileText, Image, StickyNote, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock lesson data
const courseLessons: Record<string, {
  title: string;
  modules: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      type: "video" | "lab";
      videoId?: string;
      completed: boolean;
    }>;
  }>;
}> = {
  "relational-to-document-model": {
    title: "Relational to Document Model",
    modules: [
      {
        id: "model-workloads",
        title: "Model for Workloads",
        lessons: [
          {
            id: "video-relational-document",
            title: "Video: Relational to Document Model",
            type: "video",
            videoId: "GtD93tVZDX4",
            completed: false,
          },
          {
            id: "lab-relational-document",
            title: "Lab: Relational to Document Model",
            type: "lab",
            completed: false,
          },
          {
            id: "video-identifying-entities",
            title: "Video: Identifying and Quantifying Entities",
            type: "video",
            videoId: "leNNivaQbDY",
            completed: false,
          },
          {
            id: "video-identifying-reads",
            title: "Video: Identifying Reads and Writes",
            type: "video",
            videoId: "dQw4w9WgXcQ",
            completed: false,
          },
          {
            id: "video-quantifying-reads",
            title: "Video: Quantifying Reads and Writes",
            type: "video",
            videoId: "rPqRyYJmx2g",
            completed: false,
          },
        ],
      },
      {
        id: "design-relationships",
        title: "Design Relationships",
        lessons: [
          {
            id: "video-relationships-intro",
            title: "Video: Introduction to Relationships",
            type: "video",
            videoId: "3GHZd0zv170",
            completed: false,
          },
          {
            id: "video-embedding",
            title: "Video: Embedding Documents",
            type: "video",
            videoId: "XIxLcSK8KGU",
            completed: false,
          },
          {
            id: "lab-relationships",
            title: "Lab: Designing Relationships",
            type: "lab",
            completed: false,
          },
        ],
      },
      {
        id: "validate-schemas",
        title: "Validate Schemas",
        lessons: [
          {
            id: "video-schema-validation",
            title: "Video: Schema Validation Basics",
            type: "video",
            videoId: "Kk6Er0c7srU",
            completed: false,
          },
          {
            id: "lab-schema-validation",
            title: "Lab: Schema Validation",
            type: "lab",
            completed: false,
          },
        ],
      },
      {
        id: "conclusion",
        title: "Conclusion",
        lessons: [
          {
            id: "video-summary",
            title: "Video: Course Summary",
            type: "video",
            videoId: "GtD93tVZDX4",
            completed: false,
          },
        ],
      },
    ],
  },
  "schema-patterns": {
    title: "Schema Patterns and Anti-patterns",
    modules: [
      {
        id: "patterns-intro",
        title: "Introduction to Patterns",
        lessons: [
          {
            id: "video-patterns-intro",
            title: "Video: Schema Patterns Overview",
            type: "video",
            videoId: "leNNivaQbDY",
            completed: false,
          },
        ],
      },
    ],
  },
};

const sidebarSections = [
  { id: "resources", label: "Resources & Forums", icon: MessageSquare },
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "notes", label: "Notes", icon: StickyNote },
];

export default function LessonPlayer() {
  const params = useParams();
  const slug = params.slug as string;
  const lessonId = params.lessonId ? (params.lessonId as string[])[0] : undefined;
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>(["model-workloads"]);

  const course = slug ? courseLessons[slug] : null;

  // Find current lesson
  let currentLesson: typeof courseLessons[string]["modules"][0]["lessons"][0] | null = null;
  let currentModule: typeof courseLessons[string]["modules"][0] | null = null;
  let currentLessonIndex = 0;
  let allLessons: typeof courseLessons[string]["modules"][0]["lessons"] = [];

  if (course) {
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        allLessons.push(lesson);
      });
    });

    if (lessonId) {
      course.modules.forEach((module) => {
        const found = module.lessons.find((l) => l.id === lessonId);
        if (found) {
          currentLesson = found;
          currentModule = module;
        }
      });
    }

    if (!currentLesson && allLessons.length > 0) {
      currentLesson = allLessons[0];
      currentModule = course.modules[0];
    }

    currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  }

  const nextLesson = allLessons[currentLessonIndex + 1];

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Course not found</h1>
          <Button asChild variant="hero">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header */}
      <header className="bg-card border-b border-border h-14 flex items-center px-4 sticky top-0 z-50">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Home className="w-5 h-5 text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-primary">
            {course.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <span className="font-bold text-foreground hidden md:block">VBUV University</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-card border-r border-border flex flex-col transition-all duration-300 overflow-hidden",
            sidebarOpen ? "w-80" : "w-0"
          )}
        >
          {/* Hide/Show Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-4 font-medium hover:bg-primary/90 transition-colors"
          >
            <X className="w-4 h-4" />
            Hide
          </button>

          {/* Lessons Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="bg-primary text-primary-foreground py-3 px-4 font-semibold">
              Lessons
            </div>

            <div className="p-2">
              {course.modules.map((module) => (
                <div key={module.id} className="mb-2">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-secondary rounded-lg transition-colors"
                  >
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium text-foreground">
                      {module.title}
                    </span>
                  </button>

                  {/* Lessons */}
                  {expandedModules.includes(module.id) && (
                    <div className="ml-4 space-y-1 mt-1">
                      {module.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/courses/${slug}/lesson/${lesson.id}`}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            currentLesson?.id === lesson.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <span className="flex-1 line-clamp-2">{lesson.title}</span>
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full border-2 flex-shrink-0",
                              currentLesson?.id === lesson.id
                                ? "bg-primary border-primary"
                                : lesson.completed
                                ? "bg-skill border-skill"
                                : "border-muted-foreground"
                            )}
                          />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Sections */}
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                className="flex items-center gap-3 w-full bg-primary text-primary-foreground py-3 px-4 font-medium hover:bg-primary/90 transition-colors"
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>

          {/* Bottom Links */}
          <div className="border-t border-border p-4 flex items-center justify-between">
            <Link href="/faq" className="text-primary font-medium text-sm hover:underline flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              FAQ'S
            </Link>
            <Button variant="ghost" size="sm" className="text-primary">
              SIGN IN
            </Button>
          </div>
        </aside>

        {/* Show Sidebar Button (when hidden) */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed left-0 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-r-lg shadow-lg hover:bg-primary/90 transition-colors z-40"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            {/* Breadcrumb & Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Link
                  href={`/courses/${slug}`}
                  className="text-foreground font-semibold hover:text-primary transition-colors"
                >
                  {course.title}
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-primary font-medium">
                  {currentModule?.title}
                </span>
              </div>

              {nextLesson && (
                <Link
                  href={`/courses/${slug}/lesson/${nextLesson.id}`}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  Next
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary-foreground" />
                  </div>
                </Link>
              )}
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-secondary rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{
                  width: `${((currentLessonIndex + 1) / allLessons.length) * 100}%`,
                }}
              />
            </div>

            {/* Video Player */}
            {currentLesson?.type === "video" && currentLesson.videoId && (
              <div className="aspect-video bg-hero rounded-xl overflow-hidden shadow-xl mb-8">
                <iframe
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?rel=0`}
                  title={currentLesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Lab Content */}
            {currentLesson?.type === "lab" && (
              <div className="bg-card border border-border rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {currentLesson.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Complete this hands-on lab to practice what you've learned. Follow the instructions below to complete the exercises.
                </p>
                <Button variant="hero" size="lg">
                  Start Lab
                </Button>
              </div>
            )}

            {/* Lesson Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-3">
                {currentLesson?.title}
              </h2>
              <p className="text-muted-foreground">
                {currentLesson?.type === "video"
                  ? "Watch this video to learn the key concepts. Take notes and practice the techniques demonstrated."
                  : "Complete this lab exercise to reinforce your understanding through hands-on practice."}
              </p>

              {/* Mark Complete Button */}
              <div className="mt-6 flex items-center gap-4">
                <Button variant="hero">
                  Mark as Complete
                </Button>
                {nextLesson && (
                  <Button asChild variant="outline">
                    <Link href={`/courses/${slug}/lesson/${nextLesson.id}`}>
                      Continue to Next Lesson
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}