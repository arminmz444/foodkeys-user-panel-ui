import { API_BASE_URL } from '@/config/api.config';
import _axios from "@/utils/axios-instance";
async function uploadProductPictures(files: File[]): Promise<string[]> {
    const tempUploadFormData = new FormData();
    files.forEach((file) => tempUploadFormData.append("files", file));
    tempUploadFormData.append("fileServiceType", "PRODUCT_PICTURE");

    const response = await _axios.post(
        `${API_BASE_URL}/company/file/temp`,
        tempUploadFormData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    if (response.status === 200 && response.data?.data) {
        const uuids = response.data.data.map((f: any) => f.id);
        return uuids;
    }

    return [];
}

