import apiClient from './index';
import { LoginCredentials, User, RegisterCredentials } from '@/types/auth';

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const getUserInfo = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me')
  return response.data as User
}

export const oauthLogin = async (provider: string): Promise<void> => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/oauth?oauth_provider=${provider}&client_redirect_url=${window.origin}/dashboard`
}

export const register = async (data: RegisterCredentials): Promise<User> => {
  const response = await apiClient.post('/auth/signup', data);
  return response.data;
};

export const updateProfilePicture = async (img_url: string): Promise<void> => {
  await apiClient.patch('/auth/update-profile', { img_url });
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

export const refreshToken = async (refreshToken: string): Promise<User> => {
  const response = await apiClient.post('/auth/refresh', { refreshToken });
  return response.data;
};