export type ToolCategory = 
  | 'pdf'
  | 'image'
  | 'developer'
  | 'text'
  | 'calculators'
  | 'ai';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  categoryName: string;
  iconName: string;
  badge?: 'Popular' | 'New' | 'Updated' | 'Pro' | 'AI Powered';
  featured?: boolean;
  tags: string[];
  features: string[];
  faq: { question: string; answer: string }[];
}

export interface CategoryMeta {
  id: ToolCategory;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  gradient: string;
  badgeColor: string;
  count?: number;
}
