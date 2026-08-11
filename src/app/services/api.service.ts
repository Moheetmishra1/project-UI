import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

/**
 * ApiService provides environment-aware base URL and custom URL access.
 * HTTP calls should be made in feature-specific services using HttpClient directly.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly envName = environment.env;
  private readonly isProd = environment.production;
  private readonly customUrls = {
    url1: environment.url1,
    url2: environment.url2,
    url3: environment.url3
  } as const;

  constructor() {
    this.logEnvironmentInfo();
  }

  /** Returns the API base URL for the current environment */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /** Returns the current environment name: development | staging | production */
  getEnvironment(): string {
    return this.envName;
  }

  /** Returns true if running in production */
  isProductionEnvironment(): boolean {
    return this.isProd;
  }

  /** Returns a specific custom URL by key */
  getCustomUrl(urlName: keyof typeof this.customUrls): string {
    return this.customUrls[urlName];
  }

  /** Returns all custom URLs */
  getAllCustomUrls(): typeof this.customUrls {
    return this.customUrls;
  }

  private logEnvironmentInfo(): void {
    if (!this.isProd) {
      console.log(`%c[AYUVA] ENV: ${this.envName}`, 'color: #00cc88; font-weight: bold;');
      console.log(`%c[AYUVA] API: ${this.baseUrl}`, 'color: #0099ff; font-weight: bold;');
    }
  }
}
