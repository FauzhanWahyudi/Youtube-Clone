import { gql } from "@apollo/client";
export const AddUser = gql`
  mutation AddUser($body: AddUserInput!) {
    addUser(body: $body) {
      username
    }
  }
`;
