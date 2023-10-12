import "./App.css";
import Layout from "./layout/Layout";
import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
