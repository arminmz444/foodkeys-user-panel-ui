import toast from "react-hot-toast";

export const handleFormikError = (error: any, setError: any, defaultErrorMessage: any) => {
    // @ts-ignore
    if (error.response && error.response.data) {
        // @ts-ignore
        const backendError = error.response.data;
        if (backendError.statusCode === 400 && backendError.error) {
            // toast.error(backendError.error.message);
            backendError.error.forEach((err: any) => {
                console.log(err);
                // @ts-ignore
                if (err.type === 'INVALID_OTP_ERROR')
                    setError('otp', {
                        type: err.type,
                        message: err.message,
                    });
                else
                    setError(err.formikField, {
                        type: err.type,
                        message: err.message,
                    });
            });
        } else
            toast.error(defaultErrorMessage || 'خطا در برقراری ارتباط با سرور');
    } else
        toast.error(defaultErrorMessage || 'خطا در برقراری ارتباط با سرور');
}