import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { CommonModule } from '@angular/common';

/**
 * Demonstrates how to use ApiService to access environment configuration.
 * Remove or replace this component once real features are built.
 */
@Component({
  selector: 'app-api-usage-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-success text-white">
          <h6 class="mb-0">ApiService — Live Values</h6>
        </div>
        <div class="card-body">
          <p><strong>Environment:</strong> <code>{{ apiData.environment }}</code></p>
          <p><strong>Production:</strong> <code>{{ apiData.isProduction }}</code></p>
          <p><strong>API Base URL:</strong> <code>{{ apiData.baseUrl }}</code></p>

          <hr />

          <h6>Custom URLs</h6>
          <ul class="list-unstyled mb-0">
            <li *ngFor="let url of apiData.customUrls | keyvalue">
              <code>{{ url.key }}</code>: <span class="text-muted">{{ url.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card { box-shadow: 0 1px 3px rgba(0,0,0,.1); }
    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; font-size: .85em; }
  `]
})
export class ApiUsageExampleComponent implements OnInit {
  apiData: {
    environment: string;
    isProduction: boolean;
    baseUrl: string;
    customUrls: ReturnType<ApiService['getAllCustomUrls']>;
  } = {
    environment: '',
    isProduction: false,
    baseUrl: '',
    customUrls: { url1: '', url2: '', url3: '' }
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiData = {
      environment: this.apiService.getEnvironment(),
      isProduction: this.apiService.isProductionEnvironment(),
      baseUrl: this.apiService.getBaseUrl(),
      customUrls: this.apiService.getAllCustomUrls()
    };
  }
}
