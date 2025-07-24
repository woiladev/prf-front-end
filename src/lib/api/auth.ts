import BaseApiService from './base';
import { API_ENDPOINTS } from '../../config/api';
import type { 
  ApiResponse, 
  User, 
  RegisterRequest, 
  LoginRequest, 
  VerifyOtpRequest,
  ForgotPasswordRequest,
  VerifyOtpPasswordRequest,
  SetNewPasswordRequest 
} from '../../types/api';

class AuthApiService extends BaseApiService {
  async register(userData: RegisterRequest): Promise<ApiResponse<{ message: string; user: User }>> {
    return this.makeRequest(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyOtp(otpData: VerifyOtpRequest): Promise<ApiResponse<{ message: string; token: string; user: User }>> {
    return this.makeRequest(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({
        email: otpData.email,
        otp: otpData.otp
      }),
    });
  }

  async resendOtp(email: string): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify({ 
        email: email,
        otp: "resend"
      }),
    });
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOtpPassword(otpData: VerifyOtpPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
  }

  async setNewPassword(passwordData: SetNewPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest(API_ENDPOINTS.AUTH.SET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }
}

export const authApi = new AuthApiService();