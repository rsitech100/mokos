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
