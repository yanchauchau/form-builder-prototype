import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  sizes: {
    xs: "2",  // Corresponds to 8px (2 * 4px)
    s: "4",   // 16px
    m: "6",   // 24px
    l: "8",   // 32px
    lg: "10", // 40px
  },
});

export default customTheme;
