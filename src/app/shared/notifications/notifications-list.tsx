'use client';

import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Empty, EmptyBoxIcon } from '@/components/ui/empty';
import { Loader } from '@/components/ui/loader';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import { routes } from '@/config/routes';
import { useNotificationService } from '@/services/notification-service';
import {
  NOTIFICATIONS_PAGE_SIZE,
  NotificationItem,
  notificationKeys,
} from '@/config/notifications';
import { PiArchive, PiCheck } from 'react-icons/pi';
import cn from '@/utils/class-names';

dayjs.extend(relativeTime);

function formatDate(iso?: string) {
  if (!iso) return '—';
  const d = dayjs(iso);
  return d.isValid() ? d.locale('fa').format('YYYY/MM/DD HH:mm') : '—';
}

function NotificationRow({
  item,
  onOpen,
  onArchive,
}: {
  item: NotificationItem;
  onOpen: (item: NotificationItem) => void;
  onArchive: (id: number | string) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen(item);
      }}
      className={cn(
        'group flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-sm dark:border-gray-300 dark:bg-gray-50',
        !item.isRead && 'border-primary/20 bg-primary-lighter/20'
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-200 [&>svg]:h-5 [&>svg]:w-auto">
        <RingBellSolidIcon />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <Text tag="h6" className="text-sm font-semibold text-gray-900">
            {item.title || 'اعلان'}
          </Text>
          {!item.isRead ? (
            <Badge size="sm" color="primary" variant="flat">
              جدید
            </Badge>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <PiCheck className="h-3.5 w-3.5" />
              خوانده شده
            </span>
          )}
        </div>
        <p className="mb-2 line-clamp-2 text-sm text-gray-600">{item.message}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span>{formatDate(item.createdAt)}</span>
          {item.priority ? (
            <Badge size="sm" color="warning" variant="outline">
              {item.priority}
            </Badge>
          ) : null}
        </div>
      </div>

      <Button
        variant="text"
        size="sm"
        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onArchive(item.id);
        }}
        title="بایگانی"
      >
        <PiArchive className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function NotificationsListView() {
  const router = useRouter();
  const service = useNotificationService();
  const [page, setPage] = useState(1);
  const [archived, setArchived] = useState(false);

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    notificationKeys.list(archived, page),
    () => service.getNotifications(page, NOTIFICATIONS_PAGE_SIZE, archived),
    { keepPreviousData: true }
  );

  const items = useMemo(() => data?.data ?? [], [data]);
  const totalPages = data?.totalPages ?? 1;

  const handleOpen = (item: NotificationItem) => {
    router.push(routes.notificationDetails(item.id));
  };

  const handleArchive = async (id: number | string) => {
    await service.archive(id);
    refetch();
  };

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
        خطا در دریافت اعلان‌ها. لطفاً دوباره تلاش کنید.
        <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
          تلاش مجدد
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        <Button
          variant={!archived ? 'solid' : 'outline'}
          size="sm"
          onClick={() => {
            setArchived(false);
            setPage(1);
          }}
        >
          فعال
        </Button>
        <Button
          variant={archived ? 'solid' : 'outline'}
          size="sm"
          onClick={() => {
            setArchived(true);
            setPage(1);
          }}
        >
          بایگانی
        </Button>
        {isFetching ? (
          <span className="ms-auto self-center text-xs text-gray-400">
            در حال بروزرسانی…
          </span>
        ) : null}
      </div>

      {items.length === 0 ? (
        <Empty
          image={<EmptyBoxIcon className="h-28 w-28" />}
          text={archived ? 'اعلان بایگانی‌شده‌ای وجود ندارد' : 'اعلانی وجود ندارد'}
          textClassName="text-sm text-gray-500"
          className="py-16"
        />
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <NotificationRow
              key={String(item.id)}
              item={item}
              onOpen={handleOpen}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            قبلی
          </Button>
          <span className="text-sm text-gray-600">
            صفحه {page} از {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            بعدی
          </Button>
        </div>
      ) : null}
    </div>
  );
}
