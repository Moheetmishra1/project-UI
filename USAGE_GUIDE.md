# Multi-Environment Configuration - Complete Usage Guide

## 📋 Overview

This application has been configured to support multiple environments with comprehensive configuration management. The setup includes:

- **3 Environments**: Development, Staging, Production
- **Bootstrap 5**: CSS framework for responsive UI
- **PrimeNG**: Rich UI component library
- **Environment-specific URLs**: API endpoints and custom URLs per environment
- **Feature Flags**: Control features per environment
- **Common Configuration**: Shared settings across all environments

---

## 🚀 Quick Start

### Install Dependencies
```bash
yarn install
```

### Development (Local)
```bash
yarn start
# or
yarn start:dev
```
- Runs on: `http://localhost:4200`
- API Base: `http://localhost:3000`
- Debugging: ✅ Enabled
- Source Maps: ✅ Enabled
- File: `src/environments/environment.ts`

### Staging
```bash
yarn start:staging
```
- Runs on: `http://localhost:4200`
- API Base: `https://staging-api.yourapp.com`
- Debugging: ⚠️ Limited
- Source Maps: ❌ Disabled
- File: `src/environments/environment.staging.ts`

### Production
```bash
yarn start:prod
```
- Runs on: `http://localhost:4200`
- API Base: `https://api.yourapp.com`
- Debugging: ❌ Disabled
- Source Maps: ❌ Disabled
- File: `src/environments/environment.prod.ts`

---

## 📦 Build Commands

### Build for Development
```bash
yarn build:dev
```

### Build for Staging
```bash
yarn build:staging
```

### Build for Production
```bash
yarn build:prod
# or
yarn build (default)
```

---

## 📁 Project Structure

```
src/
├── environments/
│   ├── common.environment.ts      # Shared configuration
│   ├── environment.ts             # Development
│   ├── environment.staging.ts     # Staging
│   └── environment.prod.ts        # Production
├── config/
│   └── config.ts                  # Global config manager
├── app/
│   ├── services/
│   │   └── api.service.ts         # API configuration service
│   └── components/
│       ├── environment-info.component.ts       # Display config
│       └── api-usage-example.component.ts      # Usage examples
├── styles.scss                    # Global styles
└── main.ts                        # App entry point
```

---

## ⚙️ Configuration Structure

### Common Environment (`common.environment.ts`)

All environment-specific files extend this common configuration:

```typescript
export const commonEnvironment = {
  appName: 'AYUVA',
  appVersion: '1.0.0',
  
  apiEndpoints: {
    auth: '/auth',
    users: '/users',
    products: '/products',
    orders: '/orders',
    dashboard: '/dashboard',
    profile: '/profile',
    settings: '/settings'
  },
  
  features: {
    enableLogging: true,
    enableDebugInfo: true,
    enableAnalytics: false
  },
  
  apiTimeout: 30000,
  apiRetryAttempts: 3,
  apiRetryDelay: 1000,
  
  cache: {
    enabled: true,
    ttl: 3600000
  },
  
  pagination: {
    pageSize: 10,
    maxPageSize: 100
  },
  
  // Custom URLs
  url1: 'https://api.example.com',
  url2: 'https://cdn.example.com',
  url3: 'https://auth.example.com'
};
```

### Environment-Specific Override

Each environment extends the common configuration and overrides values:

```typescript
import { commonEnvironment } from './common.environment';

export const environment = {
  production: false,
  env: 'development',
  apiBaseUrl: 'http://localhost:3000',
  
  ...commonEnvironment,  // Inherit common config
  
  // Override specific values
  url1: 'http://localhost:3000',
  url2: 'http://localhost:3001',
  url3: 'http://localhost:3002',
  
  features: {
    ...commonEnvironment.features,
    enableLogging: true,
    enableDebugInfo: true
  }
};
```

---

## 🔧 Using the Configuration

### 1. Using ApiService (Recommended)

The `ApiService` provides a clean interface to access all configuration:

```typescript
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-my-component',
  template: `<div>{{ data }}</div>`
})
export class MyComponent implements OnInit {
  data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Get base URL
    const baseUrl = this.apiService.getBaseUrl();

    // Get specific endpoint
    const usersUrl = this.apiService.getEndpoint('users');

    // Get all endpoints
    const endpoints = this.apiService.getAllEndpoints();

    // Get custom URL
    const url1 = this.apiService.getCustomUrl('url1');

    // Check feature flag
    const loggingEnabled = this.apiService.isFeatureEnabled('enableLogging');

    // Get current environment
    const env = this.apiService.getEnvironment();

    // Check if production
    const isProd = this.apiService.isProductionEnvironment();

    this.data = { baseUrl, usersUrl, endpoints, env, isProd };
  }
}
```

### 2. Using Environment Directly

For quick access to environment configuration:

```typescript
import { environment } from '@environments/environment';

export class MyService {
  constructor() {
    console.log(environment.apiBaseUrl);
    console.log(environment.env);
    console.log(environment.url1);
  }
}
```

### 3. Using AppConfig

For centralized configuration access:

```typescript
import { AppConfig } from '@config/config';

export class MyComponent {
  ngOnInit() {
    console.log(AppConfig.environment);      // Current environment
    console.log(AppConfig.apiBaseUrl);       // API base URL
    console.log(AppConfig.production);       // Is production
    console.log(AppConfig.features);         // Feature flags
  }
}
```

---

## 🔄 Making API Calls

### Example: HTTP Service with ApiService

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { timeout, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  getUsers() {
    const endpoint = this.apiService.getEndpoint('users');
    return this.http.get<any[]>(endpoint).pipe(
      timeout(this.apiService.AppConfig.apiTimeout),
      retry(this.apiService.AppConfig.apiRetryAttempts)
    );
  }

  createUser(userData: any) {
    const endpoint = this.apiService.getEndpoint('users');
    return this.http.post(endpoint, userData);
  }

  // Using custom URL
  downloadFile() {
    const downloadUrl = this.apiService.getCustomUrl('url2');
    return this.http.get(`${downloadUrl}/file`, {
      responseType: 'blob'
    });
  }
}
```

---

## 🛠️ Adding New Endpoints

### Step 1: Update Common Environment
```typescript
// src/environments/common.environment.ts
apiEndpoints: {
  // ... existing endpoints
  newFeature: '/new-feature',
  reports: '/reports'
}
```

### Step 2: Use in Your Service
```typescript
const endpoint = this.apiService.getEndpoint('newFeature');
```

### Step 3: Override Per Environment (Optional)
If a specific environment needs a different endpoint:
```typescript
// src/environments/environment.prod.ts
apiEndpoints: {
  ...commonEnvironment.apiEndpoints,
  newFeature: '/api/v2/new-feature'  // Different for production
}
```

---

## 🚩 Adding Feature Flags

### Step 1: Define in Common Environment
```typescript
// src/environments/common.environment.ts
features: {
  enableNewUI: false,
  enableBeta: false,
  enableAnalytics: true
}
```

### Step 2: Override Per Environment
```typescript
// src/environments/environment.ts (development)
features: {
  ...commonEnvironment.features,
  enableNewUI: true,      // Enable for development
  enableBeta: true
}

// src/environments/environment.prod.ts (production)
features: {
  ...commonEnvironment.features,
  enableNewUI: false,     // Keep disabled in production
  enableBeta: false
}
```

### Step 3: Use in Components
```typescript
import { ApiService } from '@app/services/api.service';

export class MyComponent {
  constructor(private apiService: ApiService) {
    if (this.apiService.isFeatureEnabled('enableNewUI')) {
      // Show new UI
    }
  }
}
```

---

## 🎨 Bootstrap 5 & PrimeNG

### Bootstrap 5
Bootstrap is included globally. Use Bootstrap classes in templates:

```html
<div class="container mt-5">
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5>Title</h5>
        </div>
        <div class="card-body">
          Content here
        </div>
      </div>
    </div>
  </div>
</div>
```

### PrimeNG Components

Import and use PrimeNG components:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonModule, CardModule],
  template: `
    <p-card>
      <ng-template pTemplate="header">
        <h5>Card Title</h5>
      </ng-template>
      <p-button label="Click Me" (onClick)="handleClick()"></p-button>
    </p-card>
  `
})
export class ExampleComponent {
  handleClick() {
    console.log('Button clicked');
  }
}
```

---

## 📊 TypeScript Path Aliases

The project is configured with path aliases for cleaner imports:

```typescript
// Instead of:
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../environments/environment';
import { AppConfig } from '../../../config/config';

// Use:
import { ApiService } from '@app/services/api.service';
import { environment } from '@environments/environment';
import { AppConfig } from '@config/config';
```

Path mappings in `tsconfig.json`:
- `@app/*` → `src/app/*`
- `@config/*` → `src/config/*`
- `@environments/*` → `src/environments/*`

---

## 🔍 Debugging

### Development Environment Logging

In development and staging, the ApiService logs configuration info:

```
🚀 Environment: development
📡 API Base URL: http://localhost:3000
Custom URLs: {url1: "http://localhost:3000", url2: "http://localhost:3001", url3: "http://localhost:3002"}
```

### Using Environment Detection

```typescript
if (!environment.production) {
  console.log('Debug info:', this.data);
  // Additional debugging
}
```

---

## 📱 CSS Framework Customization

### Bootstrap Variables

Customize Bootstrap in `src/styles.scss`:

```scss
// Override Bootstrap variables before import
$primary: #007bff;
$secondary: #6c757d;
$success: #28a745;

@import 'bootstrap/scss/bootstrap';
```

### PrimeNG Theme

Change the theme by updating `src/styles.scss`:

```scss
// Available themes: lara-light-blue, lara-light-indigo, lara-dark-blue, etc.
@import 'primeng/resources/themes/lara-light-blue/theme.css';
```

---

## 🚀 Deployment

### Development Build
```bash
yarn build:dev
# Output: dist/AYUVA/
```

### Staging Build
```bash
yarn build:staging
# Output: dist/AYUVA/
```

### Production Build
```bash
yarn build:prod
# Output: dist/AYUVA/
```

Deploy the `dist/AYUVA/` folder to your hosting platform.

---

## ✅ Best Practices

1. **Use ApiService for all configuration access** - Provides consistent interface
2. **Define endpoints in common.environment.ts** - Single source of truth
3. **Override only what's different** - Keep environments DRY
4. **Check environment before logging** - Keep console clean in production
5. **Use feature flags for gradual rollouts** - Control feature availability
6. **Use path aliases** - Easier refactoring and cleaner imports
7. **Test in all environments** - Verify configuration before deployment

---

## 🆘 Troubleshooting

### Issue: API URL not changing
**Solution:** 
- Clear dist folder: `rm -rf dist`
- Rebuild with correct configuration
- Verify you're running the correct serve command

### Issue: Import path errors
**Solution:**
- Check `tsconfig.json` path aliases
- Ensure `baseUrl` is set to `"."`
- Restart the dev server

### Issue: Bootstrap/PrimeNG styles not loading
**Solution:**
- Run `yarn install` to ensure dependencies are installed
- Clear node_modules: `rm -rf node_modules && yarn install`
- Restart dev server

### Issue: Different URLs in different components
**Solution:**
- Use ApiService consistently across the app
- Check if component is overriding environment values
- Verify environment file has correct URLs

---

## 📚 Example Components

Two example components are included:

### 1. EnvironmentInfoComponent
Displays current environment configuration:
```typescript
import { EnvironmentInfoComponent } from '@app/components/environment-info.component';

@Component({
  imports: [EnvironmentInfoComponent]
})
export class AppComponent {}
```

### 2. ApiUsageExampleComponent
Shows how to use ApiService:
```typescript
import { ApiUsageExampleComponent } from '@app/components/api-usage-example.component';

@Component({
  imports: [ApiUsageExampleComponent]
})
export class AppComponent {}
```

---

## 🔗 Useful Commands

```bash
# Install dependencies
yarn install

# Development server
yarn start

# Staging server
yarn start:staging

# Production server (local)
yarn start:prod

# Build for development
yarn build:dev

# Build for staging
yarn build:staging

# Build for production
yarn build:prod
yarn build

# Watch mode
yarn watch

# Run tests
yarn test

# Angular CLI help
yarn ng --help
```

---

## 📖 Additional Resources

- [Angular CLI Documentation](https://angular.dev)
- [Angular Environment Guide](https://angular.dev/guide/build)
- [Bootstrap 5 Documentation](https://getbootstrap.com)
- [PrimeNG Documentation](https://primeng.org)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

---

## 📝 Summary

Your Angular application is now fully configured for:
✅ Multiple environments (Development, Staging, Production)
✅ Environment-specific configurations and URLs
✅ Common configuration with per-environment overrides
✅ Bootstrap 5 for responsive design
✅ PrimeNG for rich UI components
✅ Feature flags for gradual feature rollouts
✅ TypeScript path aliases for clean imports
✅ Comprehensive ApiService for configuration access

Happy coding! 🚀
