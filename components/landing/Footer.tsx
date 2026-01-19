import Link from "next/link";

const footerLinks = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-6 border-t border-border">
      <div className="container-width">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold">FormEase</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built with OCR + Translation + AI Explanation
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FormEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
