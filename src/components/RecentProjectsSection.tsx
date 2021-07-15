import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useContext } from "react";

import { ProjectCard } from "./ProjectCard";
import NewProjectModalContext from "../state/NewProjectModalContext";
import { useProjects } from "../hooks/useProjects";

export const RecentProjectsSection: FC = () => {
  const { onOpen } = useContext(NewProjectModalContext);
  const { isLoading, data: projects } = useProjects({ _limit: 3 });

  return (
    <Container py="6rem" maxW="container.xl">
      <Heading fontSize="xl" as="h1" textAlign="center" mb={4}>
        Most recent projects
      </Heading>
      {isLoading && <Text align="center">Loading...</Text>}
      {projects && (
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </SimpleGrid>
      )}
      <Flex mt={4} alignItems="center" justifyContent="center">
        <NextLink href="/projects" passHref>
          <Button as="a" colorScheme="yellow" variant="outline" mr={2}>
            View all
          </Button>
        </NextLink>
        <Button onClick={onOpen} colorScheme="yellow" variant="solid">
          Create project
        </Button>
      </Flex>
    </Container>
  );
};
