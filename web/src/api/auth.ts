import apiClient from "./apiClient";

interface LoginParams {
  message: string;
  username: string;
  password: string;
};

export const authApi = {
  async login(params: LoginParams): Promise<string> {
    const response = await apiClient.http.post<{ token: string }>('/api/login', params);
    return response.data.token;
  },

  async logout(): Promise<void> {
    await apiClient.http.post('/api/logout');
  },
};
