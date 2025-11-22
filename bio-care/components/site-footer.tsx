import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col gap-3 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Bio Care. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-primary transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
