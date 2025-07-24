// Ensure the correct base URL is set
const BASE_URL = import.meta.env.PROD ? 'https://ghvtest.ghvcameroon.com' : '';

// Add CORS headers for production requests
const getHeaders = (additionalHeaders: Record<string, string> = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders,
  };
  
  // Add CORS headers for production
  if (import.meta.env.PROD) {
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
  
  return headers;
};

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string; // More flexible role handling
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string; // API expects string, not integer
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User & { role?: string }; // Include role field
}


// Project interfaces
export interface Project {
  id: number;
  name: string;
  image?: string;
  description?: string;
  is_free: boolean;
  basic_price?: number;
  classic_price?: number;
  premium_price?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProjectRequest {
  name: string;
  category_id: number;
  image?: File;
  description?: string;
  is_free: boolean;
  basic_price?: number;
  classic_price?: number;
  premium_price?: number;
}

// Subscription interfaces
export interface Subscription {
  id: number;
  project_id: number;
  subscription_level: 'Basic' | 'Classic' | 'Premium';
  operator: 'mtn' | 'orange';
  payment_status?: string;
  created_at?: string;
}

export interface CreateSubscriptionRequest {
  project_id: number;
  subscription_level: 'Basic' | 'Classic' | 'Premium';
  operator: 'mtn' | 'orange';
}

export interface ConfirmPaymentRequest {
  subscription_id?: number;
  order_id?: number;
  payment_status: 'success' | 'failed';
}

// Product interfaces
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: File;
}

// Cart interfaces
export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product?: Product;
  created_at?: string;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}

// Order interfaces
export interface CheckoutRequest {
  operator: 'mtn' | 'orange';
}

export interface CheckoutResponse {
  message: string;
  order: Order;
}

export interface Order {
  id: number;
  user_id?: number;
  total_amount: number;
  status: string;
  operator: string;
  items: OrderItem[];
  created_at?: string;
  updated_at?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: Product;
}

// Enhanced Order interfaces
export interface OrderResponse {
  message: string;
  order: Order;
}

export interface PaymentConfirmRequest {
  order_id: number;
  payment_status: 'success' | 'failed';
}

export interface PaymentConfirmResponse {
  message: string;
  order: Order;
}

// Project interfaces
export interface Project {
  id: number;
  name: string;
  image?: string;
  description?: string;
  is_free: boolean;
  basic_price?: number;
  classic_price?: number;
  premium_price?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProjectRequest {
  name: string;
  category_id: number;
  image?: File;
  description?: string;
  is_free: boolean;
  basic_price?: number;
  classic_price?: number;
  premium_price?: number;
}

export interface UpdateProjectRequest {
  name?: string;
  category_id?: number;
  image?: File;
  description?: string;
  is_free?: boolean;
  basic_price?: number;
  classic_price?: number;
  premium_price?: number;
}

// Subscription Level interfaces
export interface SubscriptionLevel {
  id: number;
  project_id: number;
  level: 'Basic' | 'Classic' | 'Premium';
  details: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSubscriptionLevelRequest {
  project_id: number;
  level: 'Basic' | 'Classic' | 'Premium';
  details: string;
}

// Subscription interfaces
export interface Subscription {
  id: number;
  project_id: number;
  subscription_level: 'Basic' | 'Classic' | 'Premium';
  operator: 'mtn' | 'orange';
  payment_status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSubscriptionRequest {
  project_id: number;
  subscription_level: 'Basic' | 'Classic' | 'Premium';
  operator: 'mtn' | 'orange';
}

export interface ConfirmSubscriptionPaymentRequest {
  subscription_id: number;
  payment_status: 'success' | 'failed';
}

// Forgot Password interfaces
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyOtpPasswordRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpPasswordResponse {
  message: string;
}

export interface SetNewPasswordRequest {
  email: string;
  new_password: string;
}

export interface SetNewPasswordResponse {
  message: string;
}

// User Management interfaces (Admin only)
export interface UserManagement {
  id: number;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UsersResponse {
  users: UserManagement[];
}

export interface UserResponse {
  user: UserManagement;
}

export interface UpdateUserRoleRequest {
  role: 'user' | 'admin';
}

export interface UpdateUserRoleResponse {
  message: string;
  user: UserManagement;
}

// Newsletter interfaces
export interface Newsletter {
  id: number;
  subject: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  subscribed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SubscribeNewsletterRequest {
  email: string;
}

export interface SubscribeNewsletterResponse {
  message: string;
  subscription: NewsletterSubscription;
}
export interface SendNewsletterRequest {
  subject: string;
  content: string;
}

export interface SendNewsletterResponse {
  message: string;
}

export interface NewslettersResponse {
  newsletters: Newsletter[];
}

export interface SubscribedUsersResponse {
  subscribed_users: Array<{
    id: number;
    name: string;
    email: string;
  }>;
  subscribed_emails: Array<{
    id: number;
    email: string;
  }>;
}
export interface UnsubscribeNewsletterRequest {
  email: string;
}

export interface UnsubscribeNewsletterResponse {
  message: string;
}

// Category interfaces
export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
}

// Contact interfaces
export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  request_type: string;
  object: string;
  message: string;
}

export interface CreateContactResponse {
  message: string;
  contact: Contact;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  request_type: string;
  object: string;
  message: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactsResponse {
  contacts: Contact[];
}

export interface ContactResponse {
  contact: Contact;
}


// Reports interfaces
export interface ReportsResponse {
  ecommerce_revenue: number;
  subscription_revenue: number;
  order_count: number;
  subscription_count: number;
  subscriptions_per_package: SubscriptionPackageCount[];
  user_count: number;
  newsletter_count: number;
  project_count: number;
  product_count: number;
}

export interface SubscriptionPackageCount {
  subscription_level: 'basic' | 'classic' | 'premium';
  count: number;
}

export type ReportType = 'monthly' | 'yearly' | 'total';

// Blog interfaces
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author?: string;
  image?: string;
  video?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBlogPostRequest {
  title: string;
  content: string;
  author?: string;
  image?: File;
  video?: File;
}

export interface UpdateBlogPostRequest {
  title?: string;
  content?: string;
  author?: string;
  image?: File;
  video?: File;
}

export interface BlogComment {
  id: number;
  blog_id: number;
  user_id?: number;
  name: string;
  email: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCommentRequest {
  name: string;
  email: string;
  content: string;
}

export interface BlogsResponse {
  blogs: BlogPost[];
}

export interface BlogResponse {
  blog: BlogPost;
}

export interface CommentsResponse {
  comments: BlogComment[];
}

export interface CommentResponse {
  message: string;
  comment: BlogComment;
}

// Success Story interfaces
export interface SuccessStory {
  id: number;
  title: string;
  description: string;
  image?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateSuccessStoryRequest {
  title: string;
  description: string;
  image?: File;
}

export interface UpdateSuccessStoryRequest {
  title?: string;
  description?: string;
  image?: File;
}

export interface SuccessStoriesResponse {
  success: boolean;
  data: SuccessStory[];
}

export interface SuccessStoryResponse {
  success: boolean;
  data: SuccessStory;
}

export interface CreateSuccessStoryResponse {
  success: boolean;
  message: string;
  data: SuccessStory;
}

// Service Provider interfaces
// Formalisation interfaces
export interface Formalisation {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  structure: string;
  sector: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateFormalisationRequest {
  name: string;
  email: string;
  phone: string;
  location: string;
  structure: string;
  sector: string;
  description: string;
}

export interface CreateFormalisationResponse {
  message: string;
  formalisation: Formalisation;
}

export interface FormalisationsResponse {
  formalisations: Formalisation[];
}

export interface FormalisationResponse {
  formalisation: Formalisation;
}

export interface ServiceProvider {
  id: number;
  name: string;
  email: string;
  phone?: string;
  job_title?: string;
  location?: string;
  description?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateServiceProviderRequest {
  name: string;
  email: string;
  phone?: string;
  job_title?: string;
  location?: string;
  description?: string;
  image?: File;
}

// Review interfaces
export interface ServiceProviderReview {
  id: number;
  service_provider_id: number;
  name: string;
  email: string;
  rating: number;
  comment?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateReviewRequest {
  name: string;
  email: string;
  rating: number;
  comment?: string;
}

export interface CreateReviewResponse {
  message: string;
  review: ServiceProviderReview;
}

export interface ReviewsResponse {
  reviews: ServiceProviderReview[];
}
export interface UpdateServiceProviderRequest {
  name?: string;
  email?: string;
  phone?: string;
  job_title?: string;
  location?: string;
  description?: string;
  image?: File;
}
class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${BASE_URL}/api${endpoint}`;
      
      // For production, ensure we're making direct requests to the API
      const finalUrl = import.meta.env.PROD ? url : url;
      
      const response = await fetch(url, {
        headers: {
          ...getHeaders(),
          ...options.headers,
        },
        mode: import.meta.env.PROD ? 'cors' : 'same-origin',
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  private async makeFormRequest<T>(
    endpoint: string,
    formData: FormData,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${BASE_URL}${endpoint}`;
      const token = this.getAuthToken();
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          // Don't set Content-Type for FormData, let browser set it
          ...options.headers,
        },
        mode: import.meta.env.PROD ? 'cors' : 'same-origin',
        body: formData,
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Authentication methods
  async register(userData: RegisterRequest): Promise<ApiResponse<{ message: string; user: User }>> {
    return this.makeRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<{ message: string }>> {
    return this.makeRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyOtp(otpData: VerifyOtpRequest): Promise<ApiResponse<{ message: string; token: string; user: User }>> {
    return this.makeRequest('/verify-otp', {
      method: 'POST',
      body: JSON.stringify({
        email: otpData.email,
        otp: otpData.otp // Send OTP as string as per updated API spec
      }),
    });
  }

  async resendOtp(email: string): Promise<ApiResponse<{ message: string }>> {
    console.log('API Service: Resending OTP for:', email); // Debug log
    
    return this.makeRequest('/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ 
        email: email,
        otp: "resend" // Special flag to indicate resend request
      }),
    });
  }

  // Forgot Password methods
  async forgotPassword(email: string): Promise<ApiResponse<ForgotPasswordResponse>> {
    return this.makeRequest('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOtpPassword(otpData: VerifyOtpPasswordRequest): Promise<ApiResponse<VerifyOtpPasswordResponse>> {
    return this.makeRequest('/verify-otp', {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
  }

  async setNewPassword(passwordData: SetNewPasswordRequest): Promise<ApiResponse<SetNewPasswordResponse>> {
    return this.makeRequest('/set-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  // Project methods (Admin only)
  async createProject(projectData: CreateProjectRequest): Promise<ApiResponse<Project>> {
    // Prepare request body to match API specification exactly
    const requestBody = {
      name: projectData.name,
      image: null, // Always null in JSON, image handled separately if provided
      description: projectData.description || null,
      is_free: projectData.is_free,
      category_id: projectData.category_id,
      basic_price: projectData.basic_price || null,
      classic_price: projectData.classic_price || null,
      premium_price: projectData.premium_price || null
    };

    // If there's an image, use FormData, otherwise use JSON
    if (projectData.image) {
      const formData = new FormData();
      Object.keys(requestBody).forEach(key => {
        const value = requestBody[key as keyof typeof requestBody];
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      formData.append('image', projectData.image);
      return this.makeAuthenticatedFormRequest('/projects', formData);
    } else {
      // Send as JSON when no image
      return this.makeAuthenticatedRequest('/projects', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
    }
  }

  async getProjects(): Promise<ApiResponse<{ projects: Project[] }>> {
    return this.makeRequest('/projects');
  }

  async getProject(id: number): Promise<ApiResponse<{ project: Project }>> {
    return this.makeRequest(`/projects/${id}`);
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
    if (projectData.category_id !== undefined && !isNaN(projectData.category_id)) {
      formData.append('category_id', projectData.category_id.toString());
    }
    if (projectData.basic_price !== undefined && !isNaN(projectData.basic_price)) {
      formData.append('basic_price', projectData.basic_price.toString());
    }
    if (projectData.classic_price !== undefined && !isNaN(projectData.classic_price)) {
      formData.append('classic_price', projectData.classic_price.toString());
    }
    if (projectData.premium_price !== undefined && !isNaN(projectData.premium_price)) {
      formData.append('premium_price', projectData.premium_price.toString());
    }

    return this.makeAuthenticatedFormRequest(`/projects/${id}`, formData, { method: 'PUT' });
  }

  async deleteProject(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Subscription Level methods (Admin only)
  async createSubscriptionLevel(levelData: CreateSubscriptionLevelRequest): Promise<ApiResponse<SubscriptionLevel>> {
    return this.makeAuthenticatedRequest('/steps', {
      method: 'POST',
      body: JSON.stringify(levelData),
    });
  }

  async getProjectSubscriptionLevels(projectId: number): Promise<ApiResponse<{ steps: SubscriptionLevel[] }>> {
    return this.makeAuthenticatedRequest('/steps/index', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId }),
    });
  }

  async updateSubscriptionLevel(stepId: number, levelData: UpdateSubscriptionLevelRequest): Promise<ApiResponse<{ message: string; step: SubscriptionLevel }>> {
    return this.makeAuthenticatedRequest(`/steps/${stepId}`, {
      method: 'PUT',
      body: JSON.stringify(levelData),
    });
  }

  async deleteSubscriptionLevel(stepId: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/steps/${stepId}`, {
      method: 'DELETE',
    });
  }

  // Subscription methods
  async subscribeToProject(subscriptionData: CreateSubscriptionRequest): Promise<ApiResponse<Subscription>> {
    return this.makeAuthenticatedRequest('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async getAllSubscriptions(): Promise<ApiResponse<{ subscriptions: Subscription[] }>> {
    return this.makeAuthenticatedRequest('/subscriptions');
  }

  async getSubscription(subscriptionId: number): Promise<ApiResponse<{ subscription: Subscription }>> {
    return this.makeAuthenticatedRequest(`/subscriptions/${subscriptionId}`);
  }

  async getProjectSubscriptions(projectId: number): Promise<ApiResponse<{ subscriptions: Subscription[] }>> {
    return this.makeAuthenticatedRequest(`/projects/${projectId}/subscriptions`);
  }

  async confirmSubscriptionPayment(paymentData: ConfirmSubscriptionPaymentRequest): Promise<ApiResponse<{ message: string; subscription: Subscription }>> {
    return this.makeRequest('/subscriptions/payment/confirm', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }


  // Product methods
  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price.toString());
    formData.append('stock', productData.stock.toString());
    
    if (productData.description) {
      formData.append('description', productData.description);
    }
    if (productData.image) {
      formData.append('image', productData.image);
    }

    return this.makeAuthenticatedFormRequest('/products', formData);
  }

  async getProducts(): Promise<ApiResponse<{ products: Product[] }>> {
    return this.makeRequest('/products');
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return this.makeRequest(`/products/${id}`);
  }

  // Additional admin methods for CRUD operations
  async updateProduct(id: number, productData: FormData): Promise<ApiResponse<Product>> {
    return this.makeAuthenticatedFormRequest(`/products/${id}`, productData, {
      method: 'PUT',
    });
  }

  async deleteProduct(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async updateBlog(id: number, blogData: FormData): Promise<ApiResponse<BlogPost>> {
    return this.makeAuthenticatedFormRequest(`/blogs/${id}`, blogData, {
      method: 'PUT',
    });
  }

  async deleteBlog(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  async createExpert(expertData: FormData): Promise<ApiResponse<ServiceProvider>> {
    return this.makeAuthenticatedFormRequest('/service-providers', expertData);
  }

  async updateExpert(id: number, expertData: FormData): Promise<ApiResponse<ServiceProvider>> {
    return this.makeAuthenticatedFormRequest(`/service-providers/${id}`, expertData, {
      method: 'PUT',
    });
  }

  async deleteExpert(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/service-providers/${id}`, {
      method: 'DELETE',
    });
  }

  async createBlog(blogData: FormData): Promise<ApiResponse<BlogPost>> {
    return this.makeAuthenticatedFormRequest('/blogs', blogData);
  }

  // Cart methods
  async addToCart(cartData: AddToCartRequest): Promise<ApiResponse<CartItem>> {
    return this.makeAuthenticatedRequest('/cart', {
      method: 'POST',
      body: JSON.stringify(cartData),
    });
  }

  async getCart(): Promise<ApiResponse<{ cart: CartItem[] }>> {
    return this.makeAuthenticatedRequest('/cart');
  }

  async updateCartItem(id: number, updateData: UpdateCartRequest): Promise<ApiResponse<CartItem>> {
    return this.makeAuthenticatedRequest(`/cart/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async removeCartItem(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/cart/${id}`, {
      method: 'DELETE',
    });
  }

  // Order methods
  async checkout(checkoutData?: CheckoutRequest): Promise<ApiResponse<CheckoutResponse>> {
    return this.makeAuthenticatedRequest('/checkout', {
      method: 'POST',
      body: checkoutData ? JSON.stringify(checkoutData) : undefined,
    });
  }

  async confirmOrderPayment(paymentData: PaymentConfirmRequest): Promise<ApiResponse<PaymentConfirmResponse>> {
    return this.makeRequest('/payment/confirm', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getOrders(): Promise<ApiResponse<{ orders: Order[] }>> {
    return this.makeAuthenticatedRequest('/orders');
  }

  async getOrder(id: number): Promise<ApiResponse<{ order: Order }>> {
    return this.makeAuthenticatedRequest(`/orders/${id}`);
  }

  // Admin Orders methods
  async getAllOrders(): Promise<ApiResponse<{ orders: Order[] }>> {
    return this.makeAuthenticatedRequest('/orders/admin');
  }

  async updateOrderStatus(id: number, statusData: { status: string }): Promise<ApiResponse<{ message: string; order: Order }>> {
    return this.makeAuthenticatedRequest(`/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  }
  // Newsletter methods
  async subscribeNewsletter(subscribeData: SubscribeNewsletterRequest): Promise<ApiResponse<SubscribeNewsletterResponse>> {
    return this.makeRequest('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscribeData),
    });
  }

  async unsubscribeNewsletter(unsubscribeData: UnsubscribeNewsletterRequest): Promise<ApiResponse<UnsubscribeNewsletterResponse>> {
    return this.makeRequest('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify(unsubscribeData),
    });
  }

  async sendNewsletter(newsletterData: SendNewsletterRequest): Promise<ApiResponse<SendNewsletterResponse>> {
    return this.makeAuthenticatedRequest('/newsletter/send', {
      method: 'POST',
      body: JSON.stringify(newsletterData),
    });
  }

  async getNewsletters(): Promise<ApiResponse<NewslettersResponse>> {
    return this.makeAuthenticatedRequest('/newsletters');
  }

  async getSubscribedUsers(): Promise<ApiResponse<SubscribedUsersResponse>> {
    return this.makeAuthenticatedRequest('/newsletter/subscriptions');
  }

  // Contact methods
  async submitContactRequest(contactData: CreateContactRequest): Promise<ApiResponse<CreateContactResponse>> {
    return this.makeRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Admin Contact Management methods
  async getContacts(): Promise<ApiResponse<ContactsResponse>> {
    return this.makeAuthenticatedRequest('/contacts');
  }

  async getContact(id: number): Promise<ApiResponse<ContactResponse>> {
    return this.makeAuthenticatedRequest(`/contacts/${id}`);
  }


  async deleteContact(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Formalisation methods
  async submitFormalisationRequest(formalisationData: CreateFormalisationRequest): Promise<ApiResponse<CreateFormalisationResponse>> {
    return this.makeRequest('/formalisation', {
      method: 'POST',
      body: JSON.stringify(formalisationData),
    });
  }

  async getFormalisations(): Promise<ApiResponse<FormalisationsResponse>> {
    return this.makeAuthenticatedRequest('/formalisation');
  }

  async getFormalisation(id: number): Promise<ApiResponse<FormalisationResponse>> {
    return this.makeAuthenticatedRequest(`/formalisation/${id}`);
  }

  async deleteFormalisation(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/formalisation/${id}`, {
      method: 'DELETE',
    });
  }
  // Blog methods (Admin only)
  async createBlog(blogData: FormData): Promise<ApiResponse<BlogResponse>> {
    return this.makeAuthenticatedFormRequest('/blogs', blogData);
  }

  async getBlogs(): Promise<ApiResponse<BlogsResponse>> {
    return this.makeRequest('/blogs');
  }

  async getBlog(id: number): Promise<ApiResponse<BlogResponse>> {
    return this.makeRequest(`/blogs/${id}`);
  }


  async updateBlog(id: number, blogData: FormData): Promise<ApiResponse<BlogResponse>> {
    return this.makeAuthenticatedFormRequest(`/blogs/${id}`, blogData, { method: 'PUT' });
  }

  async deleteBlog(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog Comments methods (Public)
  async addComment(blogId: number, commentData: CreateCommentRequest): Promise<ApiResponse<CommentResponse>> {
    return this.makeRequest(`/blogs/${blogId}/comments`, {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  }

  async getBlogComments(blogId: number): Promise<ApiResponse<CommentsResponse>> {
    return this.makeRequest(`/blogs/${blogId}/comments`);
  }

  async deleteComment(commentId: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // Success Stories methods
  async createSuccessStory(storyData: FormData): Promise<ApiResponse<CreateSuccessStoryResponse>> {
    return this.makeAuthenticatedFormRequest('/success-stories', storyData);
  }

  async getSuccessStories(): Promise<ApiResponse<SuccessStoriesResponse>> {
    return this.makeRequest('/success-stories');
  }

  async getSuccessStory(id: number): Promise<ApiResponse<SuccessStoryResponse>> {
    return this.makeRequest(`/success-stories/${id}`);
  }

  async updateSuccessStory(id: number, storyData: FormData): Promise<ApiResponse<SuccessStoryResponse>> {
    return this.makeAuthenticatedFormRequest(`/success-stories/${id}`, storyData, { method: 'PUT' });
  }

  async deleteSuccessStory(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/success-stories/${id}`, {
      method: 'DELETE',
    });
  }

  // Category methods (Admin only)
  async createCategory(categoryData: CreateCategoryRequest): Promise<ApiResponse<CategoryResponse>> {
    return this.makeAuthenticatedRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  async getCategories(): Promise<ApiResponse<CategoriesResponse>> {
    return this.makeRequest('/categories');
  }

  async getCategory(id: number): Promise<ApiResponse<CategoryResponse>> {
    return this.makeRequest(`/categories/${id}`);
  }

  async updateCategory(id: number, categoryData: UpdateCategoryRequest): Promise<ApiResponse<CategoryResponse>> {
    return this.makeAuthenticatedRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
  // Service Provider methods (Admin only)
  async createServiceProvider(formData: FormData): Promise<ApiResponse<ServiceProvider>> {

    return this.makeAuthenticatedFormRequest('/service-providers', formData);
  }

  async createExpert(formData: FormData): Promise<ApiResponse<ServiceProvider>> {
    return this.makeAuthenticatedFormRequest('/service-providers', formData);
  }

  async getServiceProviders(): Promise<ApiResponse<{ service_providers: ServiceProvider[] }>> {
    return this.makeRequest('/service-providers');
  }

  async getServiceProvider(id: number): Promise<ApiResponse<{ service_provider: ServiceProvider }>> {
    return this.makeRequest(`/service-providers/${id}`);
  }


  async updateServiceProvider(id: number, formData: FormData): Promise<ApiResponse<ServiceProvider>> {
    return this.makeAuthenticatedFormRequest(`/service-providers/${id}`, formData, { method: 'PUT' });
  }

  async updateExpert(id: number, formData: FormData): Promise<ApiResponse<ServiceProvider>> {
    return this.makeAuthenticatedFormRequest(`/service-providers/${id}`, formData, { method: 'PUT' });
  }

  async deleteServiceProvider(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/service-providers/${id}`, {
      method: 'DELETE',
    });
  }

  // Service Provider Reviews methods (Public)
  async addServiceProviderReview(id: number, reviewData: CreateReviewRequest): Promise<ApiResponse<CreateReviewResponse>> {
    return this.makeRequest(`/service-providers/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async getServiceProviderReviews(id: number): Promise<ApiResponse<ReviewsResponse>> {
    return this.makeRequest(`/service-providers/${id}/reviews`);
  }
  async deleteExpert(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/service-providers/${id}`, {
      method: 'DELETE',
    });
  }

  // User Management methods (Admin only)
  async getAllUsers(): Promise<ApiResponse<UsersResponse>> {
    return this.makeAuthenticatedRequest('/users');
  }

  async getUser(id: number): Promise<ApiResponse<UserResponse>> {
    return this.makeAuthenticatedRequest(`/users/${id}`);
  }

  async updateUserRole(id: number, roleData: UpdateUserRoleRequest): Promise<ApiResponse<UpdateUserRoleResponse>> {
    return this.makeAuthenticatedRequest(`/users/${id}/type`, {
      method: 'PUT',
      body: JSON.stringify(roleData),
    });
  }

  // Category methods
  async getCategories(): Promise<ApiResponse<{ categories: Category[] }>> {
    return this.makeAuthenticatedRequest('/categories');
  }

  async createCategory(categoryData: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    return this.makeAuthenticatedRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(id: number, categoryData: UpdateCategoryRequest): Promise<ApiResponse<Category>> {
    return this.makeAuthenticatedRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.makeAuthenticatedRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // User Management methods (Admin only)
  async getAllUsers(): Promise<ApiResponse<UsersResponse>> {
    return this.makeAuthenticatedRequest('/users');
  }

  async getUser(id: number): Promise<ApiResponse<UserResponse>> {
    return this.makeAuthenticatedRequest(`/users/${id}`);
  }

  async updateUserRole(id: number, roleData: UpdateUserRoleRequest): Promise<ApiResponse<UpdateUserRoleResponse>> {
    return this.makeAuthenticatedRequest(`/users/${id}/type`, {
      method: 'PUT',
      body: JSON.stringify(roleData),
    });
  }

  // Reports methods (Admin only)
  async getReports(type: ReportType): Promise<ApiResponse<ReportsResponse>> {
    return this.makeAuthenticatedRequest(`/reports?type=${type}`);
  }

  // Helper methods
  getAuthToken(): string | null {
    return localStorage.getItem('prf_token');
  }

  setAuthToken(token: string): void {
    localStorage.setItem('prf_token', token);
  }

  removeAuthToken(): void {
    localStorage.removeItem('prf_token');
  }

  async makeAuthenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    console.log('Making authenticated request to:', endpoint);
    console.log('Token available:', !!token);
    return this.makeRequest(endpoint, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  private async makeAuthenticatedFormRequest<T>(
    endpoint: string,
    formData: FormData,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${BASE_URL}${endpoint}`;
      const token = this.getAuthToken();
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          // Don't set Content-Type for FormData
          ...options.headers,
        },
        mode: import.meta.env.PROD ? 'cors' : 'same-origin',
        body: formData,
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }
}

export const apiService = new ApiService();