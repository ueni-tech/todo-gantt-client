import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: '"Noto Sans JP", sans-serif',
        fontOpticalSizing: "auto",
        fontStyle: "normal",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: '"Noto Sans JP", sans-serif',
      },
    },
  },
  colors: {
    main: '#6ea9a8',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
};
