import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { createUploadLink } from "apollo-upload-client";

import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_GRAPHQL_LINK,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const customHeaders = operation.getContext().hasOwnProperty("headers")
      ? operation.getContext().headers
      : {};
    operation.setContext({
      headers: {
        ...customHeaders,
      },
    });
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <BrowserRouter>
          <Header />
          <Home />
        </BrowserRouter>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
