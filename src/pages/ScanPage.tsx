import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { Camera, Lock, Crown, Sparkles, ChevronLeft } from 'lucide-react';

const ScanPage = () => {
  const navigate = useNavigate();
  const { user, t } = useUser();

  if (!user.isPremium) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Locked State */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
              <Camera className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-maseya-gold rounded-full flex items-center justify-center shadow-warm">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="mb-2 px-3 py-1 bg-maseya-gold/10 text-maseya-gold text-xs font-medium rounded-full">
            {t('premiumFeature')}
          </div>

          <h1 className="font-display text-xl font-bold mb-3 max-w-xs">
            {t('scanPaywallTitle')}
          </h1>
          <p className="text-muted-foreground text-sm mb-8 max-w-xs">
            {t('scanPaywallDescription')}
          </p>

          <Button
            onClick={() => navigate('/premium')}
            className="w-full max-w-sm h-14 rounded-2xl text-lg font-medium bg-maseya-gold hover:bg-maseya-gold/90 text-white shadow-warm"
          >
            <Crown className="w-5 h-5 mr-2" />
            {t('unlockPremium')}
          </Button>
        </div>
      </div>
    );
  }

  // Premium user - show scan interface
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-display text-lg font-semibold">{t('aiScanner')}</span>
        <div className="w-10" />
      </div>

      {/* Scan Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-64 h-64 bg-card rounded-full flex items-center justify-center shadow-warm-lg mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-glow-skin/20 to-glow-hair/20 animate-pulse-soft" />
          <Camera className="w-20 h-20 text-primary relative z-10" />
        </div>

        <h2 className="font-display text-xl font-semibold mb-2">{t('readyToScan')}</h2>
        <p className="text-muted-foreground mb-8 max-w-xs">
          {t('positionFace')}
        </p>

        <div className="space-y-3 w-full max-w-sm">
          <Button className="w-full h-14 rounded-2xl text-lg font-medium bg-glow-skin/80 hover:bg-glow-skin text-white">
            <Camera className="w-5 h-5 mr-2" />
            {t('scanSkin')}
          </Button>
          <Button className="w-full h-14 rounded-2xl text-lg font-medium bg-glow-hair/80 hover:bg-glow-hair text-white">
            <Camera className="w-5 h-5 mr-2" />
            {t('scanHair')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
