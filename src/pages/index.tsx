import { Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { defaultQueryFn } from "../api";
import { HeroSection } from "../components/HeroSection";
import { RecentProjectsSection } from "../components/RecentProjectsSection";

const HomePage = () => {
  return (
    <>
      <Box as="header" bgColor="yellow.500">
        <HeroSection />
      </Box>
      <Box as="section">
        <RecentProjectsSection />
      </Box>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("/projects", defaultQueryFn);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
