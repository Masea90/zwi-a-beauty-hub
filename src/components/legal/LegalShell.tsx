import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { LegalSection } from '@/content/legal';

interface LegalShellProps {
  title: string;
  children: ReactNode;
}

/** Shared chrome for the public legal pages (privacy, cookies, legal notice). */
export const LegalShell = ({ title, children }: LegalShellProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-background pb-16">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border pt-safe">
        <div className="w-full sm:max-w-2xl sm:mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/scan'))}
            aria-label="Volver"
            className="p-1 -ml-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-lg font-semibold">{title}</h1>
        </div>
      </header>

      <main className="w-full sm:max-w-2xl sm:mx-auto px-5 py-6 space-y-6 text-[15px] leading-relaxed text-foreground/90">
        {children}
      </main>
    </div>
  );
};

export const LegalTableView = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) => (
  <div className="overflow-x-auto rounded-2xl border border-border/70">
    <table className="w-full text-left text-[13px]">
      <thead className="bg-muted/50">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-3 py-2 font-semibold text-foreground/80">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.join('|')} className="border-t border-border/60 align-top">
            {r.map((cell, i) => (
              <td key={i} className="px-3 py-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const LegalSections = ({ sections }: { sections: LegalSection[] }) => (
  <>
    {sections.map((s) => (
      <section
        key={s.title}
        className={
          s.highlight
            ? 'space-y-2 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4'
            : 'space-y-2'
        }
      >
        <h2 className="font-display text-base font-semibold">{s.title}</h2>
        {s.paragraphs?.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {s.items && (
          <ul className="list-disc pl-5 space-y-1">
            {s.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
        {s.table && <LegalTableView headers={s.table.headers} rows={s.table.rows} />}
        {s.note && <p className="text-xs text-muted-foreground leading-relaxed">{s.note}</p>}
      </section>
    ))}
  </>
);
