import BaseApiService from './base';
import { API_ENDPOINTS } from '../../config/api';
import type { 
  ApiResponse, 
  UserManagement, 
  UsersResponse, 
  UserResponse, 
  UpdateUserRoleRequest, 
  UpdateUserRoleResponse 
} from '../../types/api';

class UsersApiService extends BaseApiService {
  async getAllUsers(): Promise<ApiResponse<UsersResponse>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.USERS.BASE);
  }

  async getUser(id: number): Promise<ApiResponse<UserResponse>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.USERS.BY_ID(id));
  }

  async updateUserRole(id: number, roleData: UpdateUserRoleRequest): Promise<ApiResponse<UpdateUserRoleResponse>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.USERS.UPDATE_TYPE(id), {
      method: 'PUT',
      body: JSON.stringify(roleData),
    });
  }
}

export const usersApi = new UsersApiService();