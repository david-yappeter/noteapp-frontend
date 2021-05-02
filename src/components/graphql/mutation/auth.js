import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    auth {
      login(email: $email, password: $password) {
        type
        token
      }
    }
  }
`;

const REGISTER = gql`
  mutation REGISTER(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    auth {
      register(
        input: {
          name: $name
          email: $email
          password: $password
          confirm_password: $confirmPassword
        }
      ) {
        type
        token
      }
    }
  }
`;

export { LOGIN, REGISTER };
