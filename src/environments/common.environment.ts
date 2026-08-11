/**
 * Shared base configuration inherited by all environments.
 * Only app metadata and default base URLs go here.
 * Override URL values in each environment file.
 */
export const commonEnvironment = {
  appName: 'AYUVA',
  appVersion: '1.0.0',

  // Base URLs - overridden per environment
  url1: 'https://api.ayuva.com',
  url2: 'https://cdn.ayuva.com',
  url3: 'https://auth.ayuva.com'
} as const;
