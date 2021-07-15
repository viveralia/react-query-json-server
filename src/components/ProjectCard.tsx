import {
  Badge,
  Box,
  Button,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import api from "../api";

import { Project } from "../types";

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (projectId: number) => {
      const response = await api.delete(`/projects/${projectId}`);
      if (!response.ok) throw new Error("Couldn't add new project");
      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries("/projects") }
  );

  return (
    <LinkBox
      as="article"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      cursor="pointer"
    >
      <Box d="flex" alignItems="baseline">
        {project.categories.map((category) => (
          <Badge key={category} borderRadius="full" px="2" colorScheme="orange">
            {category}
          </Badge>
        ))}
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
          as="time"
          dateTime={new Date(project.dueDate).toUTCString()}
        >
          {new Intl.DateTimeFormat("es-MX", {
            year: "numeric",
            month: "long",
          }).format(new Date(project.dueDate))}
        </Box>
      </Box>
      <NextLink href={`/projects/${project.id}`} passHref>
        <LinkOverlay
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {project.name}
        </LinkOverlay>
      </NextLink>
      <Text>
        <Text as="strong" color="gray.500">
          Budget:{" "}
        </Text>
        {new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(project.budget)}
      </Text>
      <Button
        onClick={() => deleteMutation.mutate(project.id)}
        colorScheme="red"
        variant="outline"
        size="sm"
        mt={4}
        isLoading={deleteMutation.isLoading}
      >
        Delete
      </Button>
    </LinkBox>
  );
};
