import { routes } from '@/config/routes';
import ProfileSettingsView from '@/app/shared/account-settings/profile-settings';

export default function ProfileSettingsFormPage() {
  return (
    <ProfileSettingsView
      settings={{
        first_name: 'صادق',
        website: 'www.example.com',
        email: 'zonilysu@mailinator.com',
        role: 'software_engineer',
        description:
          '<p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و  .</p>',
      }}
    />
  );
}
