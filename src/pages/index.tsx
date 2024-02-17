import Contents from "@/components/layouts/Contents";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const headerHeight = "3rem";
const sidebarWidth = "4.5rem";

export default function Home() {
  return (
    <>
      <Box>
        <Header headerHeight={headerHeight} />
        <Box flex='1' mt={headerHeight}>
          <Sidebar headerHeight={headerHeight} sidebarWidth={sidebarWidth} />
          <Contents sidebarWidth={sidebarWidth} />
        </Box>
      </Box>
    </>
  );
}
