import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, useContext } from "react";

import NewProjectModalContext from "../state/NewProjectModalContext";

export const Navbar: FC = () => {
  const { onOpen } = useContext(NewProjectModalContext);

  return (
    <Container py="1rem" maxW="container.xl">
      <Flex align="center" justify="space-between">
        <NextLink href="/" passHref>
          <Heading as="a" fontSize="lg">
            projects.io
          </Heading>
        </NextLink>
        <Button onClick={onOpen} colorScheme="yellow" variant="solid">
          Create project
        </Button>
      </Flex>
    </Container>
  );
};
