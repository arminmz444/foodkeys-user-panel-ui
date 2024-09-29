import Link from 'next/link';
import Image from 'next/image';
import Confetti from 'react-confetti';
import { routes } from '@/config/routes';
import { Button } from '@/components/ui/button';
import congratulationsImg from '@public/hat-confetti.png';
import { useElementSize } from '@/hooks/use-element-size';

export default function Congratulations() {
  const [ref, { width, height }] = useElementSize();
  return (
    <>
      <div ref={ref} className="col-span-full grid place-content-center">
        <figure className="relative mx-auto grid place-content-center">
          <Image
            src={congratulationsImg}
            alt="congratulation image"
            priority
            className="mx-auto object-contain"
          />
          <figcaption className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl text-white @7xl:text-3xl @[113rem]:text-4xl">
              تبریک بر افزودن ملک خود!
            </h2>
            <p className="mt-6 text-base text-white">
              با تشکر از اعتماد شما به ما برای ملک خود. برای یک سفر پر از
              ارتباطات جدید، تجارب شگفت‌انگیز و لذت از میزبانی مهمانان از سراسر
              جهان آماده شوید.
            </p>
          </figcaption>
        </figure>
        <Confetti className="!fixed mx-auto" width={width} height={height} />
      </div>
    </>
  );
}
