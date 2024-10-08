import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// // utils/class-names.ts
// export default function cn(...classes: (string | boolean | undefined)[]) {
//   return classes.filter(Boolean).join(' ');
// }
//
