import { create } from "apisauce";
import { QueryOptions } from "react-query";

const api = create({
  baseURL: "http://localhost:5000",
});

type QueryKey = [string, never];

export const defaultQueryFn = async <T>({
  queryKey,
}: QueryOptions): Promise<T> => {
  if (typeof queryKey === "string") queryKey = [queryKey];

  const [resource, searchParams] = queryKey as QueryKey;
  const response = await api.get<T>(`${resource}`, searchParams);
  if (!response.ok) throw new Error("Something happened!");
  return response.data;
};

export default api;
