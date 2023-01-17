import { extendTheme, ThemeComponents, ThemeConfig } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  } satisfies ThemeConfig,
  components: {
    Drawer: {
      parts: ['dialog, dialogContainer'],
      variants: {
        transparent: {
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
  } satisfies ThemeComponents,
});
