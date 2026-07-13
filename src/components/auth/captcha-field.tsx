'use client';

import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { PiArrowClockwiseBold } from 'react-icons/pi';
import cn from '@/utils/class-names';

type CaptchaFieldProps = {
  imageSrc: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  onRefresh: () => void;
  loading?: boolean;
  error?: string;
  className?: string;
  color?: 'success' | 'info' | 'primary' | 'secondary' | 'danger' | 'warning';
};

export default function CaptchaField({
  imageSrc,
  answer,
  onAnswerChange,
  onRefresh,
  loading = false,
  error,
  className,
  color = 'success',
}: CaptchaFieldProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          title="برای دریافت کپچای جدید کلیک کنید"
          className={cn(
            'relative flex h-14 min-w-[160px] flex-1 items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50',
            loading && 'opacity-60'
          )}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt="کپچا"
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <Text className="text-sm text-gray-500">
              {loading ? 'در حال بارگذاری...' : 'کپچا موجود نیست'}
            </Text>
          )}
        </button>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          aria-label="بازنشانی کپچا"
          className="flex h-14 w-12 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
        >
          <PiArrowClockwiseBold
            className={cn('h-5 w-5', loading && 'animate-spin')}
          />
        </button>
      </div>
      <Input
        type="text"
        size="lg"
        label="کد کپچا"
        placeholder="کد تصویر را وارد کنید"
        color={color}
        autoComplete="off"
        autoCapitalize="characters"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        error={error}
        className="[&>label>span]:font-medium"
        inputClassName="text-sm tracking-widest uppercase"
      />
      <Text className="text-xs text-gray-500">
        روی تصویر کلیک کنید تا کپچا عوض شود. حروف بزرگ و کوچک یکسان‌اند.
      </Text>
    </div>
  );
}
