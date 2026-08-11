import { commonEnvironment } from './common.environment';
import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  env: 'local',
  domainName: 'http://localhost:4200',
  apiBaseUrl: 'http://localhost:3000',

  ...commonEnvironment,

  // Local machine services
  url1: 'http://localhost:3000',
  url2: 'http://localhost:3001',
  url3: 'http://localhost:3002'
};
