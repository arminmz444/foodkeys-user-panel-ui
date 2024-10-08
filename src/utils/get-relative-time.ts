import { formatDate } from '@/utils/format-date';

export function getRelativeTime(date: Date): string {
  console.log(date)
  if (!date) return '';
  date = new Date(date);
  const now = new Date();
  const elapsedSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (elapsedSeconds >= 31536000) {
    // One year in seconds
    return new Date(date).toLocaleDateString('fa-ir'); // Return the actual date as an ISO string
  }

  const intervals: [number, string][] = [
    [2592000, 'ماه'],
    [86400, 'روز'],
    [3600, 'ساعت'],
    [60, 'دقیقه'],
    [1, 'ثانیه'],
  ];

  for (const [seconds, unit] of intervals) {
    const intervalValue = Math.floor(elapsedSeconds / seconds);
    if (intervalValue >= 1) {
      return intervalValue === 1
        ? `${intervalValue} ${unit} قبل`
        : `${intervalValue} ${unit} قبل `;
    }
  }

  return 'الان';
}
