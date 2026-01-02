import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  title: string;
  description: string;
  type: "skill" | "training" | "course";
  isFree?: boolean;
  slug: string;
  delay?: number;
}

const typeLabels = {
  skill: "SKILL",
  training: "INSTRUCTOR-LED TRAINING",
  course: "COURSE",
};

const typeStyles = {
  skill: "bg-skill text-primary-foreground",
  training: "bg-training text-primary-foreground",
  course: "bg-primary text-primary-foreground",
};

export const CourseCard = ({ title, description, type, isFree = true, slug, delay = 0 }: CourseCardProps) => {
  return (
    <Link
      href={`/courses/${slug}`}
      className="group block bg-card rounded-2xl p-6 card-shadow border border-border/50 hover:border-primary/20 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Badge */}
      <div className="mb-4">
        <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider", typeStyles[type])}>
          {typeLabels[type]}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-sm font-medium text-muted-foreground">
          {isFree ? "Free" : "Paid"}
        </span>
        <div className="flex items-center gap-2 text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
          Get Started
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};