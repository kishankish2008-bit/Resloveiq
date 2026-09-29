import {
  AnalysisRequest,
  AnalysisResponse,
  HealthResponse,
  ResolveRequest,
  ResolveResponse,
} from '../types/incident';

const STORAGE_KEY_API_BASE = 'resolveiq_api_base_url';

export function getApiBaseUrl(): string {
  const stored = localStorage.getItem(STORAGE_KEY_API_BASE);
  if (stored) return stored.trim().replace(/\/$/, '');
  
  // Default from env or fallback
  const envUrl = (import.meta.env.VITE_API_BASE_URL as string) || '';
  if (envUrl) return envUrl.trim().replace(/\/$/, '');
  
  // If running in development or browser, empty string routes to relative /api
  return '';
}

export function setApiBaseUrl(url: string): void {
  if (!url) {
    localStorage.removeItem(STORAGE_KEY_API_BASE);
  } else {
    localStorage.setItem(STORAGE_KEY_API_BASE, url.trim().replace(/\/$/, ''));
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    let responseData: any = null;

    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      const text = await response.text();
      try {
        responseData = JSON.parse(text);
      } catch {
        responseData = { message: text };
      }
    }

    if (!response.ok) {
      const errorMsg =
        responseData?.error ||
        responseData?.message ||
        `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    return responseData as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after 20s connecting to ${url}`);
    }
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      throw new Error(
        `Unable to reach backend at ${url || 'server'}. Please ensure the backend is running.`
      );
    }
    throw error;
  }
}

export const api = {
  async getHealth(): Promise<HealthResponse> {
    return request<HealthResponse>('/api/health', {
      method: 'GET',
    });
  },

  async seedDatabase(): Promise<{ success: boolean; message: string; count?: number }> {
    return request<{ success: boolean; message: string; count?: number }>('/api/seed', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  },

  async analyzeIncident(payload: AnalysisRequest): Promise<AnalysisResponse> {
    return request<AnalysisResponse>('/api/analyze', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async resolveIncident(payload: ResolveRequest): Promise<ResolveResponse> {
    return request<ResolveResponse>('/api/resolve', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
