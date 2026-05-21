import { useTheme } from '../contexts/ThemeContext';
import urfuLogo from '../images/urfu-logo.png';
import urfuLogoDark from '../images/urfu-logo-dark.png';
import heroBg from '../images/urfu-building.png';
import heroBgDark from '../images/urfu-building-dark.png';
import exampleCompare from '../images/pres-examle.png';
import processingImage from '../images/proccesing.png';
import processingImageDark from '../images/proccesing-dark.png';
import cancelledImage from '../images/proccecing-end.png';
import cancelledImageDark from '../images/proccecing-end-dark.png';
import errorImage from '../images/error.png';
import errorImageDark from '../images/error-dark.png';
import successImage from '../images/success.png';
import successImageDark from '../images/success-dark.png';
import shareImage from '../images/share.png';
import shareImageDark from '../images/share-dark.png';
import downloadIcon from '../images/download.png';

export const useThemeAssets = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return {
    urfuLogo: isDark ? urfuLogoDark : urfuLogo,
    heroBg: isDark ? heroBgDark : heroBg,
    exampleCompare,
    processingImage: isDark ? processingImageDark : processingImage,
    cancelledImage: isDark ? cancelledImageDark : cancelledImage,
    errorImage: isDark ? errorImageDark : errorImage,
    successImage: isDark ? successImageDark : successImage,
    shareImage: isDark ? shareImageDark : shareImage,
    downloadIcon,
  };
};
