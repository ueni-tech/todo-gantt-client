import Contents from "@/components/layouts/Contents";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import useAuth from "@/hooks/useAuth";
import { Box } from "@chakra-ui/react";

const headerHeight = "3rem";
const sidebarWidth = "4.5rem";

export default function Home() {
  const  {loginUser: user, isLogin}  = useAuth();

  return (
    // ログインしていない場合は何も表示しない
    isLogin ? (
      <Box>
        <Header headerHeight={headerHeight} />
        <Box mt={headerHeight}>
          <Sidebar headerHeight={headerHeight} sidebarWidth={sidebarWidth} />
          <Contents headerHeight={headerHeight} sidebarWidth={sidebarWidth} />
        </Box>
      </Box>
    ) : null
  );
}
