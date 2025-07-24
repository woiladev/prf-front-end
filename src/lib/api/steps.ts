import BaseApiService from './base';
import { API_ENDPOINTS } from '../../config/api';
import type { 
  ApiResponse, 
  SubscriptionLevel,
  CreateSubscriptionLevelRequest,
  UpdateSubscriptionLevelRequest,
  SubscriptionLevelsResponse
} from '../../types/api';

class StepsApiService extends BaseApiService {
  async createStep(stepData: CreateSubscriptionLevelRequest): Promise<ApiResponse<{ message: string; step: SubscriptionLevel }>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.STEPS.BASE, {
      method: 'POST',
      body: JSON.stringify(stepData),
    });
  }

  async getProjectSteps(projectId: number): Promise<ApiResponse<SubscriptionLevelsResponse>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.STEPS.INDEX, {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId }),
    });
  }

  async updateStep(stepId: number, stepData: UpdateSubscriptionLevelRequest): Promise<ApiResponse<{ message: string; step: SubscriptionLevel }>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.STEPS.BY_ID(stepId), {
      method: 'PUT',
      body: JSON.stringify(stepData),
    });
  }

  async deleteStep(stepId: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.STEPS.BY_ID(stepId), {
      method: 'DELETE',
    });
  }
}

export const stepsApi = new StepsApiService();