/// <reference types="vite/client" />

/**
 * Minimal Push API augmentation.
 * The DOM lib includes PushManager, PushSubscription, etc. but some TS
 * versions omit pushManager from ServiceWorkerRegistration. This adds
 * only the missing property.
 */
interface ServiceWorkerRegistration {
  readonly pushManager: PushManager;
}
