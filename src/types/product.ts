export type ProductCategory = 
  | "plastic-surgery" 
  | "orthopedic" 
  | "arthroscopy" 
  | "laparoscopy";

export type CertificationType = "ISO" | "CE" | "FDA";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subCategory: string;
  description: string;
  specifications: Record<string, string>;
  indications: string[];
  images: string[];
  price: number;
  bulkPrice?: number;
  minBulkQuantity?: number;
  certifications: CertificationType[];
  warranty: string;
  isConsumable: boolean;
  inStock: boolean;
  stockQuantity: number;
  brand: string;
  model: string;
  featured?: boolean;
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  type: "individual" | "hospital" | "clinic";
  gstNumber?: string;
  verified: boolean;
}
