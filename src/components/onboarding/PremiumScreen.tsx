import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { Check, Crown, X, Sparkles } from 'lucide-react';

export const PremiumScreen = () => {
  const navigate = useNavigate();
  const { completeOnboarding, updateUser, t } = useUser();

  const freeFeatures = [
    t('freeFeature1'),
    t('freeFeature2'),
    t('freeFeature3'),
    t('freeFeature4'),
    t('freeFeature5'),
  ];

  const premiumFeatures = [
    t('premiumFeature1'),
    t('premiumFeature2'),
    t('premiumFeature3'),
    t('premiumFeature4'),
  ];

  const handleStartFree = () => {
    completeOnboarding();
    navigate('/home');
  };

  const handleStartPremium = () => {
    updateUser({ isPremium: true });
    completeOnboarding();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
        <span className="font-display text-lg font-semibold">{t('choosePlan')}</span>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 space-y-6 animate-fade-in">
        {/* Free Plan */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-warm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">{t('free')}</h3>
              <p className="text-sm text-muted-foreground">{t('freeSubtitle')}</p>
            </div>
          </div>
          <ul className="space-y-3 mb-6">
            {freeFeatures.map(feature => (
              <li key={feature} className="flex items-center gap-3 text-sm">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={handleStartFree}
            variant="outline"
            className="w-full h-12 rounded-2xl font-medium"
          >
            {t('startFree')}
          </Button>
        </div>

        {/* Premium Plan */}
        <div className="relative bg-gradient-to-br from-maseya-gold/10 via-card to-maseya-terracotta/10 border-2 border-maseya-gold/50 rounded-3xl p-6 shadow-warm-lg overflow-hidden">
          {/* Popular Badge */}
          <div className="absolute top-0 right-0 bg-maseya-gold text-white text-xs font-medium px-3 py-1 rounded-bl-2xl rounded-tr-3xl">
            POPULAR
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-maseya-gold/20 rounded-2xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-maseya-gold" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold">{t('unlockMaseyaPremium')}</h3>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 italic">
            {t('tagline')}
          </p>

          <ul className="space-y-3 mb-4">
            {premiumFeatures.map(feature => (
              <li key={feature} className="flex items-center gap-3 text-sm">
                <div className="w-4 h-4 rounded-full bg-maseya-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-maseya-gold" />
                </div>
                <span className="text-foreground font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="bg-card/50 rounded-2xl p-4 mb-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              €7.99 <span className="text-base font-normal text-muted-foreground">{t('perMonth')}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('cancelAnytime')}
            </p>
          </div>

          <Button
            onClick={handleStartPremium}
            className="w-full h-12 rounded-2xl font-medium bg-maseya-gold hover:bg-maseya-gold/90 text-white shadow-warm"
          >
            <Crown className="w-4 h-4 mr-2" />
            {t('unlockPremium')}
          </Button>
        </div>
      </div>
    </div>
  );
};
