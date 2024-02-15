import Head from "next/head";
import { Button } from "@chakra-ui/react";


export default function Home() {
  return (
    <>
      <Head>
        <title>Chakra UI</title>
      </Head>
      <Button colorScheme="teal" size="md">
        Chakra UI ボタン
      </Button>
    </>
  );
}
