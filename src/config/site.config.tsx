import logoImg from '@public/fkLogo.png';
import logoIconImg from '@public/logo-short.svg';
import foodkeysLogo from '@public/logo-dark.svg';
enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'مرجع صنایع غذایی و کشاورزی ایران',
  description: 'داشبورد صنایع غذایی و کشاورزی ایران',
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  foodkeysLogo: foodkeysLogo,
  // TODO: favicon
};
