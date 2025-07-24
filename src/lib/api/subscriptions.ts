import BaseApiService from './base';
import { API_ENDPOINTS } from '../../config/api';
import type { 
  ApiResponse, 
  Subscription,
  CreateSubscriptionRequest,
  SubscriptionsResponse,
  SubscriptionResponse,
  ProjectSubscriptionsResponse,
  ConfirmSubscriptionPaymentRequest
} from '../../types/api';

class SubscriptionsApiService extends BaseApiService {
  async createSubscription(subscriptionData: CreateSubscriptionRequest): Promise<ApiResponse<{ message: string; subscription: Subscription }>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.SUBSCRIPTIONS.BASE, {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async getAllSubscriptions(): Promise<ApiResponse<SubscriptionsResponse>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.SUBSCRIPTIONS.BASE);
  }

  async getSubscription(subscriptionId: number): Promise<ApiResponse<SubscriptionResponse>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.SUBSCRIPTIONS.BY_ID(subscriptionId));
  }

  async getProjectSubscriptions(projectId: number): Promise<ApiResponse<ProjectSubscriptionsResponse>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.PROJECTS.SUBSCRIPTIONS(projectId));
  }

  async confirmPayment(paymentData: ConfirmSubscriptionPaymentRequest): Promise<ApiResponse<{ message: string; subscription: Subscription }>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.SUBSCRIPTIONS.PAYMENT_CONFIRM, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }
}

export const subscriptionsApi = new SubscriptionsApiService();