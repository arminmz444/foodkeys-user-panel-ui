'use client';

import { NotificationProvider } from '@/context/NotificationContext';

export default function HydrogenProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
