import GithubIcon from '@/components/icons/github';
import TeamsIcon from '@/components/icons/teams';
import FigmaIcon from '@/components/icons/figma';
import NotionIcon from '@/components/icons/notion';
import SlackIcon from '@/components/icons/slack';
import AirtableIcon from '@/components/icons/airtable';
import TelegramIcon from '@/components/icons/telegram';

export const teams = [
  {
    name: 'تیم‌ها',
    icon: <TeamsIcon className="h-9 w-9" />,
    url: 'https://teams.com/RedQ',
    content:
      'پروژه‌های نرم‌افزاری، اسپرینت‌ها، وظایف و پیگیری باگ‌ها را بهینه‌سازی کنید.',
  },
  {
    name: 'گیت‌هاب',
    icon: <GithubIcon className="h-9 w-9" />,
    url: 'https://github.com/RedQ',
    content: 'پیوند درخواست‌های pull و اتوماسیون جریان‌های کاری.',
  },
  {
    name: 'فیگما',
    icon: <FigmaIcon className="h-9 w-9" />,
    url: 'https://figma.com/redQ',
    content: 'پیش‌نمایش فایل را در پروژه‌ها جاسازی کنید.',
  },
  {
    name: 'نوشن',
    icon: <NotionIcon className="h-9 w-9 dark:opacity-75 dark:invert" />,
    url: 'https://notion.com/redQ',
    content: 'صفحات و یادداشت‌ها را در پروژه‌ها جاسازی کنید.',
  },
  {
    name: 'اسلک',
    icon: <SlackIcon className="h-9 w-9" />,
    url: 'https://slack.com/redQ',
    content:
      'اعلان‌ها را به کانال‌ها ارسال کرده و پروژه‌ها را از پیام‌ها ایجاد کنید.',
  },
  {
    name: 'ایرتیبل',
    icon: <AirtableIcon className="h-9 w-9" />,
    url: 'https://slack.com/redQ',
    content:
      'پروژه‌های خود را با استفاده از ایرتیبل، یک سرویس همکاری ابری مدیریت کنید.',
  },
  {
    name: 'تلگرام',
    icon: <TelegramIcon className="h-9 w-9" />,
    url: 'https://slack.com/redQ',
    content:
      'پیام‌ها را از طریق یک سرویس پیام‌رسان فریمیوم جهانی، ابری و مرکزی ارسال کنید.',
  },
];
