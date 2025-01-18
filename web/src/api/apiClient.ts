import axios, { AxiosInstance } from 'axios';

class ApiClient {
  public http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public setToken(token: string): void {
    this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeToken(): void {
    delete this.http.defaults.headers.common['Authorization'];
  }
}

// Replace with .env
const apiClient = new ApiClient('http://localhost:3003/');
export default apiClient;
