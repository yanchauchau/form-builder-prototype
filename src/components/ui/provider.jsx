import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from "@/components/ui/color-mode"
import { customTheme } from '@/theme/theme';

export function Provider(props) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
