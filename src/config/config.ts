import { environment } from '../environments/environment';
import type { Environment } from '../environments/environment.model';

/**
 * AppConfig is a typed, flat snapshot of the current environment.
 * Use this as the single source of truth for environment values throughout the app.
 */
export const AppConfig: Environment = {
  production: environment.production,
  env: environment.env,
  domainName: environment.domainName,
  apiBaseUrl: environment.apiBaseUrl,
  appName: environment.appName,
  appVersion: environment.appVersion,
  url1: environment.url1,
  url2: environment.url2,
  url3: environment.url3
};
