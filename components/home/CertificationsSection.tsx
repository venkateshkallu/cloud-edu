import { Award } from "lucide-react";
import Link from "next/link";

const certifications = [
  {
    id: 1,
    title: "Azure Associate Developer Exam",
    slug: "associate-developer",
  },
  {
    id: 2,
    title: "Azure Associate Data Modeler Exam",
    slug: "associate-data-modeler",
  },
  {
    id: 3,
    title: "Azure Associate Administrator Exam",
    slug: "associate-administrator",
  },
  {
    id: 4,
    title: "Azure Associate Database Administrator Exam",
    slug: "associate-dba",
  },
];

export const CertificationsSection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Certifications
        </h2>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <Link
              key={cert.id}
              href={`/certifications/${cert.slug}`}
              className="group bg-card rounded-2xl p-6 card-shadow border border-border/50 hover:border-primary/20 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cert text-primary-foreground">
                  CERTS
                </span>
                <div className="relative">
                  <div className="w-16 h-16 bg-skill rounded-lg flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors leading-tight">
                {cert.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};