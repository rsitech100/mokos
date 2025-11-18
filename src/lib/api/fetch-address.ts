import apiService from "@/app/api/api";

export interface AddressData {
      id: string;
      region: {
            provinceCode: string;
            provinceName: string;
            cityCode: string;
            cityName: string;
            districtCode: string;
            districtName: string;
            villageCode: string;
            villageName: string;
            postalCode: string;
      };
      provinceCode: string;
      provinceName: string;
      cityCode: string;
      cityName: string;
      districtCode: string;
      districtName: string;
      villageCode: string;
      villageName: string;
      postalCode: string;
      isPrimary?: boolean;
      label: string;
      receiveName: string;
      phone: string;
      street: string;
      lat: number;
      lon: number;
      merchantId: string;
}

export interface AddressListResponse {
      message: string;
      success: boolean;
      data: AddressData[];
      result: null;
}

export interface AddAddressRequest {
      id?: string;
      region: {
            provinceCode: string;
            provinceName: string;
            cityCode: string;
            cityName: string;
            districtCode: string;
            districtName: string;
            villageCode?: string;
            villageName?: string;
            postalCode: string;
      };
      label: string;
      receiveName: string;
      phone: string;
      street: string;
      lat: number;
      lon: number;
      merchantId: string;
}

export interface AddAddressResponse {
      message: string;
      success: boolean;
      data: AddressData;
      result: null;
}

export async function fetchAddressList(): Promise<AddressListResponse> {
      try {
            const response = await apiService.get<AddressListResponse>('/v1/user/address');
            return response;
      } catch (error) {
            console.error('Error fetching address list:', error);
            throw error;
      }
}

export async function addAddress(data: AddAddressRequest): Promise<AddAddressResponse> {
      try {
            const response = await apiService.post<AddAddressResponse>('/v1/user/address', data);
            return response;
      } catch (error) {
            console.error('Error adding address:', error);
            throw error;
      }
}

export async function deleteAddress(id: string): Promise<{ success: boolean; message: string }> {
      try {
            const response = await apiService.delete<{ success: boolean; message: string }>(`/v1/user/address/${id}`);
            return response;
      } catch (error) {
            console.error('Error deleting address:', error);
            throw error;
      }
}

export async function updateAddress(id: string, data: AddAddressRequest): Promise<AddAddressResponse> {
      try {
            const response = await apiService.put<AddAddressResponse>(`/v1/user/address/${id}`, data);
            return response;
      } catch (error) {
            console.error('Error updating address:', error);
            throw error;
      }
}

export async function setPrimaryAddress(id: string): Promise<{ success: boolean; message: string }> {
      try {
            const response = await apiService.put<{ success: boolean; message: string }>(`/v1/user/address/primary/${id}`, {});
            return response;
      } catch (error) {
            console.error('Error setting primary address:', error);
            throw error;
      }
}
