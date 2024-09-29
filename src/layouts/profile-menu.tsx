'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import {useAuth} from "@/context/AuthContext";

const menuItems = [
  {
    name: 'پروفایل من',
    href: routes.profile,
  },
  {
    name: 'تنطیمات حساب کاربری',
    href: routes.forms.profileSettings,
  },
  {
    name: 'تاریخچه فعالیت',
    href: '#',
  },
];

function DropdownMenu() {
  // @ts-ignore
  const { logout } = useAuth()

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp"
          name="فرهاد مجیدی"
          color="invert"
        />
        <div className="ms-3">
          <Text tag="h6" className="font-semibold">
            فرهاد مجیدی
          </Text>
          <Text className="text-gray-600">flores@iso.io</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-600 focus-visible:ring-0"
          variant="text"
          onClick={logout}
        >
          خروج
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu() {
  return (
    <Popover
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button className="w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10">
        <Avatar
          src="https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/public/avatars-blur/avatar-11.webp"
          name="John Doe"
          color="invert"
          className="!h-9 w-9 sm:!h-10 sm:w-10"
        />
      </button>
    </Popover>
  );
}
