import { gql } from "@apollo/client";
export const LOGIN = gql`
  mutation Mutation($body: LoginInput!) {
    login(body: $body) {
      access_token
      user {
        username
      }
    }
  }
`;
