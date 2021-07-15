import { Container, Heading, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { defaultQueryFn } from "../../api";
import { useProject } from "../../hooks/useProjects";
import { Project } from "../../types";

const ProjectDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data: project } = useProject({ id });

  if (isLoading) {
    return (
      <Container py="3rem" maxW="container.xl">
        <Heading as="h1" mb="1rem">
          Cargando...
        </Heading>
      </Container>
    );
  }

  return (
    <Container py="3rem" maxW="container.xl">
      <Heading as="h1" mb="1rem">
        {project.name}
      </Heading>
      <Text>{project.description}</Text>
    </Container>
  );
};

export default ProjectDetailsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryClient = new QueryClient();

  const { id } = ctx.params;
  await queryClient.prefetchQuery(`/projects/${id}`, defaultQueryFn);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await defaultQueryFn<Project[]>({ queryKey: ["projects"] });

  const paths = projects.map((project) => ({
    params: { id: project.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};
