import { Container, Heading } from "@chakra-ui/react";
import { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <Container py="10rem">
      <Heading as="h1" textAlign="center" mb={4}>
        Find something
      </Heading>
      <Heading as="p" fontSize="md" textAlign="center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, dolor.
      </Heading>
    </Container>
  );
};
