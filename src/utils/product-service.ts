import axios from 'axios';
import { fileUploadService } from './file-upload-service';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://back.agfo.ir/api/v1';

const productApi = axios.create({
    baseURL: `${API_URL}/products`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
productApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const productService = {
    // Get products by company ID
    getProductsByCompany: async (companyId) => {
        return productApi.get(`/company/${companyId}`);
    },

    // Get a single product by ID
    getProduct: async (productId) => {
        return productApi.get(`/${productId}`);
    },

    // Create a new product
    createProduct: async (productData) => {
        return productApi.post('/', productData);
    },

    // Update an existing product
    updateProduct: async (productId, productData) => {
        return productApi.put(`/${productId}`, productData);
    },

    // Delete a product
    deleteProduct: async (productId) => {
        return productApi.delete(`/${productId}`);
    },

    // Helper function to process product data before saving
    processProductData: (product) => {
        // Create a copy to avoid modifying the original
        const processedProduct = { ...product };

        // Clean up any File objects and convert to file IDs
        if (processedProduct.pictures) {
            processedProduct.pictures = processedProduct.pictures.map(pic => {
                if (pic instanceof File) {
                    // This should've been uploaded already, but just in case
                    console.warn('Unexpected File object in product pictures');
                    return null;
                }
                // Return just the ID from the file object
                return pic?.id || pic;
            }).filter(Boolean);
        }

        return processedProduct;
    },

    // Helper to upload product images
    uploadProductImages: async (files, entityRef = null) => {
        try {
            const uploadPromises = Array.from(files).map(file => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('entityType', 'PRODUCT');
                if (entityRef) {
                    formData.append('entityRef', entityRef);
                }
                return fileUploadService.uploadFile(formData);
            });

            const results = await Promise.all(uploadPromises);
            return results.map(res => res.data);
        } catch (error) {
            console.error('Error uploading product images:', error);
            throw error;
        }
    },

    // Prepare products from form data to be saved
    prepareProductsForSubmission: (products, outSourcedProducts) => {
        // Process regular products
        const processedProducts = products.map(product => {
            const processed = productService.processProductData(product);
            processed.outsourced = false;
            return processed;
        });

        // Process outsourced products
        const processedOutSourcedProducts = outSourcedProducts.map(product => {
            const processed = productService.processProductData(product);
            processed.outsourced = true;
            return processed;
        });

        return {
            products: processedProducts,
            outSourcedProducts: processedOutSourcedProducts
        };
    }
};

export default productService;