import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  resendOtp: (email: string) => Promise<{ success: boolean; message?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  verifyOtpPassword: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  setNewPassword: (email: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const forgotPassword = async (email: string) => {
    try {
      const response = await apiService.forgotPassword(email.toLowerCase().trim());
      
      if (response.success) {
        return {
          success: true,
          message: response.data?.message || 'OTP sent to your email',
        };
      } else {
        return {
          success: false,
          message: response.error || 'Email not found',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  };

  const verifyOtpPassword = async (email: string, otp: string) => {
    try {
      const otpData = { 
        email: email.toLowerCase().trim(), 
        otp: otp.trim()
      };
      
      const response = await apiService.verifyOtpPassword(otpData);
      
      if (response.success) {
        return {
          success: true,
          message: response.data?.message || 'OTP verified successfully',
        };
      } else {
        return {
          success: false,
          message: response.error || 'Invalid OTP or email',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  };

  const setNewPassword = async (email: string, newPassword: string) => {
    try {
      const passwordData = { 
        email: email.toLowerCase().trim(), 
        new_password: newPassword
      };
      
      const response = await apiService.setNewPassword(passwordData);
      
      if (response.success) {
        return {
          success: true,
          message: response.data?.message || 'Password reset successfully',
        };
      } else {
        return {
          success: false,
          message: response.error || 'Invalid email or password',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  };

  useEffect(() => {
    // Check for stored user and token on mount
    const storedUser = localStorage.getItem('prf_user');
    const token = apiService.getAuthToken();
    
    if (storedUser && storedUser !== 'undefined' && storedUser !== '"undefined"' && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Validate that the parsed user is a valid object
        if (parsedUser && typeof parsedUser === 'object' && parsedUser.id) {
          setUser(parsedUser);
        } else {
          // Invalid user data, clean up localStorage
          localStorage.removeItem('prf_user');
          apiService.removeAuthToken();
        }
      } catch (error) {
        // Invalid JSON, clean up localStorage
        console.warn('Invalid user data in localStorage, cleaning up:', error);
        localStorage.removeItem('prf_user');
        apiService.removeAuthToken();
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (name: string, email: string, password: string) => {
    try {
      const registerData = { 
        name: name.trim(), 
        email: email.toLowerCase().trim(), 
        password 
      };
      const response = await apiService.register(registerData);
      
      if (response.success) {
        // Registration successful, but user still needs to login and verify OTP
        return {
          success: true,
          message: response.data?.message || 'User registered successfully',
        };
      } else {
        return {
          success: false,
          message: response.error || 'Registration failed. Please try again.',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const loginData = { 
        email: email.toLowerCase().trim(), 
        password 
      };
      const response = await apiService.login(loginData);
      
      if (response.success) {
        return {
          success: true,
          message: response.data?.message || 'OTP sent to your email',
        };
      } else {
        return {
          success: false,
          message: response.error || 'Invalid credentials',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      // Ensure email is properly formatted and OTP is sent as string
      const otpData = { 
        email: email.toLowerCase().trim(), 
        otp: otp.trim()
      };
      
      console.log('Sending OTP verification request:', otpData); // Debug log
      
      const response = await apiService.verifyOtp(otpData);
      
      if (response.success && response.data) {
        const { message, token, user: userData } = response.data;
        
        console.log('OTP verification successful:', { token, userData }); // Debug log
        
        // Store user (including role) and token immediately
        setUser(userData);
        apiService.setAuthToken(token);
        localStorage.setItem('prf_user', JSON.stringify(userData));
        
        return {
          success: true,
          message: message || 'OTP verified successfully',
          user: userData, // Return user data for redirect logic
        };
      } else {
        return {
          success: false,
          message: response.error || 'Invalid or expired OTP',
        };
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        success: false,
        message: 'Erreur réseau. Veuillez vérifier votre connexion et réessayer.',
      };
    }
  };

  const resendOtp = async (email: string) => {
    try {
      console.log('AuthContext: Resending OTP for email:', email); // Debug log
      
      // Use the API service which handles CORS properly through proxy
      const response = await apiService.resendOtp(email.toLowerCase().trim());
      
      console.log('AuthContext: Resend OTP response:', response); // Debug log
      
      if (response.success) {
        return {
          success: true,
          message: response.data?.message || 'Nouveau code OTP envoyé à votre email',
        };
      } else {
        return {
          success: false,
          message: response.error || 'Échec de l\'envoi du code OTP. Veuillez réessayer.',
        };
      }
    } catch (error) {
      console.error('AuthContext: Resend OTP error:', error);
      return {
        success: false,
        message: 'Erreur de réseau. Veuillez vérifier votre connexion et réessayer.',
      };
    }
  };
  const logout = () => {
    setUser(null);
    apiService.removeAuthToken();
    localStorage.removeItem('prf_user');
    localStorage.removeItem('prf_subscription');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      verifyOtp,
      resendOtp,
      forgotPassword,
      verifyOtpPassword,
      setNewPassword,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}