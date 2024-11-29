import { routes } from '@/config/routes';
import PersonalInfoView from '@/app/shared/account-settings/personal-info';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import BillingSettingsView from "@/app/shared/account-settings/billing-settings";

const pageHeader = {
    title: 'خرید اشتراک',
    breadcrumb: [
        {
            href: routes.bundle,
            name: 'مدیریت اشتراک',
        },
        {
            name: 'خرید اشتراک',
        },
    ],
};

export default function BuyBundlePage() {
    return <BillingSettingsView />;
}
