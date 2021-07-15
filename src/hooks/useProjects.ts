import { useQuery } from "react-query";

import { Project } from "../types";

export const useProjects = (searchParams?: Record<string, unknown>) => {
  return useQuery<Project[], Error>(["/projects", searchParams]);
};

export const useProject = ({ id }: { id: unknown }) => {
  return useQuery<Project, Error>([`/projects/${id}`]);
};
