import apiService from "@/app/api/api";

export interface ProductDetail {
  id: string;
  title: string;
  description: string;
  totalRating: number;
  category: {
    id: string;
    name: string;
    description: string;
    isChild: boolean;
  };
  merchant: {
    id: string;
    name: string;
    description: string;
    url: string;
    phone: string;
    pictureFile: unknown;
    address?: string;
    city?: string;
    province?: string;
  };
  weight: number;
  unitWeight: string;
  lengthDimension: number;
  widthDimension: number;
  heightDimension: number;
  unitDimension: string;
  isNew: boolean;
  useVariant: boolean;
  primaryVariantName: string | null;
  useSecondaryVariant: boolean;
  secondaryVariantName: string | null;
  publishStatus: string;
  soldStock: number;
  viewsCount: number;
  price: number;
  stock?: number;
  minOrder?: number;
  condition?: string;
  videoFiles: unknown[];
  pictureFiles: Array<{
    id: string;
    name: string;
    module: string;
    uri: string;
  }>;
  productPrices?: Array<{
    id: string;
    isMainView: boolean;
    price: number;
    stock: number;
    primaryVariant: string | null;
    secondaryVariant: string | null;
  }>;
}

export interface ProductDetailResponse {
  message: string;
  success: boolean;
  data: ProductDetail;
  result: null;
}

export async function fetchProductDetail(id: string): Promise<ProductDetailResponse> {
  try {
    const response = await apiService.get<ProductDetailResponse>(`/v1/product/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    throw error;
  }
}

// Fetch product prices
export interface ProductPriceResponse {
  message: string;
  success: boolean;
  data: Array<{
    id: string;
    isMainView: boolean;
    price: number;
    stock: number;
    primaryVariant: string | null;
    secondaryVariant: string | null;
    product: {
      id: string;
      title: string;
      description: string;
      totalRating: number;
      category: unknown;
    };
  }>;
  result: null;
}

export async function fetchProductPrices(productId: string): Promise<ProductPriceResponse> {
  try {
    const response = await apiService.get<ProductPriceResponse>(`/v1/product/price/product/${productId}`);
    return response;
  } catch (error) {
    console.error('Error fetching product prices:', error);
    throw error;
  }
}
