import logoImg from '@public/logo.svg';
import logoIconImg from '@public/logo-short.svg';
import foodkeysLogo from '@public/logo-dark.svg';
enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Isomorphic',
  description: 'A next js dashboard template',
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  foodkeysLogo: foodkeysLogo
  // TODO: favicon
};
