import { createContext } from "react";

interface NewProjectModalContextValue {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export default createContext({} as NewProjectModalContextValue);
