import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";

import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

const theme = extendTheme({
  colors: {
    main: '#6ea9a8',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Flex>
        <Sidebar />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  )
};
