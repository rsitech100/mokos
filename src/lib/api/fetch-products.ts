import apiService from "@/app/api/api";

export interface ApiProduct {
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
  videoFiles: unknown[];
  pictureFiles: Array<{
    id: string;
    name: string;
    module: string;
    uri: string;
  }>;
}

export interface ApiProductResponse {
  message: string;
  success: boolean;
  data: ApiProduct[];
  result: {
    page: number;
    size: number;
    total: number;
    sort: string | null;
    order: string | null;
  };
}

export async function fetchProducts(params?: {
  page?: number;
  size?: number;
}): Promise<ApiProductResponse> {
  try {
    const response = await apiService.get<ApiProductResponse>('/v1/product', params);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
