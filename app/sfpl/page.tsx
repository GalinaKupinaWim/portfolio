"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CaseStudyNav from "@/components/CaseStudyNav";

/* ─── SFPL / Information Architecture design tokens ─── */
const SF = {
  brand:        "#92400E",   // amber-800 (deep library brown)
  brandMid:     "#B45309",   // amber-700
  brandLight:   "#FEF8F0",   // warm cream
  brandBorder:  "#EBD9C2",   // tan border
  dark:         "#1C1917",   // stone-900 (warm near-black)
  muted:        "#8C7A6B",   // warm taupe
  bodyText:     "#292524",   // stone-800
  subtleText:   "#57534E",   // stone-600
};

/* ─── Typography ─── */
function PageH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-heading font-bold text-[#1C1917]"
      style={{ fontSize: "clamp(1.9rem,4.5vw,3.25rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
      {children}
    </h1>
  );
}
function PageSub({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading font-normal mt-3"
      style={{ fontSize: "clamp(0.95rem,1.8vw,1.25rem)", color: SF.muted, lineHeight: 1.4 }}>
      {children}
    </p>
  );
}
function H2({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <h2 className={`font-heading font-bold mt-10 mb-4 tracking-tight ${white ? "text-white" : "text-[#1C1917]"}`}
      style={{ fontSize: "clamp(1.3rem,2.2vw,1.75rem)", letterSpacing: "-0.025em" }}>
      {children}
    </h2>
  );
}
function H3({ children, white }: { children: React.ReactNode; white?: boolean }) {
  return (
    <h3 className={`font-heading font-semibold mt-6 mb-3 tracking-tight ${white ? "text-white" : "text-[#1C1917]"}`}
      style={{ fontSize: "clamp(0.95rem,1.5vw,1.125rem)", letterSpacing: "-0.01em" }}>
      {children}
    </h3>
  );
}
function H4({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <h4 className={`font-heading font-semibold mb-2 ${className}`}
      style={{ fontSize: "0.9375rem", ...style }}>
      {children}
    </h4>
  );
}
function Body({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <p className={`font-body leading-[1.72] max-w-[700px] ${className}`}
      style={{ fontSize: "0.9375rem", color: SF.subtleText, ...style }}>
      {children}
    </p>
  );
}
function Sm({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-body leading-[1.65] max-w-[700px] ${className}`}
      style={{ fontSize: "0.875rem", color: SF.subtleText }}>
      {children}
    </p>
  );
}
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-2.5 font-body" style={{ fontSize: "0.875rem", color: SF.subtleText, lineHeight: 1.65 }}>
      <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: SF.brandMid, marginTop: "0.45em" }} />
      <span>{children}</span>
    </div>
  );
}

/* ─── Layout atoms ─── */
function PhaseBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="font-body font-semibold text-white text-[0.6875rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded"
        style={{ background: SF.brand, letterSpacing: "0.18em" }}>
        {label}
      </span>
    </div>
  );
}
function PillLight({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-body text-[0.8125rem] font-medium px-4 py-1.5 rounded-full mb-6"
      style={{ background: SF.brandLight, color: SF.brand, border: `1px solid ${SF.brandBorder}` }}>
      {children}
    </span>
  );
}
function Divider() {
  return <div className="my-12 h-px" style={{ background: `linear-gradient(to right, ${SF.brandBorder}, transparent)` }} />;
}
function CardCream({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl p-6 ${className}`}
      style={{ background: SF.brandLight, border: `1px solid ${SF.brandBorder}` }}>
      {children}
    </div>
  );
}
function CardWhite({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-6 border ${className}`} style={{ borderColor: SF.brandBorder }}>
      {children}
    </div>
  );
}
function InfoLabel({ children }: { children: React.ReactNode }) {
  return <div className="font-body text-[0.6875rem] uppercase tracking-[0.12em] mb-2" style={{ color: SF.muted }}>{children}</div>;
}
function InfoVal({ children }: { children: React.ReactNode }) {
  return <div className="font-body text-[0.875rem] leading-[1.6]" style={{ color: SF.bodyText }}>{children}</div>;
}
function StatNum({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-heading font-bold mb-3" style={{ fontSize: "clamp(1.6rem,3.5vw,2.5rem)", color: SF.brand, lineHeight: 1 }}>
      {children}
    </div>
  );
}
function Figure({ src, alt, caption, ratio }: { src: string; alt: string; caption?: string; ratio?: string }) {
  return (
    <figure className="mt-4">
      <div className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: SF.brandBorder }}>
        <div className="relative w-full" style={{ aspectRatio: ratio || "16/9" }}>
          <Image src={src} alt={alt} fill className="object-contain" />
        </div>
      </div>
      {caption && (
        <figcaption className="font-body mt-2.5" style={{ fontSize: "0.75rem", color: SF.muted }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ─── Icons ─── */
const icons = {
  users:   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  card:    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  globe:   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  book:    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  heart:   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

export default function SFPLPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const gridChildren = Array.from(
      root.querySelectorAll<HTMLElement>('[class*="grid-cols-"] > div, [class*="grid-cols-"] > a')
    );
    const sectionTargets = Array.from(
      root.querySelectorAll<HTMLElement>("section, [data-reveal-block]")
    );

    sectionTargets.forEach((el) => el.classList.add("reveal"));
    gridChildren.forEach((el) => el.classList.add("reveal"));

    const all = [...sectionTargets, ...gridChildren];

    const initialTimer = setTimeout(() => {
      const inView = all.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      inView.forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 80);
      });

      const remaining = all.filter((el) => !inView.includes(el));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              const parent = target.parentElement;
              let delay = 0;
              if (parent && parent.className.includes("grid-cols-")) {
                const siblings = Array.from(parent.children);
                delay = siblings.indexOf(target) * 90;
              }
              setTimeout(() => target.classList.add("visible"), delay);
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px 100px 0px" }
      );
      remaining.forEach((el) => observer.observe(el));
    }, 600);

    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <div ref={pageRef}>
      <CaseStudyNav />

      {/* ── Hero ── */}
      <div className="px-14 pt-14 pb-8 max-w-[1200px] mx-auto">
        <PillLight>Information Architecture · UX Research</PillLight>
        <PageH1>Rebuilding the San Francisco Public Library Website</PageH1>
        <PageSub>SFPL · Information Architecture Redesign · Team Project</PageSub>
      </div>

      {/* ── Hero image ── */}
      <div className="px-14 max-w-[1200px] mx-auto">
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: SF.brandBorder }}>
          <div className="relative w-full" style={{ aspectRatio: "1586/992" }}>
            <Image src="/images/sfpl-card-ia-clean.png" alt="San Francisco Public Library — IA Redesign concept" fill className="object-contain" priority />
          </div>
        </div>
      </div>

      {/* ── Meta ── */}
      <div className="px-14 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-4 gap-8 py-8 border-b mt-10 mb-2" style={{ borderColor: SF.brandBorder }}>
          <div><InfoLabel>Role</InfoLabel><InfoVal>Information Architect<br/>UX Researcher<br/>(1 of 3 UX Designers)</InfoVal></div>
          <div><InfoLabel>Timeline</InfoLabel><InfoVal>2024<br/>Berkeley UX Design<br/>Professional Certificate</InfoVal></div>
          <div><InfoLabel>Team</InfoLabel><InfoVal>Galina Kupina<br/>Anuja<br/>Anushka</InfoVal></div>
          <div><InfoLabel>Tools</InfoLabel><InfoVal>FigJam · Figma<br/>Optimal Workshop<br/>(Treejack) · Miro</InfoVal></div>
        </div>

        {/* ── Overview ── */}
        <H2>Project Overview</H2>
        <Body className="max-w-3xl">
          The San Francisco Public Library (SFPL) website had grown into a complex and
          difficult-to-navigate experience, making it challenging for users to find key resources
          and services.
        </Body>
        <Body className="max-w-3xl mt-4">
          As part of a three-person UX team, I worked on redesigning the site&apos;s information
          architecture (IA) by evaluating and improving its structure, navigation, and labeling
          system. The project focused on helping users find information more easily rather than
          redesigning the visual interface.
        </Body>

        {/* ── My Role callout ── */}
        <div className="mt-6 p-6 rounded-xl" style={{ background: SF.brandLight, borderLeft: `3px solid ${SF.brandMid}` }}>
          <InfoLabel>My Role</InfoLabel>
          <Sm>
            As one of three UX designers, I focused on the information architecture work: running the
            content inventory and gap analysis, facilitating card sorting, scoring and standardizing
            labels, building the sitemaps, and setting up and analyzing both rounds of tree testing
            in Optimal Workshop.
          </Sm>
        </div>
      </div>

      {/* ── The Problem — dark ── */}
      <section className="py-16 mt-12" style={{ background: SF.dark }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <H2 white>The Problem</H2>
          <p className="font-body leading-[1.75] max-w-[820px] mb-5" style={{ fontSize: "0.9375rem", color: "#D6CFC7" }}>
            The current SFPL website faced real usability challenges that got in the way of finding
            and accessing key resources. Patrons struggled to locate digital resources, understand
            membership requirements, and discover important programs like job-search assistance and
            online learning.
          </p>
          <p className="font-body leading-[1.75] max-w-[820px]" style={{ fontSize: "0.9375rem", color: "#D6CFC7" }}>
            Underneath it all, the structure lacked intuitive categorization, leading to confusion
            and low task-success rates, especially on mobile. People knew the library had what they
            needed; they just couldn&apos;t find it.
          </p>
        </div>
      </section>

      <div className="px-14 max-w-[1200px] mx-auto">
        <Divider />

        {/* ── Phase 01 ── */}
        <PhaseBadge label="Phase 01" />
        <H2>Discovery &amp; Research</H2>
        <Body className="max-w-3xl">
          Before touching the structure, we needed to understand two things: what the library wanted
          to achieve, and who its patrons actually were. Aligning user needs with business goals
          gave us a way to prioritize what mattered most.
        </Body>

        <H3>Business Goals</H3>
        <Body>We grounded the project in five goals the library cares about:</Body>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { icon: icons.users, title: "Increase User Engagement", text: "Encourage patrons to explore events, workshops, and resources, fostering community and lifelong learning." },
            { icon: icons.card,  title: "Boost Membership & Patronage", text: "Drive library-card sign-ups and increase foot traffic to physical branches." },
            { icon: icons.globe, title: "Enhance Online Accessibility", text: "Make the catalog easy to reach so users can reserve items online and borrow seamlessly." },
            { icon: icons.book,  title: "Promote Lifelong Learning", text: "Offer diverse workshops and educational programs across age groups and interests." },
            { icon: icons.heart, title: "Strengthen Community Ties", text: "Promote community events, book clubs, and forums for sharing knowledge and experiences." },
          ].map(({ icon, title, text }) => (
            <CardCream key={title}>
              <div className="mb-3 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "white", color: SF.brandMid, border: `1px solid ${SF.brandBorder}` }}>
                {icon}
              </div>
              <H4 className="text-[#1C1917]">{title}</H4>
              <Sm>{text}</Sm>
            </CardCream>
          ))}
        </div>

        <H3>Meet the Users</H3>
        <Body className="max-w-3xl">
          From research, two personas captured the people most affected by the site&apos;s structure,
          a busy parent and a retired senior, each with very different comfort levels and needs.
        </Body>

        {/* Persona — Emily */}
        <div className="mt-4 rounded-2xl overflow-hidden border" style={{ borderColor: SF.brandBorder }}>
          <div className="grid grid-cols-2">
            <div className="p-8 border-r" style={{ borderColor: SF.brandBorder }}>
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image src="/images/sfpl-persona-emily.jpg" alt="Emily" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-heading font-bold text-[#1C1917]" style={{ fontSize: "1.0625rem" }}>Emily — The Mom</div>
                  <Sm>Married · 2 kids · Age 35</Sm>
                </div>
              </div>
              <div className="mb-5">
                <InfoLabel>Background</InfoLabel>
                <Sm>A San Francisco resident and parent of two young children. She values resources and programs that support early-childhood development and literacy.</Sm>
              </div>
              <InfoLabel>Frustrations</InfoLabel>
              <Bullet>Hard to find materials suited to her children&apos;s ages</Bullet>
              <Bullet>Limited or conflicting schedules for children&apos;s programs</Bullet>
              <Bullet>The online reservation system feels confusing</Bullet>
            </div>
            {/* Persona — David */}
            <div className="p-8">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative">
                  <Image src="/images/sfpl-persona-david.jpg" alt="David" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-heading font-bold text-[#1C1917]" style={{ fontSize: "1.0625rem" }}>David — The Senior</div>
                  <Sm>Retired engineer · Age 70</Sm>
                </div>
              </div>
              <div className="mb-5">
                <InfoLabel>Background</InfoLabel>
                <Sm>Values face-to-face interaction and visiting the library to socialize. Prefers print over digital, but is open to trying new things, and loves book clubs and lectures.</Sm>
              </div>
              <InfoLabel>Frustrations</InfoLabel>
              <Bullet>Limited mobility makes in-person visits harder some days</Bullet>
              <Bullet>New technology and the website feel overwhelming</Bullet>
              <Bullet>Few clearly senior-friendly or accessible resources</Bullet>
            </div>
          </div>
        </div>

        <H3>Mapping Tasks to Business Priorities</H3>
        <Body className="max-w-3xl">
          To decide what to test, we listed the common patron tasks that also serve a business goal,
          the intersection where fixing navigation matters most. A sample of the high-priority tasks:
        </Body>
        <div className="grid grid-cols-2 gap-x-8 mt-4">
          <div>
            <Bullet>Browse digital resources like audiobooks or e-books</Bullet>
            <Bullet>Download e-books and audiobooks</Bullet>
            <Bullet>Explore library events, programs, and workshops</Bullet>
            <Bullet>Register for events and programs</Bullet>
            <Bullet>Access resources for children and teens</Bullet>
          </div>
          <div>
            <Bullet>Choose an online-learning topic (homework help, computer skills)</Bullet>
            <Bullet>Explore volunteering opportunities</Bullet>
            <Bullet>Access language learning and online courses</Bullet>
            <Bullet>Find membership requirements and sign up for a card</Bullet>
            <Bullet>Access resources for individuals with disabilities</Bullet>
          </div>
        </div>

        <Divider />

        {/* ── Phase 02 ── */}
        <PhaseBadge label="Phase 02" />
        <H2>Auditing the Current IA</H2>
        <Body className="max-w-3xl">
          With priorities set, we evaluated how well the existing structure actually supported those
          tasks, first with a content audit, then with a baseline tree test to get hard numbers.
        </Body>

        <H3>Content Inventory &amp; Gap Analysis</H3>
        <Body className="max-w-3xl">
          We mapped every priority task to where its content lived on the live site and rated how
          discoverable it was. The gaps were obvious once laid out side by side.
        </Body>
        <Figure
          src="/images/sfpl-gap-analysis.jpg"
          alt="Gap analysis mapping tasks to page titles, business priority, and depth"
          caption="Gap analysis: each task mapped to its page title, business priority, navigation depth, and a discoverability note."
          ratio="820/520"
        />

        <H3>Gap Analysis: Key Insights</H3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[
            { task: "Download audiobooks", note: "A missing opportunity, buried four levels deep instead of living in “Books & Media,” where users expect it." },
            { task: "Membership requirements", note: "Too many competing paths to get a library card, scattered across different levels of the site." },
            { task: "Job & career resources", note: "A misleading link sent users somewhere other than the help they were looking for." },
            { task: "Discover & Go passes", note: "Most users expected this under “Events & Exhibits,” not tucked inside “Support & Services.”" },
            { task: "Online-learning topics", note: "Computer skills and homework help were genuinely hard to locate, another missed opportunity." },
          ].map(({ task, note }) => (
            <CardWhite key={task}>
              <H4 className="text-[#1C1917] mb-2">{task}</H4>
              <Sm>{note}</Sm>
            </CardWhite>
          ))}
        </div>

        <H3>Baseline Tree Testing</H3>
        <Body className="max-w-3xl">
          To turn hunches into evidence, we ran a tree test (Treejack) on the existing structure with
          real users completing the priority tasks. The overall success rate was just{" "}
          <strong>51%</strong>, with several tasks falling below 25%.
        </Body>
        <div className="grid grid-cols-2 gap-5 mt-5 items-start">
          <Figure
            src="/images/sfpl-treetest-old.jpg"
            alt="Baseline tree test overview showing 51% success"
            caption="Baseline study overview: 51% success, 49% directness, ~10 min average."
            ratio="1320/520"
          />
          <Figure
            src="/images/sfpl-treetest1-chart.png"
            alt="Per-task success and failure breakdown for the baseline tree test"
            caption="Per-task breakdown (direct/indirect success vs. failure). Tasks 2, 5, 7, and 9 performed worst."
            ratio="1170/640"
          />
        </div>
        <CardCream className="mt-5">
          <H4 className="text-[#1C1917]">What the numbers told us</H4>
          <Bullet>Tasks 2, 5, 7, and 9 saw the lowest success rates (under 25%), mostly digital-resource and availability tasks.</Bullet>
          <Bullet>Users took unexpected paths, a sign that labels were unclear and not specific enough.</Bullet>
          <Bullet>Relocating sections and tightening labels could meaningfully reduce these pain points.</Bullet>
        </CardCream>

        <Divider />
      </div>

      {/* ── Phase 03 — cream section ── */}
      <section style={{ background: SF.brandLight }} className="py-20">
        <div className="px-14 max-w-[1200px] mx-auto">
          <PhaseBadge label="Phase 03" />
          <H2>Rebuilding the Structure</H2>
          <Body className="max-w-3xl">
            Armed with evidence, we rebuilt the IA from the ground up, letting users tell us how
            content should be grouped, standardizing the labels, and reshaping the sitemap around
            how people actually think.
          </Body>

          <H3>Card Sorting → Abstract IA</H3>
          <Body className="max-w-3xl">
            We combined in-person and online card sorting to see how patrons naturally grouped the
            library&apos;s content. The result was an abstract IA, a set of standardized groups that
            reflected users&apos; mental models rather than the library&apos;s internal org chart.
          </Body>
          <Figure
            src="/images/sfpl-abstract-ia.jpg"
            alt="Abstract information architecture derived from card sorting"
            caption="Abstract IA: standardized top-level groups derived from in-person and online card sorting."
            ratio="1010/470"
          />

          <H3>Scoring &amp; Standardizing Labels</H3>
          <Body className="max-w-3xl">
            Good structure fails with bad labels. We scored every candidate label against five
            criteria, whether it was well-known, easy, real, brief, and representative, and used the
            scores to choose clear, user-facing names.
          </Body>
          <Figure
            src="/images/sfpl-label-scoring.jpg"
            alt="Label scoring sheet rating each label across five criteria"
            caption="Label scoring sheet: each label rated on well-known, easy, real, brief, and representative, then totaled and revised."
            ratio="870/520"
          />

          <H3>From Old Sitemap to New</H3>
          <Body className="max-w-3xl">
            The before-and-after made the difference tangible: a deep, redundant hierarchy became a
            cleaner structure split into clear primary navigation, with account and membership items
            grouped sensibly.
          </Body>
          <div className="grid grid-cols-2 gap-5 mt-5 items-start">
            <div>
              <Figure
                src="/images/sfpl-sitemap-old.png"
                alt="Original SFPL sitemap"
                caption="Before: the existing structure, deep and redundant in places."
                ratio="490/300"
              />
            </div>
            <div>
              <Figure
                src="/images/sfpl-sitemap-new.png"
                alt="Redesigned SFPL sitemap"
                caption="After: the proposed structure, split into clear primary navigation and grouped account items."
                ratio="490/300"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="px-14 pt-16 max-w-[1200px] mx-auto">
        <Divider />

        {/* ── Phase 04 ── */}
        <PhaseBadge label="Phase 04" />
        <H2>Navigation Design</H2>
        <Body className="max-w-3xl">
          With the structure settled, we explored two navigation approaches and weighed them against
          each other before committing, because how the structure is exposed matters as much as the
          structure itself.
        </Body>

        <div className="grid grid-cols-2 gap-5 mt-5">
          <CardWhite>
            <span className="font-body font-semibold uppercase px-2.5 py-1 rounded-full inline-block mb-3"
              style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: SF.brand, background: SF.brandLight, border: `1px solid ${SF.brandBorder}` }}>
              Option 1 · Fully expanded
            </span>
            <H4 className="text-[#1C1917] mb-3">Everything in the top-level nav</H4>
            <div className="mb-4">
              <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: SF.brand, textTransform: "uppercase" }}>Pros</div>
              <Bullet>Logical grouping under clear categories</Bullet>
              <Bullet>Comprehensive coverage of every service</Bullet>
            </div>
            <div>
              <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#B45309", textTransform: "uppercase" }}>Cons</div>
              <Bullet>Too detailed and nested; can overwhelm</Bullet>
              <Bullet>Risk of redundant paths to the same content</Bullet>
              <Bullet>Deep hierarchy translates poorly to mobile</Bullet>
            </div>
          </CardWhite>
          <CardWhite className="relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 font-body font-semibold text-white"
              style={{ fontSize: "0.625rem", letterSpacing: "0.1em", background: SF.brand, borderBottomLeftRadius: "0.5rem", textTransform: "uppercase" }}>
              Chosen
            </div>
            <span className="font-body font-semibold uppercase px-2.5 py-1 rounded-full inline-block mb-3"
              style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: SF.brand, background: SF.brandLight, border: `1px solid ${SF.brandBorder}` }}>
              Option 2 · Streamlined
            </span>
            <H4 className="text-[#1C1917] mb-3">Core content up top, account in a menu</H4>
            <div className="mb-4">
              <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: SF.brand, textTransform: "uppercase" }}>Pros</div>
              <Bullet>Declutters the primary nav around core content areas</Bullet>
              <Bullet>Account, membership, and donate move into a clean menu</Bullet>
              <Bullet>Far more mobile-friendly use of screen space</Bullet>
            </div>
            <div>
              <div className="font-body font-semibold mb-1" style={{ fontSize: "0.6875rem", letterSpacing: "0.08em", color: "#B45309", textTransform: "uppercase" }}>Cons</div>
              <Bullet>Account items are slightly less discoverable</Bullet>
              <Bullet>Success depends on a well-designed menu interaction</Bullet>
            </div>
          </CardWhite>
        </div>
        <Sm className="mt-5 max-w-3xl">
          We chose <strong>Option 2</strong>: emphasize the core content areas in the primary
          navigation (Library Catalog, Events &amp; Workshops, Teens &amp; Kids, Career Development,
          Resources for Specially-abled) and move account and membership tasks into a menu, a cleaner
          surface that holds up on mobile.
        </Sm>

        <Divider />
      </div>

      {/* ── Phase 05 — Validation, dark ── */}
      <section className="py-20" style={{ background: SF.dark }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <PhaseBadge label="Phase 05" />
          <H2 white>Validating the New Structure</H2>
          <p className="font-body leading-[1.72] max-w-[760px] mb-8" style={{ fontSize: "0.9375rem", color: "#D6CFC7" }}>
            A redesign is only as good as its evidence. We ran a second tree test on the new
            structure with the same priority tasks and compared the results head-to-head.
          </p>
          <div className="grid grid-cols-2 gap-5 items-start">
            <div className="rounded-xl overflow-hidden bg-white border" style={{ borderColor: SF.brandBorder }}>
              <div className="px-5 pt-4 pb-1">
                <div className="font-body font-semibold" style={{ fontSize: "0.8125rem", color: SF.muted }}>Existing structure</div>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "1320/520" }}>
                <Image src="/images/sfpl-treetest-old.jpg" alt="Old structure: 51% success" fill className="object-contain" />
              </div>
            </div>
            <div className="rounded-xl overflow-hidden bg-white border-2" style={{ borderColor: SF.brandMid }}>
              <div className="px-5 pt-4 pb-1">
                <div className="font-body font-semibold" style={{ fontSize: "0.8125rem", color: SF.brand }}>New structure</div>
              </div>
              <div className="relative w-full" style={{ aspectRatio: "1320/520" }}>
                <Image src="/images/sfpl-treetest-new.jpg" alt="New structure: 78% success" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-white border" style={{ borderColor: SF.brandBorder }}>
            <H4 className="text-[#1C1917]">Observations &amp; insights</H4>
            <Bullet>The previously failing tasks (2, 5, 7, and 9) jumped to <strong>63&ndash;100%</strong> success.</Bullet>
            <Bullet>Overall success climbed from <strong>51% to 78%</strong>, and average time dropped from ~10 min to 7m 26s.</Bullet>
            <Bullet>One honest caveat: Task 3 (disability assistance) slipped from 75% to 50%, flagging an area that still needs another iteration.</Bullet>
          </div>
        </div>
      </section>

      {/* ── Final Prototype ── */}
      <div className="px-14 pt-16 max-w-[1200px] mx-auto">
        <PhaseBadge label="Prototype" />
        <H2>The Redesigned Experience</H2>
        <Body className="max-w-3xl">
          We translated the validated structure into a Figma prototype: audiobooks and e-books
          surfaced under the catalog, a streamlined primary navigation, and account and membership
          items tucked into a clean menu, the IA made tangible.
        </Body>
        <div className="mt-6 rounded-2xl overflow-hidden border" style={{ background: SF.dark, borderColor: SF.dark }}>
          <div className="relative w-full mx-auto" style={{ maxWidth: "720px", aspectRatio: "600/507" }}>
            <Image src="/images/sfpl-prototype.jpg" alt="Final SFPL website prototype on desktop" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* ── Impact — cream ── */}
      <section className="py-20" style={{ background: SF.brandLight }}>
        <div className="px-14 max-w-[1200px] mx-auto">
          <H2>Impact &amp; Results</H2>
          <Body className="max-w-2xl mb-10">
            Restructuring the information architecture, not redesigning a single pixel, produced
            measurable gains in how easily patrons could find what they needed.
          </Body>
          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "51% → 78%", title: "Task Success Rate",     desc: "Overall success across priority tasks climbed 27 points after restructuring the IA and relabeling navigation." },
              { num: "63–100%",   title: "Recovered Tasks",        desc: "The four worst-performing tasks (2, 5, 7, 9) went from under 25% to between 63% and 100% success." },
              { num: "10m → 7.4m",title: "Faster to Find",         desc: "Average time to complete tasks dropped by roughly two and a half minutes." },
              { num: "5 → clear", title: "Labels Standardized",    desc: "Ambiguous, redundant labels were scored and replaced with clear, user-tested names." },
            ].map(({ num, title, desc }) => (
              <CardWhite key={title}>
                <StatNum>{num}</StatNum>
                <H4 className="text-[#1C1917] mb-2">{title}</H4>
                <Sm>{desc}</Sm>
              </CardWhite>
            ))}
          </div>
        </div>
      </section>

      <div className="px-14 pt-16 max-w-[1200px] mx-auto">
        <Divider />

        {/* ── Conclusion / Next Steps ── */}
        <H2>Conclusion &amp; Next Steps</H2>
        <Body className="max-w-3xl">
          The proposed structure directly addressed the gaps we found: audiobooks surfaced under the
          catalog, membership consolidated into one clear path, job and career links corrected, and
          online-learning topics made findable. The next steps were to wireframe the new structure,
          test the prototype with users matched to our personas, iterate, and publish.
        </Body>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { n: "01", t: "Wireframe", d: "Build out wireframes based on the new structure." },
            { n: "02", t: "Test", d: "Test the prototype with users selected from our personas." },
            { n: "03", t: "Iterate", d: "Refine the design based on test results." },
            { n: "04", t: "Publish", d: "Test the revisions, iterate once more, and ship." },
          ].map(({ n, t, d }) => (
            <CardCream key={n}>
              <span className="font-heading font-bold block mb-2" style={{ fontSize: "1.5rem", color: SF.brand, lineHeight: 1 }}>{n}</span>
              <H4 className="text-[#1C1917] mb-1">{t}</H4>
              <Sm>{d}</Sm>
            </CardCream>
          ))}
        </div>

        <Divider />

        {/* ── Key Learnings ── */}
        <div className="grid gap-12 items-start py-4" style={{ gridTemplateColumns: "1fr 2fr" }}>
          <div>
            <H2>Key Learnings</H2>
          </div>
          <div className="space-y-8">
            {[
              { title: "Structure is invisible until it fails",        desc: "Patrons never praised the navigation, they only noticed when they couldn't find something. Good IA does its job quietly." },
              { title: "Labels carry as much weight as hierarchy",     desc: "Several failures weren't about where content lived, but what it was called. Scoring labels objectively removed a lot of guesswork." },
              { title: "Tree testing turns opinions into evidence",    desc: "Going from 51% to 78% wasn't a matter of taste, it was measurable, and that made the redesign easy to defend." },
              { title: "Stay honest about what's not fixed yet",       desc: "One task regressed. Naming that openly mattered more than a clean success story, and it pointed straight to the next iteration." },
            ].map(({ title, desc }) => (
              <div key={title}>
                <H4 className="text-[#1C1917] mb-1">{title}</H4>
                <Sm>{desc}</Sm>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="px-14 py-10 flex justify-between items-center border-t max-w-[1200px] mx-auto" style={{ borderColor: SF.brandBorder }}>
        <p className="font-body text-[0.875rem]" style={{ color: SF.muted }}>
          Thank you for reading this case study!
        </p>
        <a href="/"
          className="px-7 py-3.5 rounded-full font-body font-medium text-white no-underline"
          style={{ background: SF.brand, fontSize: "0.875rem" }}>
          Back to Portfolio
        </a>
      </footer>
    </div>
  );
}
