"use client"
import toast from "react-hot-toast";
import {Text} from "rizzui";
import {Button} from "@/components/ui/button";

export const fetchSubscriptions = async (subCategoryId: number, _axios: any, router: any,) => {
    try {
        const response = await _axios.get(`/subscription/${subCategoryId}`);
        if (response.data.status === 'SUCCESS') {
            if (!response.data?.data) {
                toast.success(
                    <div>
                        <Text tag="b">{'اطلاعات شما به طور موقت ثبت شد.\n\n'}</Text>
                        <Text>
                            {
                                'برای تایید نهایی و استفاده از خدمات سایت، لطفا اشتراک فعال جدیدی تهیه کنید.\n'
                            }
                        </Text>
                        <Button
                            className="mt-3"
                            size="sm"
                            onClick={() => console.log('DISMISS')}
                        >
                            خرید اشتراک
                        </Button>
                    </div>,
                { duration: 5000 }
            );
                router.replace('/bundle/buy');
            }
            return true;
        }
    } catch (error) {
        console.error('Error fetching subscription:', error);
        toast.error(
            <div>
                <Text tag="b">{'اطلاعات شما به طور موقت ثبت شد.\n\n'}</Text>
                <Text>
                {'اما هنگام دریافت وضعیت اشتراک شما، خطایی رخ داده است.\n' +
                        'برای تایید نهایی و استفاده از خدمات سایت، لطفا اشتراک فعال جدیدی تهیه کنید.\n'}
                </Text>
                <Button
        className="mt-3"
        size="sm"
        onClick={() => console.log('DISMISS')}
    >
        خرید اشتراک
        </Button>
        </div>,
        { duration: 60000 }
    );
    }
};