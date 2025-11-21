'use client';
import { useState } from 'react';
import { Product } from '@/types/cart';

// Interface to define the structure of selected products
interface SelectedProduct extends Product {
  isSelected: boolean;
  quantity: number;
}

// Product handler hook to manage cart state
export function useProductHandler() {
  // State to manage selected products
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  // Function to toggle product selection
  const toggleProductSelection = (product: Product) => {
    setSelectedProducts(prevProducts => {
      // Check if the product is already in the selected list
      const existingProductIndex = prevProducts.findIndex(p => p.id === product.id);

      if (existingProductIndex !== -1) {
        // If product exists, toggle its selection
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          isSelected: !updatedProducts[existingProductIndex].isSelected
        };
        return updatedProducts;
      } else {
        // If product doesn't exist, add it with initial selection
        return [
          ...prevProducts,
          {
            ...product,
            isSelected: true,
            quantity: 1
          }
        ];
      }
    });
  };

  // Function to calculate total price of selected products
  const calculateTotalPrice = () => {
    return selectedProducts
      .filter(product => product.isSelected)
      .reduce((total, product) => {
        const price = Number(product.price) || 0; 
        return total + price * product.quantity;
      }, 0);
  };

  // Function to update product quantity
  const updateProductQuantity = (productId: number, newQuantity: number) => {
    setSelectedProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  return {
    selectedProducts,
    toggleProductSelection,
    calculateTotalPrice,
    updateProductQuantity
  };
}