import { useEffect, useState } from 'react';

/**
 * Captures the `beforeinstallprompt` event at module level so it survives
 * across component mount/unmount cycles. A component that mounts late (e.g.
 * the Profile tab) can still trigger the native install prompt, because the
 * event was saved the instant the browser offered it — even before the user
 * navigated to the tab.
 */

export interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let capturedBIP: BIPEvent | null = null;
let listenersBound = false;

const bindListeners = () => {
  if (listenersBound || typeof window === 'undefined') return;
  listenersBound = true;
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    capturedBIP = e as BIPEvent;
    notify();
  });
  // The prompt can only be shown once per page load. After a successful
  // install the browser fires this and clears its internal state.
  window.addEventListener('appinstalled', () => {
    capturedBIP = null;
    notify();
  });
};

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach((l) => l());

const isStandaloneMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  const mm = window.matchMedia?.('(display-mode: standalone)').matches;
  const iosSA = (window.navigator as unknown as { standalone?: boolean })
    .standalone === true;
  return !!mm || iosSA;
};

export type InstallPlatform =
  | 'android'
  | 'ios'
  | 'ios-inapp'
  | 'desktop'
  | 'other';

export const detectInstallPlatform = (): InstallPlatform => {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  const isIOSDevice = /iPad|iPhone|iPod/.test(ua);
  const isIPadOS =
    navigator.platform === 'MacIntel' &&
    (navigator as unknown as { maxTouchPoints?: number }).maxTouchPoints! > 1;
  const isIOS = isIOSDevice || isIPadOS;
  const isInAppBrowser =
    /Instagram|FBAN|FBAV|FB_IAB|Messenger|Line|MicroMessenger|Twitter|TikTok|Snapchat|LinkedInApp|Pinterest|GSA/i.test(
      ua,
    );
  if (isIOS && isInAppBrowser) return 'ios-inapp';
  if (isIOS) return 'ios';
  if (/android/i.test(ua)) return 'android';
  if (!/Mobi|Android/i.test(ua)) return 'desktop';
  return 'other';
};

export interface UsePWAInstall {
  /** True when the browser handed us a native install prompt we can fire. */
  canInstall: boolean;
  /** App is already running installed (standalone) — hide install UI. */
  isStandalone: boolean;
  /** Coarse platform for tailoring the instructions. */
  platform: InstallPlatform;
  /** Fire the native prompt. Resolves true if accepted, false otherwise. */
  install: () => Promise<boolean>;
}

export const usePWAInstall = (): UsePWAInstall => {
  bindListeners();
  const [canInstall, setCanInstall] = useState<boolean>(capturedBIP !== null);
  const [isStandalone] = useState<boolean>(() => isStandaloneMode());
  const [platform] = useState<InstallPlatform>(() => detectInstallPlatform());

  useEffect(() => {
    const l: Listener = () => setCanInstall(capturedBIP !== null);
    listeners.add(l);
    // Sync in case the event arrived before this component mounted.
    setCanInstall(capturedBIP !== null);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (!capturedBIP) return false;
    try {
      await capturedBIP.prompt();
      const choice = await capturedBIP.userChoice;
      if (choice.outcome === 'accepted') {
        capturedBIP = null;
        notify();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return { canInstall, isStandalone, platform, install };
};
