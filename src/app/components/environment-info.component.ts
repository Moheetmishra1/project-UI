import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { AppConfig } from '@config/config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-environment-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">🚀 Environment Configuration</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <h6 class="fw-bold">Environment Details</h6>
                  <p><strong>Environment:</strong> <span class="badge" [ngClass]="getEnvBadgeClass()">{{ currentEnv }}</span></p>
                  <p><strong>Production:</strong> <span class="badge" [ngClass]="isProduction ? 'bg-danger' : 'bg-success'">{{ isProduction ? 'Yes' : 'No' }}</span></p>
                  <p><strong>Base URL:</strong> <code>{{ baseUrl }}</code></p>
                </div>
                
                <div class="col-md-6">
                  <h6 class="fw-bold">Feature Flags</h6>
                  <ul class="list-unstyled">
                    <li *ngFor="let flag of featureFlagsList">
                      <span class="badge" [ngClass]="flag.enabled ? 'bg-success' : 'bg-secondary'">
                        {{ flag.enabled ? '✓' : '✗' }}
                      </span>
                      {{ flag.name }}
                    </li>
                  </ul>
                </div>
              </div>

              <hr />

              <h6 class="fw-bold">API Endpoints</h6>
              <div class="table-responsive">
                <table class="table table-sm table-hover">
                  <thead class="table-light">
                    <tr>
                      <th>Endpoint</th>
                      <th>Full URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let endpoint of endpointsList">
                      <td><code>{{ endpoint.key }}</code></td>
                      <td><code class="text-primary">{{ endpoint.url }}</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr />

              <h6 class="fw-bold">Custom URLs</h6>
              <div class="table-responsive">
                <table class="table table-sm table-hover">
                  <thead class="table-light">
                    <tr>
                      <th>URL Name</th>
                      <th>URL Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let url of customUrlsList">
                      <td><code>{{ url.name }}</code></td>
                      <td><code class="text-success">{{ url.value }}</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr />

              <h6 class="fw-bold">Configuration Summary</h6>
              <pre class="bg-light p-3 rounded"><code>{{ configSummary | json }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    code {
      background-color: #f5f5f5;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.85em;
    }
    
    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class EnvironmentInfoComponent implements OnInit {
  currentEnv: string = '';
  baseUrl: string = '';
  isProduction: boolean = false;
  
  featureFlagsList: { name: string; enabled: boolean }[] = [];
  endpointsList: { key: string; url: string }[] = [];
  customUrlsList: { name: string; value: string }[] = [];
  
  configSummary: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEnvironmentInfo();
  }

  private loadEnvironmentInfo(): void {
    this.currentEnv = this.apiService.getEnvironment();
    this.baseUrl = this.apiService.getBaseUrl();
    this.isProduction = this.apiService.isProductionEnvironment();

    const features = this.apiService.getAllFeatures();
    this.featureFlagsList = Object.entries(features).map(([key, value]) => ({
      name: this.formatKey(key),
      enabled: value
    }));

    const endpoints = this.apiService.getAllEndpoints();
    this.endpointsList = Object.entries(endpoints).map(([key, path]) => ({
      key,
      url: this.apiService.getEndpoint(key as any)
    }));

    const customUrls = this.apiService.getAllCustomUrls();
    this.customUrlsList = Object.entries(customUrls).map(([name, value]) => ({
      name,
      value
    }));

    this.configSummary = {
      environment: this.currentEnv,
      production: this.isProduction,
      apiBaseUrl: this.baseUrl,
      appName: AppConfig.appName,
      appVersion: AppConfig.appVersion,
      apiTimeout: AppConfig.apiTimeout,
      cacheEnabled: AppConfig.cache.enabled
    };
  }

  getEnvBadgeClass(): string {
    switch (this.currentEnv) {
      case 'development':
        return 'bg-info';
      case 'staging':
        return 'bg-warning text-dark';
      case 'production':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  private formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}
