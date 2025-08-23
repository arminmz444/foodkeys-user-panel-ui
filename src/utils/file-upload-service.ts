import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const fileApi = axios.create({
    baseURL: `${API_URL}/files`,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Add request interceptor to include auth token
fileApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor for error handling
fileApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('File upload error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const fileUploadService = {
    // Upload a single file
    uploadFile: async (formData) => {
        return fileApi.post('/upload', formData);
    },

    // Upload multiple files with progress tracking
    uploadFilesWithProgress: async (files, onProgress, entityType = 'ATTACHMENT') => {
        const uploadPromises = Array.from(files).map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('entityType', entityType);

            return fileApi.post('/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    if (onProgress) {
                        onProgress(file.name, percentCompleted);
                    }
                },
            });
        });

        return Promise.all(uploadPromises);
    },

    // Delete a file by ID
    deleteFile: async (fileId) => {
        return fileApi.delete(`/${fileId}`);
    },

    // Get file information by ID
    getFileInfo: async (fileId) => {
        return fileApi.get(`/${fileId}`);
    },

    // Build a full URL for a file path
    getFileUrl: (filePath) => {
        if (!filePath) return '';

        if (filePath.startsWith('http')) {
            return filePath;
        }

        return `${process.env.NEXT_PUBLIC_STATIC_FILES_URL || '/files'}${filePath}`;
    }
};

export default fileUploadService;