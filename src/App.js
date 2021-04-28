import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { BrowserRouter, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { createUploadLink } from "apollo-upload-client";

import Header from "./components/Header";
import Home from "./components/Home";
import Board from "./components/Board";
import Members from "./components/Members";
import Test from "./components/Test";

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
          <div
          // style={{
          //   backgroundImage: `url("https://images.wallpaperscraft.com/image/lake_mountains_trees_129959_1366x768.jpg")`,
          //   backgroundPosition: "center",
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          //   height: "100vh",
          //   width: "100vw",
          // }}
          >
            <Header />
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/team/:teamID/board/:boardID"
              component={Board}
            />
            <Route exact path="/team/:teamID" component={Members} />
            <Route exact path="/test" component={Test} />
          </div>
        </BrowserRouter>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
