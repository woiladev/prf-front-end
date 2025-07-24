// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

export interface UserManagement {
  id: number;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
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
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOtpPasswordRequest {
  email: string;
  otp: string;
}

export interface SetNewPasswordRequest {
  email: string;
  new_password: string;
}

export interface UpdateUserRoleRequest {
  role: 'user' | 'admin'; // Must be either "user" or "admin"
}

export interface UpdateUserRoleResponse {
  message: string;
  user: UserManagement;
}

export interface UsersResponse {
  users: UserManagement[];
}

export interface UserResponse {
  user: UserManagement;
}

// Project Types
export interface Project {
  id: number;
  name: string;
  category_id?: number;
  image_url?: string;
  description?: string;
  is_free: boolean;
  basic_price?: number;
  classic_price?: number;
  premium_price?: number;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProjectRequest {
  name: string;
  category_id: number;
  image?: File;
  description?: string;
  is_free: boolean;
  basic_price?: number | null;
  classic_price?: number | null;
  premium_price?: number | null;
}

export interface UpdateProjectRequest {
  name?: string;
  category_id?: number;
  image?: File;
  description?: string;
  is_free?: boolean;
  basic_price?: number | null;
  classic_price?: number | null;
  premium_price?: number | null;
}

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

export interface UpdateSubscriptionLevelRequest {
  level?: 'Basic' | 'Classic' | 'Premium';
  details?: string;
}

export interface SubscriptionLevelsResponse {
  steps: SubscriptionLevel[];
}
// Blog Types
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author?: string;
  image_url?: string;
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

// Product Types
export interface Product {
  id: number;
  name: string;
  image_url?: string;
  image?: string | null;
  image_url?: string | null;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
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

// Cart & Order Types
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

export interface Order {
  id: number;
  total_amount: number;
  status: string;
  operator: string;
  items: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: Product;
}

export interface CheckoutRequest {
  operator: 'mtn' | 'orange';
}

export interface CheckoutResponse {
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

// Contact Types
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

export interface ContactsResponse {
  contacts: Contact[];
}

export interface ContactResponse {
  contact: Contact;
}

// Formalisation Types
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

// Service Provider Types
export interface ServiceProvider {
  id: number;
  name: string;
  email: string;
  phone?: string;
  job_title?: string;
  location?: string;
  description?: string;
  image_url?: string;
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

export interface UpdateServiceProviderRequest {
  name?: string;
  email?: string;
  phone?: string;
  job_title?: string;
  location?: string;
  description?: string;
  image?: File;
}

// Service Provider Review Types
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
// Subscription Types
export interface Subscription {
  id: number;
  user_id?: number;
  project_id: number;
  subscription_level: 'Basic' | 'Classic' | 'Premium';
  start_date?: string;
  end_date?: string;
  status?: 'pending' | 'active' | 'expired' | 'cancelled';
  operator: 'mtn' | 'orange';
  payment_status?: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  project?: {
    id: number;
    name: string;
    description?: string;
  };
}

export interface CreateSubscriptionRequest {
  project_id: number;
  subscription_level: 'Basic' | 'Classic' | 'Premium';
  operator: 'mtn' | 'orange';
}

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
}

export interface SubscriptionResponse {
  subscription: Subscription;
}

export interface ProjectSubscriptionsResponse {
  subscriptions: Subscription[];
}
export interface ConfirmSubscriptionPaymentRequest {
  subscription_id: number;
  payment_status: 'success' | 'failed';
}

// Newsletter Types
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

// Reports Types
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

// Category Types
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

export interface CategoriesResponse {
  categories: Category[];
}

export interface CategoryResponse {
  category: Category;
}

// Success Story Types
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