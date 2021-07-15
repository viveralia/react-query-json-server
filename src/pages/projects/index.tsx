import {
  Badge,
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { defaultQueryFn } from "../../api";
import { ProjectCard } from "../../components/ProjectCard";
import { useProjects } from "../../hooks/useProjects";

const availableCategories = ["marketing", "programming", "design"];

const ProjectsPage: NextPage = () => {
  const router = useRouter();
  const { categories } = router.query;
  const { isLoading, data: projects } = useProjects({ categories });

  function handleCategoryClick(category: string) {
    const isSelected = categories?.includes(category);
    const url = new URL(window.location.href);
    url.searchParams.delete("categories");
    if (!isSelected) url.searchParams.append("categories", category);
    router.replace(url.href);
  }

  return (
    <Container py="3rem" maxW="container.xl">
      <Head>
        <title>{categories || "Projects"} | project.io</title>
      </Head>
      <Heading as="h1" mb="1rem">
        Projects
      </Heading>
      <Box mb="2rem">
        {availableCategories.map((category) => {
          const isSelected = router.query.categories?.includes(category);
          return (
            <Badge
              as="button"
              onClick={() => handleCategoryClick(category)}
              key={category}
              borderRadius="full"
              px="2"
              mr={2}
              colorScheme={isSelected ? "orange" : "gray"}
            >
              {category}
            </Badge>
          );
        })}
      </Box>
      {isLoading && <Text align="center">Loading...</Text>}
      {projects && (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("/projects", defaultQueryFn);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
