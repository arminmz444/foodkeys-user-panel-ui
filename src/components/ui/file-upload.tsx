import { useState, useRef } from 'react';
import { Button, Text, ActionIcon } from 'rizzui';
import { Upload, File, X, FileX } from 'lucide-react';
import useAxiosPrivate from '@/hooks/use-axios-private';
import cn from '@/utils/class-names';

interface FileUploadProps {
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
    error?: string;
    helperText?: string;
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    label?: string;
    fileServiceType?: string;
    disabled?: boolean;
}

export default function FileUpload({
                                       value,
                                       onChange,
                                       onBlur,
                                       error,
                                       helperText,
                                       multiple = false,
                                       accept = '*',
                                       maxSize = 5 * 1024 * 1024, // 5MB default
                                       maxFiles = 1,
                                       label = 'Upload File',
                                       fileServiceType = 'SERVICE_FILE',
                                       disabled = false
                                   }: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const axiosPrivate = useAxiosPrivate();

    // Normalize value to array for consistent handling
    const files = multiple
        ? (Array.isArray(value) ? value : value ? [value] : [])
        : (value ? [value] : []);

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setLocalError(null);

        // Check if we're exceeding max files
        if (multiple && files.length + e.target.files.length > maxFiles) {
            setLocalError(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const selectedFiles = Array.from(e.target.files);

        // Check file sizes
        const oversizedFiles = selectedFiles.filter(file => file.size > maxSize);
        if (oversizedFiles.length > 0) {
            setLocalError(`File size exceeds ${formatBytes(maxSize)}`);
            return;
        }

        try {
            setIsUploading(true);

            // Upload files one by one
            const uploadPromises = selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('files', file);
                formData.append('fileServiceType', fileServiceType);

                const response = await axiosPrivate.post('/file', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data && response.data.status === 'SUCCESS') {
                    return response.data.data; // Return file data
                } else {
                    throw new Error('File upload failed');
                }
            });

            const uploadedFiles = await Promise.all(uploadPromises);

            // Update the value
            if (multiple) {
                onChange([...files, ...uploadedFiles]);
            } else {
                onChange(uploadedFiles[0]);
            }

            if (onBlur) onBlur();
        } catch (err) {
            console.error('File upload error:', err);
            setLocalError('File upload failed. Please try again.');
        } finally {
            setIsUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveFile = (index: number) => {
        if (multiple) {
            const newFiles = [...files];
            newFiles.splice(index, 1);
            onChange(newFiles);
        } else {
            onChange(null);
        }

        if (onBlur) onBlur();
    };

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full space-y-2">
            {label && (
                <Text
                    as="label"
                    className={cn(
                        "block text-sm font-medium",
                        error ? "text-red-500" : "text-gray-700"
                    )}
                >
                    {label}
                </Text>
            )}

            <div
                className={cn(
                    "flex flex-col gap-4 border-2 border-dashed rounded-lg p-4",
                    error || localError ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50",
                    isUploading ? "opacity-70" : ""
                )}
            >
                <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <Text className="text-center mb-1">
                        {multiple ? (
                            <>
                                Drag and drop files here, or <Button variant="text" size="sm" className="inline p-0 h-auto">browse</Button>
                            </>
                        ) : (
                            <>
                                Drag and drop a file here, or <Button variant="text" size="sm" className="inline p-0 h-auto">browse</Button>
                            </>
                        )}
                    </Text>
                    <Text className="text-xs text-gray-500">
                        {accept !== '*' ? `Accepted formats: ${accept}` : 'All file types accepted'} •
                        Up to {formatBytes(maxSize)} {multiple && `• Max ${maxFiles} files`}
                    </Text>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileInputChange}
                        accept={accept}
                        multiple={multiple}
                        disabled={disabled || isUploading}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        className="mt-3"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={disabled || isUploading}
                        isLoading={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Select File'}
                    </Button>
                </div>

                {/*{files.length > 0 && (*/}
                {/*    <div className="space-y-2">*/}
                {/*        <Text className="text-sm font-medium">Uploaded files:</Text>*/}
                {/*        <div className="space-y-2">*/}
                {/*            {files.map((file, index) => (*/}
                {/*                <div*/}
                {/*                    key={file.id || index}*/}
                {/*                    className="flex items-center justify-between border rounded-md p-2 bg-white"*/}
                {/*                >*/}
                {/*                    <div className="flex items-center gap-2">*/}
                {/*                        <File className="w-5 h-5 text-gray-400" />*/}
                {/*                        <div className="flex flex-col">*/}
                {/*                            <Text className="text-sm font-medium truncate max-w-xs">*/}
                {/*                                {file.name || file.originalName || `File ${index + 1}`}*/}
                {/*                            </Text>*/}
                {/*                            {file.size && (*/}
                {/*                                <Text className="text-xs text-gray-500">*/}
                {/*                                    {formatBytes(file.size)}*/}
                {/*                                </Text>*/}
                {/*                            )}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <ActionIcon*/}
                {/*                        variant="text"*/}
                {/*                        onClick={() => handleRemoveFile(index)}*/}
                {/*                        disabled={disabled || isUploading}*/}
                {/*                    >*/}
                {/*                        <X className="w-5 h-5" />*/}
                {/*                    </ActionIcon>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

                {(error || localError) && (
                    <div className="flex items-center gap-2 text-red-500">
                        <FileX className="w-5 h-5" />
                        <Text className="text-sm">{error || localError}</Text>
                    </div>
                )}

                {!error && !localError && helperText && (
                    <Text className="text-xs text-gray-500">{helperText}</Text>
                )}
            </div>
        </div>
    );
}