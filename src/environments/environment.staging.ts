import { commonEnvironment } from './common.environment';
import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  env: 'staging',
  domainName: 'https://staging.ayuva.com',
  apiBaseUrl: 'https://staging-api.ayuva.com',

  ...commonEnvironment,

  // Override URLs for staging
  url1: 'https://staging-api.ayuva.com',
  url2: 'https://staging-cdn.ayuva.com',
  url3: 'https://staging-auth.ayuva.com'
};
