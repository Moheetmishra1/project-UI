# Multi-Environment Configuration Guide

This document explains how the AYUVA application is configured to support multiple environments: Development, Staging, and Production.

## Overview

The application uses Angular's environment file replacement feature combined with custom configuration to manage different API endpoints and settings for each environment.

## Environment Files

Located in `src/environments/`:

### 1. `environment.ts` (Development)
- API Base URL: `http://localhost:3000`
- Production: `false`
- Used by default for development
- Includes debugging and logging

### 2. `environment.staging.ts` (Staging)
- API Base URL: `https://staging-api.yourapp.com`
- Production: `false`
- Used for staging environment testing

### 3. `environment.prod.ts` (Production)
- API Base URL: `https://api.yourapp.com`
- Production: `true`
- Used for production builds
- Optimized for performance

## Build Commands

### Development (Local Development)
```bash
yarn start
# or
ng serve --configuration development
```
- Runs on `http://localhost:4200`
- Uses `environment.ts`
- Full debugging enabled
- Source maps enabled

### Staging
```bash
yarn start:staging
# or
ng serve --configuration staging
```
- Runs on `http://localhost:4200`
- Uses `environment.staging.ts`
- Production optimizations applied
- Source maps disabled

### Production
```bash
yarn start:prod
# or
ng serve --configuration production
```
- Runs on `http://localhost:4200`
- Uses `environment.prod.ts`
- Full production optimizations
- No source maps

## Build Commands for Deployment

### Development Build
```bash
yarn build:dev
```

### Staging Build
```bash
yarn build:staging
```

### Production Build
```bash
yarn build:prod
# or
yarn build (default is production)
```

## Configuration Structure

### Environment Object
Each environment file exports:
```typescript
{
  production: boolean;      // True for production, false otherwise
  env: string;              // Environment name: 'development', 'staging', 'production'
  apiBaseUrl: string;       // Base URL for all API calls
  apiEndpoints: {          // Endpoint paths
    auth: string;
    users: string;
    products: string;
    orders: string;
  }
}
```

### Global Config (`src/config/config.ts`)
Provides centralized configuration that automatically loads the correct environment:
```typescript
AppConfig.environment      // Current environment
AppConfig.apiBaseUrl       // Current API base URL
AppConfig.apiEndpoints     // All available endpoints
AppConfig.production       // Is production
AppConfig.features         // Feature flags
AppConfig.cache           // Cache settings
```

## Using Configuration in Components

### 1. Using ApiService
```typescript
import { ApiService } from '@app/services/api.service';

constructor(private apiService: ApiService) {}

ngOnInit() {
  const baseUrl = this.apiService.getBaseUrl();
  const authEndpoint = this.apiService.getEndpoint('auth');
  const env = this.apiService.getEnvironment();
  
  // Make API calls
  fetch(this.apiService.getEndpoint('users'));
}
```

### 2. Using Environment Directly
```typescript
import { environment } from '@environments/environment';

ngOnInit() {
  if (!environment.production) {
    console.log('Development mode');
  }
  const url = environment.apiBaseUrl + environment.apiEndpoints.products;
}
```

### 3. Using AppConfig
```typescript
import { AppConfig } from '@config/config';

ngOnInit() {
  console.log(`App running in ${AppConfig.environment}`);
  if (AppConfig.features.enableLogging) {
    console.log('Logging enabled');
  }
}
```

## Adding New API Endpoints

### Step 1: Update Environment Files
Edit `src/environments/environment*.ts`:
```typescript
apiEndpoints: {
  auth: '/auth',
  users: '/users',
  products: '/products',
  orders: '/orders',
  newEndpoint: '/new-endpoint'  // Add your new endpoint
}
```

### Step 2: Update All Environments
Repeat Step 1 for:
- `environment.ts` (development)
- `environment.staging.ts` (staging)
- `environment.prod.ts` (production)

### Step 3: Use in Components
```typescript
const newUrl = this.apiService.getEndpoint('newEndpoint');
```

## Updating API Base URLs

To change the API base URL for any environment:

1. Open the corresponding environment file:
   - Development: `src/environments/environment.ts`
   - Staging: `src/environments/environment.staging.ts`
   - Production: `src/environments/environment.prod.ts`

2. Update the `apiBaseUrl`:
```typescript
apiBaseUrl: 'https://your-new-api-url.com'
```

3. Save and the changes will automatically apply when you rebuild

## CSS Frameworks

### Bootstrap 5
- Included in all builds
- Import: `node_modules/bootstrap/scss/bootstrap.scss`
- Classes available globally
- Configured in `angular.json`

### PrimeNG
- Comprehensive UI component library
- Theme: Lara Light Blue
- Icons: PrimeIcons
- Usage:
```typescript
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [ButtonModule],
  template: `<p-button label="Click" (onClick)="handleClick()"></p-button>`
})
export class MyComponent {}
```

## Environment Variables (Optional Advanced Setup)

For dynamic configuration at runtime (without rebuilding):

1. Create `.env` files:
```
# .env.development
ANGULAR_APP_API_BASE_URL=http://localhost:3000

# .env.staging
ANGULAR_APP_API_BASE_URL=https://staging-api.yourapp.com

# .env.production
ANGULAR_APP_API_BASE_URL=https://api.yourapp.com
```

2. Update your environment files to read from these variables:
```typescript
export const environment = {
  production: false,
  env: 'development',
  apiBaseUrl: process.env['NG_APP_API_BASE_URL'] || 'http://localhost:3000',
  // ...
};
```

## Path Aliases (tsconfig.json)

Configured for clean imports:
```typescript
// Instead of:
import { ApiService } from '../../../services/api.service';

// Use:
import { ApiService } from '@app/services/api.service';
import { environment } from '@environments/environment';
import { AppConfig } from '@config/config';
```

## Troubleshooting

### API URL Not Changing
- Clear `dist/` folder: `rm -rf dist/` (Windows: `rmdir /s dist`)
- Rebuild the application
- Verify you're using the correct build command

### Import Path Errors
- Verify path aliases in `tsconfig.json`
- Check `baseUrl` is set correctly
- Run: `ng serve --poll 2000` for file watcher issues

### Bootstrap/PrimeNG Not Loading
- Ensure dependencies are installed: `yarn install`
- Clear node_modules: `rm -rf node_modules && yarn install`
- Restart the dev server

## Summary of Commands

```bash
# Install dependencies
yarn install

# Development
yarn start                 # localhost:4200, development environment

# Staging
yarn start:staging         # localhost:4200, staging environment

# Production
yarn start:prod            # localhost:4200, production environment

# Building
yarn build:dev             # Build for development
yarn build:staging         # Build for staging
yarn build:prod            # Build for production
yarn build                 # Default production build

# Watch mode
yarn watch                 # Watch development files

# Testing
yarn test                  # Run tests
```

## Best Practices

1. **Always use the ApiService** for API calls - it handles URL construction
2. **Never hardcode URLs** - use environment configuration
3. **Check environment** before logging - avoid console spam in production
4. **Update all environments** when adding new endpoints
5. **Use path aliases** - easier refactoring and cleaner imports
6. **Test in staging** before production deployment
7. **Use feature flags** for gradual rollouts of new features

