// 'use client';
//
// import { useTransition } from 'react';
// import { atom, useAtom, useSetAtom } from 'jotai';
// import { usePathname, useRouter } from 'next/navigation';
// import cn from '@/utils/class-names';
// import { Badge } from '@/components/ui/badge';
// import { useCreateQueryString } from '@/hooks/use-create-query-string';
// import MessageDetails from '@/app/shared/support/inbox/message-details';
// import SimpleBar from '@/components/ui/simplebar';
// import {
//   dataAtom,
//   messageIdAtom,
// } from '@/app/shared/support/inbox/message-list';
// import { messages } from '@/data/support-inbox';
//
// export const supportNavItems = [
//   {
//     value: 'all-open',
//     label: 'همه',
//     count: 1603,
//   },
//   {
//     value: 'open',
//     label: 'باز',
//     count: 991,
//   },
//   {
//     value: 'closed',
//     label: 'بسته',
//     count: 612,
//   },
// ];
//
// export const tabAtom = atom(supportNavItems[0].value);
//
// export default function InboxTabs({ className }: { className?: string }) {
//   return <MessageDetails className={cn(className)} />;
// }
//
// export function TabList() {
//   const [tab, setTab] = useAtom(tabAtom);
//   const [isPending, startTransition] = useTransition();
//
//   function selectTab(nextTab: string) {
//     startTransition(() => {
//       setTab(nextTab);
//     });
//   }
//
//   return (
//     <SimpleBar>
//       <nav className="flex items-center gap-5 border-b border-gray-300">
//         {supportNavItems.map((nav) => (
//           <TabButton
//             item={nav}
//             key={nav.value}
//             isActive={tab === nav.value}
//             onClick={() => selectTab(nav.value)}
//             disabled={isPending}
//           />
//         ))}
//       </nav>
//     </SimpleBar>
//   );
// }
//
// interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   item: {
//     value: string;
//     label: string;
//     count: number;
//   };
//   isActive: boolean;
//   onClick: () => void;
// }
// export function TabButton({
//   item,
//   isActive,
//   onClick,
//   ...props
// }: TabButtonProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [data, setData] = useAtom(dataAtom);
//   const setMessageId = useSetAtom(messageIdAtom);
//   const { createQueryString } = useCreateQueryString();
//
//   function handleClick() {
//     // update url params
//     router.push(pathname + '?' + createQueryString('tab', item.value));
//
//     // update message list
//     const updatedItems = messages.filter((msg) => msg.category === item.value);
//     setData(updatedItems);
//
//     setMessageId(data[0].id);
//
//     // set active tab
//     return onClick();
//   }
//
//   // console.log('data', data);
//
//   return (
//     <button
//       className={cn(
//         'relative flex items-center gap-2 py-2 text-sm outline-none',
//         isActive
//           ? 'font-medium text-gray-900'
//           : 'text-gray-500 hover:text-gray-800'
//       )}
//       onClick={handleClick}
//       {...props}
//     >
//       <span className="whitespace-nowrap">{item.label}</span>
//       <Badge
//         size="sm"
//         variant={isActive ? 'solid' : 'flat'}
//         className={cn(!isActive && 'bg-gray-100')}
//       >
//         {item.count}
//       </Badge>
//       <span
//         className={cn(
//           'absolute -bottom-px left-0 h-0.5 w-full',
//           isActive ? 'bg-gray-900' : 'bg-transparent'
//         )}
//       />
//     </button>
//   );
// }

'use client';

import { useTransition } from 'react';
import { atom, useAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import cn from '@/utils/class-names';
import { Badge } from '@/components/ui/badge';
import { useCreateQueryString } from '@/hooks/use-create-query-string';
import MessageDetails from '@/app/shared/support/inbox/message-details';
import SimpleBar from '@/components/ui/simplebar';
import { ticketStatsAtom } from '@/app/shared/support/inbox/message-list';

export const supportNavItems = [
  {
    value: 'all-open',
    label: 'همه',
    count: 0,
  },
  {
    value: 'open',
    label: 'باز',
    count: 0,
  },
  {
    value: 'closed',
    label: 'بسته',
    count: 0,
  },
];

export const tabAtom = atom(supportNavItems[1].value);

export default function InboxTabs({ className }: { className?: string }) {
  return <MessageDetails className={cn(className)} />;
}

export function TabList() {
  const [tab, setTab] = useAtom(tabAtom);
  const [ticketStats] = useAtom(ticketStatsAtom);
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  // Update counts based on ticket stats
  const navItems = [
    {
      value: 'all-open',
      label: 'همه',
      count: ticketStats.totalTickets || 0,
    },
    {
      value: 'open',
      label: 'باز',
      count: ticketStats.openTickets || 0,
    },
    {
      value: 'closed',
      label: 'بسته',
      count: ticketStats.closedTickets || 0,
    },
  ];

  return (
      <SimpleBar>
        <nav className="flex items-center gap-5 ps-4 border-b border-gray-300">
          {navItems.map((nav) => (
              <TabButton
                  item={nav}
                  key={nav.value}
                  isActive={tab === nav.value}
                  onClick={() => selectTab(nav.value)}
                  disabled={isPending}
              />
          ))}
        </nav>
      </SimpleBar>
  );
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    value: string;
    label: string;
    count: number;
  };
  isActive: boolean;
  onClick: () => void;
}
export function TabButton({
                            item,
                            isActive,
                            onClick,
                            ...props
                          }: TabButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useCreateQueryString();

  function handleClick() {
    // update url params
    router.push(pathname + '?' + createQueryString('tab', item.value));

    // set active tab
    return onClick();
  }

  return (
      <button
          className={cn(
              'relative flex items-center gap-2 py-2 text-sm outline-none',
              isActive
                  ? 'font-medium text-gray-900'
                  : 'text-gray-500 hover:text-gray-800'
          )}
          onClick={handleClick}
          {...props}
      >
        <span className="whitespace-nowrap">{item.label}</span>
        <Badge
            size="sm"
            variant={isActive ? 'solid' : 'flat'}
            className={cn(!isActive && 'bg-gray-100')}
        >
          {item.count}
        </Badge>
        <span
            className={cn(
                'absolute -bottom-px left-0 h-0.5 w-full',
                isActive ? 'bg-gray-900' : 'bg-transparent'
            )}
        />
      </button>
  );
}