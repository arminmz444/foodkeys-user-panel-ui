import ProfileHeader from '@/app/shared/profile/profile-header';
import ProfileDetails from '@/app/shared/profile/profile-details';
import PersonalInfoView from "@/app/shared/account-settings/personal-info";

export default function ProfilePage() {
  return (
    <div className="@container">
      <ProfileHeader />
        <PersonalInfoView />
      {/*<ProfileDetails />*/}
    </div>
  );
}
