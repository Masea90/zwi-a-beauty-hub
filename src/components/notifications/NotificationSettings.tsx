import { Bell, BellOff, Clock } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const NotificationSettings = () => {
  const {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    subscribe,
    unsubscribe,
  } = usePushNotifications();

  const handleToggle = async () => {
    if (isSubscribed) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BellOff className="w-4 h-4" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Push notifications are not supported in this browser. Try using Chrome or Safari on a mobile device.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          {permission === 'denied'
            ? 'Notifications are blocked. To re-enable them, update your browser or device notification settings for this site.'
            : 'Get gentle reminders to complete your morning and night beauty routines, plus updates when someone interacts with your posts.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {isSubscribed ? 'Routine reminders active' : 'Enable routine reminders'}
            </span>
          </div>
          <Switch
            checked={isSubscribed}
            onCheckedChange={handleToggle}
            disabled={isLoading || permission === 'denied'}
          />
        </div>
        {permission === 'denied' && (
          <p className="text-xs text-destructive">
            You previously blocked notifications. Open your browser settings to allow them again.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
