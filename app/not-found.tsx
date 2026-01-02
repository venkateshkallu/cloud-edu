import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-20">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild variant="hero" size="lg">
          <Link href="/" className="inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </main>
  );
}