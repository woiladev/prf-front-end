import BaseApiService from './base';
import { API_ENDPOINTS } from '../../config/api';
import type { 
  ApiResponse, 
  BlogPost, 
  BlogsResponse, 
  BlogResponse, 
  CreateCommentRequest, 
  CommentsResponse, 
  CommentResponse 
} from '../../types/api';

class BlogApiService extends BaseApiService {
  async createBlog(formData: FormData): Promise<ApiResponse<BlogResponse>> {
    return this.makeAuthenticatedFormRequest(API_ENDPOINTS.BLOG.BASE, formData);
  }

  async getBlogs(): Promise<ApiResponse<BlogsResponse>> {
    return this.makeRequest(API_ENDPOINTS.BLOG.BASE);
  }

  async getBlog(id: number): Promise<ApiResponse<BlogResponse>> {
    return this.makeRequest(API_ENDPOINTS.BLOG.BY_ID(id));
  }

  async updateBlog(id: number, blogData: FormData): Promise<ApiResponse<BlogResponse>> {
    return this.makeAuthenticatedFormRequest(API_ENDPOINTS.BLOG.BY_ID(id), blogData, {
      method: 'PUT',
    });
  }

  async deleteBlog(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(API_ENDPOINTS.BLOG.BY_ID(id), {
      method: 'DELETE',
    });
  }

  async addComment(blogId: number, commentData: CreateCommentRequest): Promise<ApiResponse<CommentResponse>> {
    return this.makeRequest(API_ENDPOINTS.BLOG.COMMENTS(blogId), {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async getBlogComments(blogId: number): Promise<ApiResponse<CommentsResponse>> {
    return this.makeRequest(API_ENDPOINTS.BLOG.COMMENTS(blogId));
  }

  async deleteComment(commentId: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }
}

export const blogApi = new BlogApiService();