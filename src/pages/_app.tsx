import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider, QueryOptions } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";

import { defaultQueryFn } from "../api";
import { Navbar } from "../components/Navbar";
import { NewProjectModal } from "../components/NewProjectModal";
import NewProjectModalContext from "../state/NewProjectModalContext";

const App = ({ Component, pageProps }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: defaultQueryFn,
            onError: (err: Error) => alert(err.message),
          },
        },
      })
  );

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <NewProjectModalContext.Provider value={{ isOpen, onClose, onOpen }}>
            <Navbar />
            <Component {...pageProps} />
          </NewProjectModalContext.Provider>
        </Hydrate>
        <NewProjectModal isOpen={isOpen} onClose={onClose} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
