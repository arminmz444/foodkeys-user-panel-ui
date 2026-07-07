import { API_BASE_URL, STATIC_FILES_URL } from '@/config/api.config';
import { useMemo } from 'react';
import useAxiosPrivate from '@/hooks/use-axios-private';

const API_URL = API_BASE_URL;

export const useFileUploadService = () => {
    const axiosPrivate = useAxiosPrivate();

    const fileUploadService = useMemo(() => ({
        // Upload a single file
        uploadFile: async (formData: any) => {
            return axiosPrivate.post(`${API_URL}/file/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },

        // Upload multiple files with progress tracking
        uploadFilesWithProgress: async (files: Iterable<unknown> | ArrayLike<unknown>, onProgress: (arg0: any, arg1: number) => void, entityType = 'ATTACHMENT') => {
            const uploadPromises = Array.from(files).map((file) => {
                const formData = new FormData();
                // @ts-ignore
                formData.append('file', file);
                formData.append('entityType', entityType);

                return axiosPrivate.post(`${API_URL}/files/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        // @ts-ignore
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        if (onProgress) {
                            // @ts-ignore
                            onProgress(file.name, percentCompleted);
                        }
                    },
                });
            });

            return Promise.all(uploadPromises);
        },

        // Delete a file by ID
        deleteFile: async (fileId: any) => {
            return axiosPrivate.delete(`${API_URL}/files/${fileId}`);
        },

        // Get file information by ID
        getFileInfo: async (fileId: any) => {
            return axiosPrivate.get(`${API_URL}/files/${fileId}`);
        },

        // Build a full URL for a file path
        getFileUrl: (filePath: string) => {
            if (!filePath) return '';

            if (filePath.startsWith('http')) {
                return filePath;
            }

            return `${STATIC_FILES_URL || '/files'}${filePath}`;
        }
    }), [axiosPrivate]);

    return fileUploadService;
};

export default useFileUploadService;