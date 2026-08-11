import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@app/services/api.service';
import { AppConfig } from '@config/config';

/**
 * Displays current environment configuration at a glance.
 * Useful during development. Can be gated behind !production in the shell.
 */
@Component({
  selector: 'app-environment-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h6 class="mb-0">Environment — {{ currentEnv | uppercase }}</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <p>
                <strong>Status:</strong>
                <span class="badge ms-1" [ngClass]="getEnvBadgeClass()">{{ currentEnv }}</span>
              </p>
              <p><strong>Production:</strong>
                <span class="badge ms-1" [ngClass]="isProduction ? 'bg-danger' : 'bg-success'">
                  {{ isProduction ? 'Yes' : 'No' }}
                </span>
              </p>
              <p><strong>Domain:</strong> <code>{{ appConfig.domainName }}</code></p>
              <p><strong>API Base:</strong> <code>{{ appConfig.apiBaseUrl }}</code></p>
              <p><strong>App:</strong> {{ appConfig.appName }} v{{ appConfig.appVersion }}</p>
            </div>
            <div class="col-md-6">
              <h6>Custom URLs</h6>
              <ul class="list-unstyled">
                <li *ngFor="let url of customUrlsList">
                  <code>{{ url.name }}</code>: <span class="text-muted small">{{ url.value }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card { box-shadow: 0 1px 3px rgba(0,0,0,.1); }
    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; font-size: .85em; }
  `]
})
export class EnvironmentInfoComponent implements OnInit {
  currentEnv = '';
  isProduction = false;
  appConfig = AppConfig;
  customUrlsList: { name: string; value: string }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.currentEnv = this.apiService.getEnvironment();
    this.isProduction = this.apiService.isProductionEnvironment();
    const urls = this.apiService.getAllCustomUrls();
    this.customUrlsList = Object.entries(urls).map(([name, value]) => ({ name, value }));
  }

  getEnvBadgeClass(): string {
    const classes: Record<string, string> = {
      development: 'bg-info text-dark',
      staging: 'bg-warning text-dark',
      production: 'bg-danger'
    };
    return classes[this.currentEnv] ?? 'bg-secondary';
  }
}
