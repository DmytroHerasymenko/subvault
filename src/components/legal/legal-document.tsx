import type { LegalDocument } from "@/lib/legal/types";

export function LegalDocumentView({
  doc,
  lastUpdatedLabel,
}: {
  doc: LegalDocument;
  lastUpdatedLabel: string;
}) {
  return (
    <article className="max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-sm text-muted-foreground">{lastUpdatedLabel}</p>
        <p className="text-muted-foreground">{doc.intro}</p>
      </header>
      {doc.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          {section.paragraphs.map((p) => (
            <p key={p} className="text-muted-foreground">{p}</p>
          ))}
        </section>
      ))}
    </article>
  );
}
