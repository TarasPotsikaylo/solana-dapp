import apiClient from "./apiClient";

interface Profile {
  address: string;
};

export const profileApi = {
  async profile(): Promise<Profile> {
    const token = sessionStorage.getItem('TOKEN');
    
    if (token) {
      apiClient.setToken(token);
    }

    const response = await apiClient.http.get('/api/profile');
    return response.data;
  }
};
