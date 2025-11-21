interface AddressCardProps {
      address: {
            receiveName: string;
            phone: string;
            street: string;
            districtName: string;
            cityName: string;
            provinceName: string;
            postalCode: string;
      } | null;
      onAddAddress?: () => void;
}

export function AddressCard({ address, onAddAddress }: AddressCardProps) {
      if (!address) {
            return (
                  <div className="bg-white rounded-lg shadow-md p-5">
                        <h3 className="font-bold text-neutral-700 mb-3">Alamat Pengiriman</h3>
                        <p className="text-sm text-neutral-500">Pilih alamat pengiriman</p>
                        <button 
                              onClick={onAddAddress}
                              className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600"
                        >
                              Tambah Alamat
                        </button>
                  </div>
            );
      }

      return (
            <div className="bg-white rounded-lg shadow-md p-5">
                  <h3 className="font-bold text-neutral-700 mb-3">Alamat Pengiriman</h3>
                  <div className="text-sm text-neutral-700">
                        <p className="font-semibold">{address.receiveName}</p>
                        <p>{address.phone}</p>
                        <p className="mt-2">
                              {address.street}, {address.districtName}, {address.cityName}, {address.provinceName} {address.postalCode}
                        </p>
                  </div>
            </div>
      );
}
