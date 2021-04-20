import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    auth {
      login(email: $email, password: $password) {
        type
        token
      }
    }
  }
`;
