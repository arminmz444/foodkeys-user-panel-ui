'use client';

import { useEffect } from 'react';
import { useQuery } from 'react-query';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import { routes } from '@/config/routes';
import { useNotificationService } from '@/services/notification-service';
import { notificationKeys } from '@/config/notifications';
import { PiArrowRight, PiArchive } from 'react-icons/pi';
import toast from 'react-hot-toast';

dayjs.extend(relativeTime);

// @ts-ignore
const getDisplayNameForPriority = (priority) => {
  switch (priority) {
    case "LOW":
      return "اولویت پایین";
    case "MEDIUM":
      return "اولویت متوسط";
    case "HIGH":
    return "اولویت بالا";
  }
}
export default function NotificationDetailView({ id }: { id: string }) {
  const router = useRouter();
  const service = useNotificationService();

  const { data, isLoading, isError, refetch } = useQuery(
    notificationKeys.detail(id),
    () => service.getNotificationById(id),
    { enabled: Boolean(id) }
  );

  // Mark as read on mount (fire-and-forget, per the API contract).
  useEffect(() => {
    if (id) void service.markRead(id);
  }, [id, service]);

  const handleArchive = async () => {
    try {
      await service.archive(id);
      toast.success('اعلان بایگانی شد');
      router.push(routes.notificationCenter);
    } catch {
      toast.error('خطا در بایگانی اعلان');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
        خطا در دریافت جزئیات اعلان.
        <div className="mt-4 flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            تلاش مجدد
          </Button>
          <Link href={routes.notificationCenter}>
            <Button variant="text" size="sm">
              بازگشت به لیست
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const createdAt = data.createdAt
    ? dayjs(data.createdAt).locale('fa').format('YYYY/MM/DD HH:mm')
    : '—';

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={routes.notificationCenter}
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
      >
        <PiArrowRight className="h-4 w-4" />
        بازگشت به اعلان‌ها
      </Link>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-300 dark:bg-gray-50">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-lighter [&>svg]:h-6 [&>svg]:w-auto">
            <RingBellSolidIcon />
          </div>
          <div className="min-w-0 flex-1">
            <Text tag="h4" className="mb-1 text-lg font-bold text-gray-900">
              {data.title || 'اعلان'}
            </Text>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span>{createdAt}</span>
              {!data.isRead ? (
                <Badge size="sm" color="primary" variant="flat">
                  خوانده نشده
                </Badge>
              ) : null}
              {data.priority ? (
                <Badge size="sm" color="warning" variant="outline">
                  {getDisplayNameForPriority(data.priority)}
                </Badge>
              ) : null}
              {/*{data.topic ? (*/}
              {/*  <Badge size="sm" color="secondary" variant="outline">*/}
              {/*    {data.topic}*/}
              {/*  </Badge>*/}
              {/*) : null}*/}
            </div>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 dark:prose-invert">
          <p className="whitespace-pre-wrap leading-relaxed">{data.message}</p>
        </div>

        {data.link ? (
          <div className="mt-6">
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              مشاهده جزئیات بیشتر ←
            </a>
          </div>
        ) : null}

        <div className="mt-6 flex gap-2 border-t border-gray-100 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleArchive}
            className="gap-1"
          >
            <PiArchive className="h-4 w-4" />
            بایگانی
          </Button>
        </div>
      </div>
    </div>
  );
}
