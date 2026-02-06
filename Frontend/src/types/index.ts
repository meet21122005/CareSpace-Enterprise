// API Types matching backend schemas

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  product_count: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  price_1month: number | null;
  price_2month: number | null;
  price_3month: number | null;
  image_url: string | null;
  description: string | null;
  specifications: string | null;
  youtube_url: string | null;
}

export interface ProductSearchResult {
  id: string;
  name: string;
  slug: string;
  category_name: string;
  category_slug: string;
  price_1month: number | null;
  image_url: string | null;
  youtube_url: string | null;
}

// Frontend display types
export interface ProductDisplay {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  price: string;
  price1Month: number;
  price2Month: number;
  price3Month: number;
  description: string;
  image: string;
  features: string[];
  specifications: Record<string, string>;
  youtubeUrl: string | null;
}

export interface CategoryDisplay {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  productCount: number;
}
