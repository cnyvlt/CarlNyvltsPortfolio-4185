import { Link, useLocation } from "wouter";
import { AgentChat, AgentChatProvider } from "./agent-chat";
import { ChalkBackdrop } from "./chalk-backdrop";
import { Principle } from "./principle";
import { site } from "../data/site";
import { useReveal, useScrollTop } from "../hooks/use-reveal";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

function SiteHeader() {
  const [location] = useLocation();
  return (
    <header
      className="sticky top-0 z-40"
      style={{ background: "color-mix(in srgb, var(--paper) 92%, transparent)", backdropFilter: "blur(8px)" }}
    >
      <div className="container-x flex flex-col gap-3 py-3.5 rule sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4">
        <Link to="/" className="group flex items-baseline gap-3 whitespace-nowrap">
          <span className="display-s">{site.name}</span>
          <span className="label hidden sm:inline">{site.roleShort}</span>
        </Link>
        {/* wraps rather than overflows now that there are six items — the
            header stays a single compact row until the labels genuinely
            run out of room */}
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-7">
          {nav.map((item) => {
            const active = location === item.href || location.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link"
                data-active={active}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* masthead motto — the principle every page carries. Hidden below lg so the
          sticky header stays a single compact row on small screens. */}
      <div className="container-x hidden lg:block">
        <div className="rule flex justify-end pb-2">
          <Principle id="authorOfPurpose" variant="motto" />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="rule mt-[clamp(4rem,8vw,8rem)]">
      {/* the sign-off — the same family as the masthead motto, set to close the page */}
      <Principle
        id="remainInControl"
        variant="epigraph"
        className="container-x pt-[clamp(2.5rem,5vw,4rem)]"
      />

      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label label-row mb-5">Contact</p>
          <a href={`mailto:${site.email}`} className="link-accent display-s inline-block">
            {site.email}
          </a>
          <p className="mt-2">
            <a href={site.phoneHref} className="link-accent" style={{ color: "var(--ink-soft)" }}>
              {site.phone}
            </a>
          </p>
          <p className="mt-2" style={{ color: "var(--ink-soft)" }}>
            {site.location}
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="label label-row mb-5">Index</p>
          <ul className="grid gap-1.5">
            {[{ href: "/", label: "Home" }, ...nav].map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="link-accent" style={{ color: "var(--ink-soft)" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3 md:text-right">
          <p className="label label-row mb-5 md:justify-end">Colophon</p>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            {site.name} — {site.role}
          </p>
          <p className="meta mt-3">Playfair Display · Archivo · IBM Plex Mono</p>
        </div>
      </div>
      {/* Text sits on the left, so the bottom-right corner stays free for the
          assistant launcher to float in. */}
      <div className="container-x flex flex-wrap items-center gap-x-3 gap-y-2 py-5 rule">
        <span className="label">© 2026 {site.name} — {site.location}</span>
        <span className="label" aria-hidden style={{ color: "var(--ink-faint)" }}>
          ·
        </span>
        <span className="label">UX / UI design for web, mobile &amp; tablet</span>
      </div>
    </footer>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  useScrollTop(location);
  return (
    <AgentChatProvider>
      <div className="min-h-screen flex flex-col">
        <ChalkBackdrop />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AgentChat />
      </div>
    </AgentChatProvider>
  );
}
