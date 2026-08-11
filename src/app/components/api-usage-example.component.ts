import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-api-usage-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header bg-success text-white">
              <h5 class="mb-0">📚 API Service Usage Examples</h5>
            </div>
            <div class="card-body">
              <div class="alert alert-info" role="alert">
                <strong>Info:</strong> This component demonstrates how to use the ApiService with environment configuration.
              </div>

              <h6 class="fw-bold mt-4">Basic API Calls</h6>
              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Get base URL
const baseUrl = this.apiService.getBaseUrl();
// Result: {{ apiData.baseUrl }}</code></pre>
              </div>

              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Get specific endpoint
const authUrl = this.apiService.getEndpoint('auth');
// Result: {{ apiData.authEndpoint }}</code></pre>
              </div>

              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Get all endpoints
const endpoints = this.apiService.getAllEndpoints();
// Result: {{ apiData.allEndpoints | json }}</code></pre>
              </div>

              <h6 class="fw-bold mt-4">Custom URLs</h6>
              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Get custom URL
const url1 = this.apiService.getCustomUrl('url1');
// Result: {{ apiData.customUrl }}</code></pre>
              </div>

              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Get all custom URLs
const customUrls = this.apiService.getAllCustomUrls();
// Result: {{ apiData.allCustomUrls | json }}</code></pre>
              </div>

              <h6 class="fw-bold mt-4">Feature Flags</h6>
              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Check if feature is enabled
const isLoggingEnabled = this.apiService.isFeatureEnabled('enableLogging');
// Result: {{ apiData.loggingEnabled }}</code></pre>
              </div>

              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Get all features
const features = this.apiService.getAllFeatures();
// Result: {{ apiData.allFeatures | json }}</code></pre>
              </div>

              <h6 class="fw-bold mt-4">Environment Info</h6>
              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Get current environment
const env = this.apiService.getEnvironment();
// Result: {{ apiData.environment }}</code></pre>
              </div>

              <div class="code-block bg-light p-3 rounded mb-3">
                <pre><code>// Check if production
const isProd = this.apiService.isProductionEnvironment();
// Result: {{ apiData.isProduction }}</code></pre>
              </div>

              <h6 class="fw-bold mt-4">Real-world Example: Making an API Call</h6>
              <div class="code-block bg-light p-3 rounded">
                <pre><code>export class UserService {{`{
  constructor(private api: ApiService, private http: HttpClient) {{}

  getUsers() {{`{
    const endpoint = this.api.getEndpoint('users');
    return this.http.get(endpoint).pipe(
      timeout(this.api.getTimeout()),
      retry({{ count: 3, delay: 1000 }})
    );
  }`}}
}`}}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .code-block {
      border-left: 4px solid #007bff;
      overflow-x: auto;
    }

    .code-block code {
      font-size: 0.85em;
      line-height: 1.5;
      color: #333;
    }

    .card {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class ApiUsageExampleComponent implements OnInit {
  apiData: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadApiData();
  }

  private loadApiData(): void {
    this.apiData = {
      baseUrl: this.apiService.getBaseUrl(),
      authEndpoint: this.apiService.getEndpoint('auth'),
      allEndpoints: this.apiService.getAllEndpoints(),
      customUrl: this.apiService.getCustomUrl('url1'),
      allCustomUrls: this.apiService.getAllCustomUrls(),
      loggingEnabled: this.apiService.isFeatureEnabled('enableLogging'),
      allFeatures: this.apiService.getAllFeatures(),
      environment: this.apiService.getEnvironment(),
      isProduction: this.apiService.isProductionEnvironment()
    };
  }
}
