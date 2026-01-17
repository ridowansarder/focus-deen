import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/50 border-muted px-6 py-8">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} FocusDeen. All rights reserved.
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a href="https://www.facebook.com/ridowansarder6" target="_blank" aria-label="Facebook">
            <FacebookIcon />
          </a>

          <a href="https://www.linkedin.com/in/ridowan-sarder/" target="_blank" aria-label="Linkedin">
            <LinkedinIcon />
          </a>

          <a href="https://www.instagram.com/ridowan_sarder/" target="_blank">
            <InstagramIcon aria-label="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
