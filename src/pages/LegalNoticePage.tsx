import { Scale } from 'lucide-react';
import { LegalShell, LegalSections } from '@/components/legal/LegalShell';
import { LEGAL_NOTICE_SECTIONS, LEGAL_UPDATED } from '@/content/legal';

const LegalNoticePage = () => (
  <LegalShell title="Aviso legal">
    <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-4">
      <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
        <Scale className="w-5 h-5 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">
        Información legal del titular de Maseya, origen de los datos y condiciones de uso.
      </p>
    </div>

    <LegalSections sections={LEGAL_NOTICE_SECTIONS} />

    <p className="text-xs">
      Consulta también la{' '}
      <a className="underline underline-offset-2" href="/privacy">
        Política de privacidad
      </a>{' '}
      y la{' '}
      <a className="underline underline-offset-2" href="/cookies">
        Política de cookies
      </a>
      .
    </p>

    <p className="text-xs text-muted-foreground">{LEGAL_UPDATED}</p>
  </LegalShell>
);

export default LegalNoticePage;
