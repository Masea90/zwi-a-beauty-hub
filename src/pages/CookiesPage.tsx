import { Cookie } from 'lucide-react';
import { LegalShell, LegalSections } from '@/components/legal/LegalShell';
import { COOKIES_INTRO, COOKIES_SECTIONS, LEGAL_UPDATED } from '@/content/legal';

const CookiesPage = () => (
  <LegalShell title="Política de cookies">
    <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4">
      <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
        <Cookie className="w-5 h-5 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">{COOKIES_INTRO}</p>
    </div>

    <LegalSections sections={COOKIES_SECTIONS} />

    <p className="text-xs text-muted-foreground">{LEGAL_UPDATED}</p>
  </LegalShell>
);

export default CookiesPage;
