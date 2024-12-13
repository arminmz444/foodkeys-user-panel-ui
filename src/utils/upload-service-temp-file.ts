
interface FileUploadResponse {
  status: string;
  statusCode: number;
  message: string;
  data: {
    id: string;
    fileExtension: string;
    fileName: string;
    filePath: string;
    permanent: boolean;
    fileSize: number;
    contentType: string;
    fileCategory: string;
    userId: number;
    createdAtStr: string | null;
    updatedAtStr: string | null;
    fileServiceTypeDTO: {
      name: string;
      displayName: string;
      maxSize: number;
    };
    fileServiceType: string | null;
    key: string;
  }[];
  error: any;
  pagination: any;
}

export async function uploadServiceTempFile(
    _axios,
  serviceName: string,
  files: File[],
): Promise<string[]> {
  const formData = new FormData();
  formData.append('serviceName', serviceName);

  files.forEach((file) => {
    formData.append('files', file);
  });

  try {
    // @ts-ignore
    const response = await _axios.post<FileUploadResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/service/file/temp`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data && response.data.data) {
      return response.data.data.map((file) => file.id);
    } else 
      throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
}
