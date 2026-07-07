'use client';
import {routes} from '@/config/routes';
import UpgradeStorage from '@/app/shared/bundle/upgrade-storage';
import {useEffect, useState} from 'react';
import useAxiosPrivate from '@/hooks/use-axios-private';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/bundle/subscription-list/navigation';
import PageHeaderFilter from '@/app/shared/page-header-filter';
import {Text} from '@/components/ui/text';
import toast from 'react-hot-toast';

const pageHeader = {
    title: 'مدیریت اشتراک',
    breadcrumb: [
        {
            href: routes.info.dashboard,
            name: 'مدیریت اطلاعات',
        },
        {
            name: 'مدیریت اشتراک',
        },
    ],
};

const features = [
    'شامل یک سایت استاندارد ویژه.',
    'دسترسی به تمام ویژگی‌ها.',
    'پشتیبانی ۲۴ ساعته.',
];
const features2 = [
    'شامل یک سایت استاندارد ویژه.',
    'دسترسی به تمام ویژگی‌ها.',
    'پشتیبانی ۲۴ ساعته.',
];
const features3 = [
    'شامل یک سایت استاندارد ویژه.',
    'دسترسی به تمام ویژگی‌ها.',
    'پشتیبانی ۲۴ ساعته.',
    '۳ ماه اشتراک رایگان اضافی.',
    'تخفیف سالیانه.',
];
const items = [
    {
        title: 'اشتراک پلن تست رایگان دو ماهه',
        features,
        color: '#22a5dc',
    },
    // {
    //   title: "اشتراک پلن پایه 500,000 تومان ماهیانه",
    //   features: features2,
    //   color: "#22a5dc"
    // },
    // {
    //   title: "اشتراک پلن ویژه 6,000,000 تومان سالیانه",
    //   features: features3,
    //   color: "#22a5dc"
    // },
];
type SortOptions = 'فعال' | 'در انتظار تایید' | 'غیرفعال' | 'همه';
export default function ProfileSettingsFormPage() {
    const [fetchedValue, setFetchedValue] = useState<string[]>([]);
    const [filterValue, setFilterValue] = useState<string>('');
    const [sortValue, setSortValue] = useState<SortOptions>('همه');
    const [items, setItems] = useState();
    const _axios = useAxiosPrivate();

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await _axios.get(
                    sortValue === 'همه'
                        ? `/subscription${
                            filterValue && '?' + `subCategoryId=${filterValue?.value}`
                        }`
                        : sortValue === 'فعال'
                            ? `/subscription?status=ACTIVE${
                                filterValue && '&' + `subCategoryId=${filterValue?.value}`
                            }`
                            : sortValue === 'در انتظار تایید'
                                ? `/subscription?status=PENDING${
                                    filterValue && '&' + `subCategoryId=${filterValue?.value}`
                                }`
                                : `/subscription?status=DISABLE${
                                    filterValue && '&' + `subCategoryId=${filterValue?.value}`
                                }`
                );
                if (response.data.status === 'SUCCESS') {
                    console.log(response.data.data);
                    setItems(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
                toast.error(<Text tag="b">خطا در دریافت اطلاعات اشتراک</Text>);
            }
        };

        fetchSubscriptions();
    }, [_axios, sortValue, filterValue]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await _axios.get(`/subcategory/options`);
                if (response.data.status === 'SUCCESS') {
                    console.log(response.data.data);
                    setFetchedValue(response.data.data);
                } else {
                    toast.error(<Text tag="b">خطا در دریافت دسته‌بندی‌ها</Text>);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error(<Text tag="b">خطا در دریافت دسته‌بندی‌ها</Text>);
            }
        };
        fetchCategories();
    }, [_axios]);

    console.log(filterValue);
    return (
        <>
            <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}/>
            <PageHeaderFilter
                setSortValue={setSortValue}
                setValue={setFilterValue}
                value={fetchedValue}
                filterValue={filterValue}
                sortValue={sortValue}
            />
            <ProfileSettingsNav/>
            <UpgradeStorage items={items || []}/>
        </>
    );
}
