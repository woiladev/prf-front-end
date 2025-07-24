import BaseApiService from './base';
import { API_ENDPOINTS } from '../../config/api';
import type { 
  ApiResponse, 
  Project, 
  CreateProjectRequest, 
  UpdateProjectRequest,
  SubscriptionLevel,
  CreateSubscriptionLevelRequest 
} from '../../types/api';

class ProjectsApiService extends BaseApiService {
  async createProject(projectData: CreateProjectRequest): Promise<ApiResponse<Project>> {
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('is_free', projectData.is_free.toString());
    formData.append('category_id', projectData.category_id.toString());
    
    if (projectData.description) {
      formData.append('description', projectData.description);
    }
    if (projectData.image) {
      formData.append('image', projectData.image);
    }
    if (projectData.basic_price !== undefined) {
      formData.append('basic_price', projectData.basic_price.toString());
    }
    if (projectData.classic_price !== undefined) {
      formData.append('classic_price', projectData.classic_price.toString());
    }
    if (projectData.premium_price !== undefined) {
      formData.append('premium_price', projectData.premium_price.toString());
    }

    return this.makeAuthenticatedFormRequest(API_ENDPOINTS.PROJECTS.BASE, formData);
  }

  async getProjects(): Promise<ApiResponse<{ projects: Project[] }>> {
    return this.makeRequest(API_ENDPOINTS.PROJECTS.BASE);
  }

  async getProject(id: number): Promise<ApiResponse<{ project: Project }>> {
    return this.makeRequest(API_ENDPOINTS.PROJECTS.BY_ID(id));
  }

  async updateProject(id: number, projectData: UpdateProjectRequest): Promise<ApiResponse<Project>> {
    const formData = new FormData();
    
    if (projectData.name) {
      formData.append('name', projectData.name);
    }
    if (projectData.description) {
      formData.append('description', projectData.description);
    }
    if (projectData.image) {
      formData.append('image', projectData.image);
    }
    if (projectData.is_free !== undefined) {
      formData.append('is_free', projectData.is_free.toString());
    }
    if (projectData.category_id !== undefined) {
      formData.append('category_id', projectData.category_id.toString());
    }
    if (projectData.basic_price !== undefined) {
      formData.append('basic_price', projectData.basic_price.toString());
    }
    if (projectData.classic_price !== undefined) {
      formData.append('classic_price', projectData.classic_price.toString());
    }
    if (projectData.premium_price !== undefined) {
      formData.append('premium_price', projectData.premium_price.toString());
    }

    return this.makeAuthenticatedFormRequest(API_ENDPOINTS.PROJECTS.BY_ID(id), formData, {
      method: 'PUT',
    });
  }

  async deleteProject(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.PROJECTS.BY_ID(id), {
      method: 'DELETE',
    });
  }

  async createSubscriptionLevel(levelData: CreateSubscriptionLevelRequest): Promise<ApiResponse<SubscriptionLevel>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.SUBSCRIPTIONS.STEPS, {
      method: 'POST',
      body: JSON.stringify(levelData),
    });
  }

  async getProjectSubscriptionLevels(projectId: number): Promise<ApiResponse<{ steps: SubscriptionLevel[] }>> {
    return this.makeRequest(API_ENDPOINTS.PROJECTS.STEPS(projectId));
  }
}

export const projectsApi = new ProjectsApiService();