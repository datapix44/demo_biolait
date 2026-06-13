export type Locale = "fr" | "en";

export interface Category {
  id: string;
  name: string;
  name_en: string;
  slug: string;
  description: string;
  icon: string;
  cover_image_url: string;
  display_order: number;
}

export interface Template {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  image_url: string;
  category_id: string;
  category?: Category;
  tags: string[];
  style: string;
  prompt_base: string;
  is_featured: boolean;
  popularity: number;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  template_id: string | null;
  category_id: string | null;
  status: "draft" | "completed" | "archived";
  current_version: number;
  created_at: string;
  updated_at: string;
  template?: Template;
  category?: Category;
  latest_version?: ProjectVersion;
}

export interface ProjectVersion {
  id: string;
  project_id: string;
  version_number: number;
  image_url: string | null;
  prompt_used: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Message {
  id: string;
  project_id: string;
  role: "user" | "assistant";
  content: string;
  version_id: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: "free" | "premium";
  status: "active" | "canceled" | "past_due";
  current_period_end: string | null;
  generations_used: number;
}

export interface Favorite {
  id: string;
  user_id: string;
  template_id: string | null;
  project_id: string | null;
  created_at: string;
  template?: Template;
  project?: Project;
}

export interface GeneratedFile {
  id: string;
  version_id: string;
  file_url: string;
  file_type: "png" | "svg" | "pdf";
  file_size: number | null;
  created_at: string;
}
