import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "About",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "Investor Relations", href: "/investors" },
      { label: "Legal", href: "/legal" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Security Information", href: "/security" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Customer Portal", href: "/portal" },
      { label: "Platform Status", href: "/status" },
      { label: "Customer Support", href: "/support" },
      { label: "Manage Cookies", href: "/cookies" },
    ],
  },
  {
    title: "Learning Options",
    links: [
      { label: "Self-Paced Courses", href: "/courses" },
      { label: "Instructor-Led Training", href: "/training" },
      { label: "Skill Paths", href: "/skills" },
      { label: "Certifications", href: "/certifications" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Developer Hub", href: "/developers" },
      { label: "Community Forums", href: "/community" },
      { label: "API Reference", href: "/api" },
      { label: "Best Practices", href: "/best-practices" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/favicon_io/favicon-32x32.png"
                alt="Azure LearnHub"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-xl tracking-tight">Azure LearnHub</span>
            </Link>
            <p className="text-sm text-blue-100 max-w-xs">
              Empowering learners worldwide with industry-leading Azure courses and certifications.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-blue-100 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-blue-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-blue-200">
              © {new Date().getFullYear()} Azure LearnHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-sm text-blue-200 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-blue-200 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-blue-200 hover:text-white transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};