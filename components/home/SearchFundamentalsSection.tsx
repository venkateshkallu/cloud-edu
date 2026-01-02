import { Button } from "@/components/ui/button";

export const SearchFundamentalsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Search Fundamentals<br />Skill
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Learn the fundamentals of Search, including lexical search, indexing strategies, and query optimization.
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="lg">
            View Search Fundamentals
          </Button>
        </div>
      </div>
    </section>
  );
};