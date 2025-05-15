import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 * Transforms the gallery files from the API response to the format expected by the form
 * @param galleryFiles The array of gallery files from the API
 * @returns An object containing the transformed gallery files grouped by their type
 */
export const transformGalleryFiles = (galleryFiles: any[]) => {
    if (!galleryFiles || !Array.isArray(galleryFiles) || galleryFiles.length === 0) {
        return {
            contacts: [],
            certificates: [],
            products: [],
            sliders: [],
            catalogs: [],
            documents: []
        };
    }

    // Initialize the result object with empty arrays for each gallery type
    const result = {
        contacts: [],
        certificates: [],
        products: [],
        sliders: [],
        catalogs: [],
        documents: []
    };

    // Process each gallery file
    galleryFiles.forEach(file => {
        // Skip files without a service type
        if (!file.fileServiceType) return;

        // Parse metadata JSON if available
        let metadata = {};
        try {
            if (file.metadata) {
                metadata = JSON.parse(file.metadata);
            }
        } catch (error) {
            console.error(`Error parsing metadata for file ${file.id}:`, error);
        }

        // Create a base object with common properties
        const baseFileObj = {
            ...file,
            ...metadata,
            priority: 1, // Default priority
            uploadedFileId: [file.id] // Prepare ID for form
        };

        // Map to the appropriate gallery section based on fileServiceType
        switch (file.fileServiceType) {
            case 'COMPANY_GALLERY_CONTACT':
                result.contacts.push({
                    ...baseFileObj,
                    firstName: metadata.firstName || '',
                    lastName: metadata.lastName || '',
                    phoneNumbers: metadata.phoneNumbers?.[0] || '',
                    emails: metadata.emails?.[0] || '',
                    position: metadata.position || '',
                    description: metadata.description || ''
                });
                break;

            case 'COMPANY_GALLERY_CERTIFICATE':
                result.certificates.push({
                    ...baseFileObj,
                    title: metadata.title || '',
                    description: metadata.description || ''
                });
                break;

            case 'COMPANY_GALLERY_PRODUCT':
                result.products.push({
                    ...baseFileObj,
                    title: metadata.title || '',
                    description: metadata.description || ''
                });
                break;

            case 'COMPANY_GALLERY_SLIDER':
                result.sliders.push({
                    ...baseFileObj,
                    title: metadata.title || '',
                    description: metadata.description || ''
                });
                break;

            case 'COMPANY_GALLERY_CATALOG':
                result.catalogs.push({
                    ...baseFileObj,
                    title: metadata.title || '',
                    altText: metadata.altText || '',
                    description: metadata.description || ''
                });
                break;

            case 'COMPANY_GALLERY_DOCUMENT':
                result.documents.push({
                    ...baseFileObj,
                    title: metadata.title || '',
                    description: metadata.description || ''
                });
                break;
        }
    });

    return result;
};

/**
 * Custom hook to handle gallery file transformation and form registration
 * @param galleryFiles The array of gallery files from the API
 */
export const useGalleryFiles = (galleryFiles: any[]) => {
    const { setValue } = useFormContext();

    useEffect(() => {
        if (!galleryFiles || !Array.isArray(galleryFiles) || galleryFiles.length === 0) return;

        const transformedFiles = transformGalleryFiles(galleryFiles);

        // Set the transformed files in the form
        setValue('gallery', transformedFiles);

        // Optionally, you can log the transformation for debugging
        console.log('Transformed gallery files:', transformedFiles);
    }, [galleryFiles, setValue]);

    return transformGalleryFiles(galleryFiles);
};

/**
 * Utility function for direct usage in components
 * @param data The company data object containing galleryFiles
 * @returns The data object with the transformed gallery property added
 */
export const prepareCompanyDataWithGallery = (data: any) => {
    if (!data) return data;

    if (data.galleryFiles && Array.isArray(data.galleryFiles)) {
        const transformedGallery = transformGalleryFiles(data.galleryFiles);
        return {
            ...data,
            gallery: transformedGallery
        };
    }

    return data;
};