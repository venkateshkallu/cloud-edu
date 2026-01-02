import { Clock, Award, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Clock,
    title: "Short Form Learning",
    description: "60 - 90 minute content allowing you to quickly validate specific skills at your own pace.",
  },
  {
    icon: Award,
    title: "Digital Proof of Completion",
    description: "Claim your Skills badge and share your achievements with your network.",
  },
  {
    icon: CheckCircle2,
    title: "Validate Your Skills",
    description: "Complete the content and go through a 10 questions assessment to test your knowledge of the content.",
  },
  {
    icon: Users,
    title: "Level Up your Marketability",
    description: "Along side your Skills Badge you are added to our talent directory making you visible to recruiters in the industry.",
  },
];

export const SkillsProgramSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            Explore our New Skills Program
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex gap-5 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button variant="hero" size="lg">
            View Skills
          </Button>
        </div>
      </div>
    </section>
  );
};