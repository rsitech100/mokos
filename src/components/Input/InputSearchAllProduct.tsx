'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

interface SearchResult {
      id: string;
      title: string;
      price: number;
      pictureFiles?: Array<{ uri: string }>;
      merchantName?: string;
}

interface SearchHistory {
      query: string;
      timestamp: number;
}

export function InputSearchAllProduct() {
      const [searchQuery, setSearchQuery] = useState("");
      const [showDropdown, setShowDropdown] = useState(false);
      const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
      const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
      const [loading, setLoading] = useState(false);
      const dropdownRef = useRef<HTMLDivElement>(null);
      const inputRef = useRef<HTMLInputElement>(null);
      const router = useRouter();

      // Load search history from localStorage
      useEffect(() => {
            const history = localStorage.getItem('searchHistory');
            if (history) {
                  setSearchHistory(JSON.parse(history));
            }
      }, []);

      // Close dropdown when clicking outside
      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (
                        dropdownRef.current &&
                        !dropdownRef.current.contains(event.target as Node) &&
                        inputRef.current &&
                        !inputRef.current.contains(event.target as Node)
                  ) {
                        setShowDropdown(false);
                  }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, []);

      // Search products
      useEffect(() => {
            const searchProducts = async () => {
                  if (searchQuery.trim().length < 2) {
                        setSearchResults([]);
                        return;
                  }

                  setLoading(true);
                  try {
                        const timestamp = Date.now();
                        const response = await fetch(
                              `${BASE_API}/v1/product?search=${encodeURIComponent(searchQuery)}&limit=5&t=${timestamp}`,
                              {
                                    credentials: 'include',
                                    cache: 'no-store',
                                    headers: {
                                          'Cache-Control': 'no-cache, no-store, must-revalidate',
                                          'Pragma': 'no-cache',
                                          'Expires': '0'
                                    }
                              }
                        );

                        if (response.ok) {
                              const data = await response.json();
                              console.log('Search results for', searchQuery, ':', data);
                              if (data.success && data.data && Array.isArray(data.data)) {
                                    // Client-side filtering in case backend 'search' param not applied
                                    const filtered = data.data.filter((p: any) =>
                                          p.title?.toLowerCase().includes(searchQuery.toLowerCase())
                                    );
                                    const mapped: SearchResult[] = filtered.slice(0, 5).map((p: any) => ({
                                          id: p.id,
                                          title: p.title,
                                          price: p.price,
                                          pictureFiles: p.pictureFiles,
                                          merchantName: p.merchant?.name
                                    }));
                                    setSearchResults(mapped);
                              } else {
                                    setSearchResults([]);
                              }
                        } else {
                              setSearchResults([]);
                        }
                  } catch (error) {
                        console.error('Error searching products:', error);
                        setSearchResults([]);
                  } finally {
                        setLoading(false);
                  }
            };

            const debounce = setTimeout(() => {
                  searchProducts();
            }, 300);

            return () => clearTimeout(debounce);
      }, [searchQuery]);

      const saveToHistory = (query: string) => {
            if (!query.trim()) return;

            const newHistory = [
                  { query: query.trim(), timestamp: Date.now() },
                  ...searchHistory.filter(h => h.query !== query.trim())
            ].slice(0, 10); // Keep only 10 recent searches

            setSearchHistory(newHistory);
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      };

      const handleSearch = (query: string) => {
            if (!query.trim()) return;
            
            saveToHistory(query);
            setShowDropdown(false);
            router.push(`/category?search=${encodeURIComponent(query)}`);
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                  handleSearch(searchQuery);
            }
      };

      const clearHistory = () => {
            setSearchHistory([]);
            localStorage.removeItem('searchHistory');
      };

      return (
            <div className="relative flex-1 max-w-[488px]">
                  <div className="flex flex-row bg-transparent border border-neutral-400 rounded-lg gap-3 px-2 py-2 w-full">
                        <Image 
                              src="/image/nav/search-icon.svg" 
                              alt="search-icon" 
                              width={16} 
                              height={16}
                              className="cursor-pointer"
                              onClick={() => handleSearch(searchQuery)}
                        />
                        <input
                              ref={inputRef}
                              type="text"
                              placeholder="Cari"
                              className="outline-none text-neutral-700 w-full text-sm"
                              value={searchQuery}
                              onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    if (e.target.value.trim().length === 0) {
                                          setSearchResults([]);
                                    }
                              }}
                              onFocus={() => setShowDropdown(true)}
                              onKeyDown={handleKeyDown}
                        />
                  </div>

                  {/* Dropdown */}
                  {showDropdown && (
                        <div
                              ref={dropdownRef}
                              className="absolute top-12 left-0 w-full bg-white border border-neutral-300 rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50"
                        >
                              {searchQuery.trim().length === 0 ? (
                                    // Show search history
                                    searchHistory.length > 0 ? (
                                          <div className="p-3">
                                                <div className="flex justify-between items-center mb-2">
                                                      <p className="text-xs text-neutral-500 font-semibold">Pencarian Terakhir</p>
                                                      <button
                                                            onClick={clearHistory}
                                                            className="text-xs text-primary-500 hover:underline"
                                                      >
                                                            Hapus
                                                      </button>
                                                </div>
                                                {searchHistory.map((item, index) => (
                                                      <div
                                                            key={index}
                                                            className="flex items-center gap-3 py-2 px-2 hover:bg-neutral-100 cursor-pointer rounded"
                                                            onClick={() => {
                                                                  setSearchQuery(item.query);
                                                                  handleSearch(item.query);
                                                            }}
                                                      >
                                                            <Image 
                                                                  src="/image/nav/search-icon.svg" 
                                                                  alt="search" 
                                                                  width={16} 
                                                                  height={16}
                                                            />
                                                            <p className="text-sm text-neutral-700">{item.query}</p>
                                                      </div>
                                                ))}
                                          </div>
                                    ) : (
                                          <div className="p-6 text-center">
                                                <p className="text-sm text-neutral-500">Belum ada riwayat pencarian</p>
                                          </div>
                                    )
                              ) : loading ? (
                                    // Loading state
                                    <div className="p-4">
                                          {[...Array(3)].map((_, i) => (
                                                <div key={i} className="animate-pulse flex gap-3 mb-3">
                                                      <div className="w-12 h-12 bg-gray-300 rounded"></div>
                                                      <div className="flex-1">
                                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                                      </div>
                                                </div>
                                          ))}
                                    </div>
                              ) : searchResults.length > 0 ? (
                                    // Show search results
                                    <div>
                                          <div className="p-3 border-b border-neutral-200">
                                                <p className="text-xs text-neutral-500 font-semibold">Hasil Pencarian untuk &quot;{searchQuery}&quot;</p>
                                          </div>
                                          {searchResults.map((product) => {
                                                const productImage = product.pictureFiles && product.pictureFiles.length > 0
                                                      ? `${BASE_API}${product.pictureFiles[0].uri}`
                                                      : '/image/product/shoes-dummy.svg';

                                                const formattedPrice = new Intl.NumberFormat('id-ID', {
                                                      style: 'currency',
                                                      currency: 'IDR',
                                                      minimumFractionDigits: 0,
                                                }).format(product.price);

                                                return (
                                                      <Link
                                                            key={product.id}
                                                            href={`/detail-product?id=${product.id}`}
                                                            onClick={() => {
                                                                  saveToHistory(searchQuery);
                                                                  setShowDropdown(false);
                                                            }}
                                                      >
                                                            <div className="flex items-center gap-3 p-3 hover:bg-neutral-100 cursor-pointer">
                                                                  <div className="relative w-12 h-12 flex-shrink-0">
                                                                        <Image
                                                                              src={productImage}
                                                                              alt={product.title}
                                                                              fill
                                                                              className="object-cover rounded"
                                                                              unoptimized
                                                                        />
                                                                  </div>
                                                                  <div className="flex-1 min-w-0">
                                                                        <p className="text-sm text-neutral-700 font-medium truncate">
                                                                              {product.title}
                                                                        </p>
                                                                        <p className="text-xs text-primary-500 font-semibold">
                                                                              {formattedPrice}
                                                                        </p>
                                                                        {product.merchantName && (
                                                                              <p className="text-xs text-neutral-500 truncate">
                                                                                    {product.merchantName}
                                                                              </p>
                                                                        )}
                                                                  </div>
                                                            </div>
                                                      </Link>
                                                );
                                          })}
                                          <div
                                                className="p-3 text-center border-t border-neutral-200 hover:bg-neutral-100 cursor-pointer"
                                                onClick={() => handleSearch(searchQuery)}
                                          >
                                                <p className="text-sm text-primary-500 font-semibold">
                                                      Lihat Semua Hasil untuk &quot;{searchQuery}&quot;
                                                </p>
                                          </div>
                                    </div>
                              ) : (
                                    // No results
                                    <div className="p-6 text-center">
                                          <Image 
                                                src="/image/popup/cart-empty.svg" 
                                                alt="no-results" 
                                                width={80} 
                                                height={80}
                                                className="mx-auto mb-3"
                                          />
                                          <p className="text-sm text-neutral-700 font-semibold mb-1">
                                                Produk tidak ditemukan
                                          </p>
                                          <p className="text-xs text-neutral-500">
                                                Coba kata kunci lain
                                          </p>
                                    </div>
                              )}
                        </div>
                  )}
            </div>
      );
}