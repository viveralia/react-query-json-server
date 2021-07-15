export type Category = "marketing" | "design" | "programming";

export interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;
  dueDate: string;
  categories: Category[];
}
