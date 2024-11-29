import Image from 'next/image';
import logoImg from '@public/fkLogo.png';

export default function Logo({ ...props }) {
  return (
    <Image
      className="max-w-[40px] animate-spin-slow"
      src={logoImg}
      layout="responsive"
      width={1}
      height={1}
      alt="مرجع صنایع غذایی و کشاورزی ایران"
    />
  );
}
