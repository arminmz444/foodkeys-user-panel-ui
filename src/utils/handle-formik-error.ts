import toast from "react-hot-toast";
import { CAPTCHA_ERROR, extractAuthErrorMeta } from "@/utils/auth-captcha";

export const handleFormikError = (error: any, setError: any, defaultErrorMessage: any) => {
    // @ts-ignore
    if (error.response && error.response.data) {
        // @ts-ignore
        const backendError = error.response.data;
        const meta = extractAuthErrorMeta(error);

        if (
            meta.errorType === CAPTCHA_ERROR.RATE_LIMIT ||
            error.response.status === 429
        ) {
            toast.error(meta.message || defaultErrorMessage);
            return meta;
        }

        if (backendError.statusCode === 400 && backendError.error) {
            // Always show the server message to the user
            if (meta.errorType === CAPTCHA_ERROR.INVALID) {
                toast.error('کپچا نامعتبر');
            } else if (backendError.message) {
                toast.error(backendError.message);
            }
            // Set field-specific errors
            backendError.error.forEach((err: any) => {
                console.log(err);
                // @ts-ignore
                if (err.type === 'INVALID_OTP_ERROR')
                    setError('otp', {
                        type: err.type,
                        message: err.message,
                    });
                else if (
                    err.type === CAPTCHA_ERROR.INVALID ||
                    err.formikField === 'captchaAnswer' ||
                    err.formikField === 'captchaToken'
                ) {
                    setError('captchaAnswer', {
                        type: err.type || CAPTCHA_ERROR.INVALID,
                        message: 'کپچا نامعتبر',
                    });
                }
                else if (err.formikField)
                    setError(err.formikField, {
                        type: err.type,
                        message: err.message,
                    });
            });
            return meta;
        } else {
            // Show server message if available, otherwise show default
            toast.error(meta.message || backendError.message || defaultErrorMessage || 'خطا در برقراری ارتباط با سرور');
            return meta;
        }
    } else {
        toast.error(defaultErrorMessage || 'خطا در برقراری ارتباط با سرور');
        return {};
    }
}