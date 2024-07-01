// src/utils/media-query.js
import { useMediaQuery } from 'react-responsive';

export const useScreenSize = () => {
  const isXSmall = useMediaQuery({ maxWidth: 576 });
  const isSmall = useMediaQuery({ maxWidth: 768 });
  const isLarge = useMediaQuery({ minWidth: 1200 });

  return { isXSmall, isSmall, isLarge };
};
