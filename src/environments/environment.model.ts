/**
 * Shared type definition for all environment configurations.
 * Every environment file must satisfy this interface.
 */
export interface Environment {
  production: boolean;
  env: 'local' | 'development' | 'staging' | 'production';
  domainName: string;
  apiBaseUrl: string;
  appName: string;
  appVersion: string;
  url1: string;
  url2: string;
  url3: string;
}
