import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;
  private endpoints = environment.apiEndpoints;
  private environmentName = environment.env;
  private isProduction = environment.production;
  private customUrls = {
    url1: environment.url1,
    url2: environment.url2,
    url3: environment.url3
  };

  constructor() {
    this.logEnvironmentInfo();
  }

  /**
   * Get the API base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Get a specific endpoint
   */
  getEndpoint(key: keyof typeof this.endpoints): string {
    return this.baseUrl + this.endpoints[key];
  }

  /**
   * Get current environment name
   */
  getEnvironment(): string {
    return this.environmentName;
  }

  /**
   * Check if running in production
   */
  isProductionEnvironment(): boolean {
    return this.isProduction;
  }

  /**
   * Get all endpoints
   */
  getAllEndpoints() {
    return this.endpoints;
  }

  /**
   * Get custom URL by name (url1, url2, url3, etc.)
   */
  getCustomUrl(urlName: keyof typeof this.customUrls): string {
    return this.customUrls[urlName];
  }

  /**
   * Get all custom URLs
   */
  getAllCustomUrls() {
    return this.customUrls;
  }

  /**
   * Get feature flag status
   */
  isFeatureEnabled(featureName: keyof typeof environment.features): boolean {
    return environment.features[featureName];
  }

  /**
   * Get all feature flags
   */
  getAllFeatures() {
    return environment.features;
  }

  private logEnvironmentInfo(): void {
    if (!this.isProduction) {
      console.log(`%c🚀 Environment: ${this.environmentName}`, 'color: #00ff00; font-weight: bold;');
      console.log(`%c📡 API Base URL: ${this.baseUrl}`, 'color: #0099ff; font-weight: bold;');
      console.log('%cCustom URLs:', 'color: #ff9900; font-weight: bold;', this.customUrls);
    }
  }
}
