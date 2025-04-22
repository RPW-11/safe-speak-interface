import { useState, useCallback } from 'react';
import { login, oauthLogin, register, logout } from '@/services/auth';
import { LoginCredentials, RegisterCredentials, User } from '@/types/auth';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginUser = useCallback(async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: User = await login(credentials);
            return response;
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const oauthLoginUser = useCallback(async (provider: string) => {
        oauthLogin(provider)
    }, []);

    const registerUser = useCallback(async (data: RegisterCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: User = await register(data);
            return response;
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logoutUser = useCallback(async () => {
        setIsLoading(true);
        try {
            await logout();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Logout failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { loginUser, oauthLoginUser, registerUser, logoutUser, isLoading, error };
};