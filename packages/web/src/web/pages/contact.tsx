import { Reveal } from "../components/layout";
import { site } from "../data/site";

export default function ContactPage() {
  return (
    <div className="container-x pt-[clamp(2.5rem,6vw,5rem)]">
      <p className="label label-row enter mb-8">Contact</p>
      <h1 className="display-xl measure enter" style={{ animationDelay: "80ms" }}>
        Like my stuff? Want to work with me? Or just say hello.
      </h1>

      <div className="mt-[clamp(3rem,6vw,5rem)] rule">
        <Reveal>
          <div className="grid gap-6 py-8 lg:grid-cols-12">
            <span className="label lg:col-span-3">Email</span>
            <a
              href={`mailto:${site.email}`}
              className="display-m link-accent lg:col-span-9"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="rule grid gap-6 py-8 lg:grid-cols-12">
            <span className="label lg:col-span-3">Cell</span>
            <a
              href={site.phoneHref}
              className="display-m link-accent lg:col-span-9"
            >
              {site.phone}
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rule grid gap-6 py-8 lg:grid-cols-12">
            <span className="label lg:col-span-3">Name</span>
            <span className="display-m lg:col-span-9">{site.name}</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="rule grid gap-6 py-8 lg:grid-cols-12">
            <span className="label lg:col-span-3">Role</span>
            <span className="display-s lg:col-span-9">{site.role}</span>
          </div>
        </Reveal>
        <Reveal delay={170}>
          <div className="rule grid gap-6 py-8 lg:grid-cols-12">
            <span className="label lg:col-span-3">Based in</span>
            <span className="display-s lg:col-span-9">{site.location}</span>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div className="rule grid gap-6 py-8 lg:grid-cols-12">
            <span className="label lg:col-span-3">Engagements</span>
            <p className="measure body-lg lg:col-span-9" style={{ color: "var(--ink-soft)" }}>
              User experience design, interaction design, user interface design and usability
              testing — for web, mobile and tablet applications. Send a note with what you&apos;re
              building and where you are in the process.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-[clamp(3rem,6vw,5rem)]">
        <a
          href={`mailto:${site.email}?subject=Project%20enquiry`}
          className="group flex items-center justify-between gap-6 py-8 rule"
        >
          <span className="display-l link-accent">Start a conversation</span>
          <span className="label shrink-0">Opens your mail client</span>
        </a>
      </Reveal>
    </div>
  );
}
