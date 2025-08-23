import { useMemo } from 'react';
import useAxiosPrivate from '@/hooks/use-axios-private';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1/client/panel';

export const useFileUploadService = () => {
    const axiosPrivate = useAxiosPrivate();

    const fileUploadService = useMemo(() => ({
        // Upload a single file
        uploadFile: async (formData) => {
            return axiosPrivate.post(`${API_URL}/file/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },

        // Upload multiple files with progress tracking
        uploadFilesWithProgress: async (files, onProgress, entityType = 'ATTACHMENT') => {
            const uploadPromises = Array.from(files).map((file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('entityType', entityType);

                return axiosPrivate.post(`${API_URL}/files/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
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
            return axiosPrivate.delete(`${API_URL}/files/${fileId}`);
        },

        // Get file information by ID
        getFileInfo: async (fileId) => {
            return axiosPrivate.get(`${API_URL}/files/${fileId}`);
        },

        // Build a full URL for a file path
        getFileUrl: (filePath) => {
            if (!filePath) return '';

            if (filePath.startsWith('http')) {
                return filePath;
            }

            return `${process.env.NEXT_PUBLIC_STATIC_FILES_URL || '/files'}${filePath}`;
        }
    }), [axiosPrivate]);

    return fileUploadService;
};

export default useFileUploadService;