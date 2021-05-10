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

import HeaderComponent from "./components/HeaderComponent";
import Home from "./components/Home";
import Board from "./components/Board";
import TeamPage from "./components/TeamPage";
import Test from "./components/Test";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_NOTE_APP_GRAPHQL_LINK,
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
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/team/:teamID/board/:boardID" component={Board} />
          <Route exact path="/team/:teamID" component={TeamPage} />
          <Route exact path="/test" component={Test} />
        </BrowserRouter>
      </CookiesProvider>
    </ApolloProvider>
  );
}

export default App;
