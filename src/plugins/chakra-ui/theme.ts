import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
} satisfies ThemeConfig;

export const theme = extendTheme({ config });
