import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { languages, Language } from '@/lib/i18n';
import { Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LanguageSelect = () => {
  const navigate = useNavigate();
  const { user, setLanguage, t } = useUser();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleContinue = () => {
    navigate('/onboarding/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col items-center justify-center p-6">
      <div className="animate-fade-in space-y-8 max-w-sm w-full">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-warm mx-auto mb-4">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            {t('selectLanguage')}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t('languageSubtitle')}
          </p>
        </div>

        {/* Language Options */}
        <div className="space-y-3">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                'w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all',
                user.language === lang.code
                  ? 'border-primary bg-primary/10 shadow-warm'
                  : 'border-border bg-card hover:border-primary/50'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium text-foreground">{lang.label}</span>
              </div>
              {user.language === lang.code && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full h-14 text-lg font-medium rounded-2xl bg-gradient-olive hover:opacity-90 transition-all shadow-warm-lg"
        >
          {t('continue')}
        </Button>
      </div>
    </div>
  );
};
