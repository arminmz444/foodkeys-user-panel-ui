import Link from 'next/link';
import Image from 'next/image';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { PiHouseLineBold } from 'react-icons/pi';
import SocialItems from '@/components/ui/social-shares';
import { siteConfig } from '@/config/site.config';
import NotFoundImg from '@public/not-found.png';
import NotFoundPage from './(other-pages)/not-found/page';

export default function NotFound() {
  return <NotFoundPage />;
}
