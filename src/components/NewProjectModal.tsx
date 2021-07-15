import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import api from "../api";
import { Category, Project } from "../types";

interface NewProjectModalProps extends Omit<ModalProps, "children"> {}

const initialProjectValues = {
  name: "",
  description: "",
  budget: "",
  dueDate: "",
  category: "",
};

const categories = ["marketing", "design", "programming"];

export const NewProjectModal: FC<NewProjectModalProps> = (props) => {
  const [formValues, setFormValues] = useState(initialProjectValues);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newProject: Omit<Project, "id"> = {
        name: formValues.name,
        description: formValues.description,
        budget: parseInt(formValues.budget),
        dueDate: formValues.dueDate,
        categories: [formValues.category as Category],
      };

      const response = await api.post("/projects", newProject);
      if (!response.ok) throw new Error("Couldn't add new project");

      setFormValues(initialProjectValues);
      props.onClose();
      return response.data;
    },
    { onSuccess: () => queryClient.invalidateQueries("/projects") }
  );

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={mutation.mutate}>
        <ModalHeader>Publish a new project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={2}>
            <FormLabel>Name</FormLabel>
            <Input
              required
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Description</FormLabel>
            <Textarea
              required
              name="description"
              value={formValues.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Budget</FormLabel>
            <Input
              required
              name="budget"
              type="number"
              value={formValues.budget}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Due date</FormLabel>
            <Input
              required
              name="dueDate"
              type="date"
              value={formValues.dueDate}
              onChange={handleChange}
            />
          </FormControl>
          <RadioGroup
            mb={4}
            value={formValues.category}
            onChange={(newValue) =>
              setFormValues({ ...formValues, category: newValue })
            }
          >
            <FormLabel>Category</FormLabel>
            <Stack spacing={4} direction="row">
              {categories.map((category) => (
                <Radio
                  textTransform="capitalize"
                  key={category}
                  value={category}
                >
                  {category}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="button" variant="ghost" onClick={props.onClose} mr={2}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="solid"
            colorScheme="yellow"
            isLoading={mutation.isLoading}
          >
            Publish
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
