import { gql } from "@apollo/client";
export const AddLike = gql`
  mutation AddLike($body: LikeForm) {
    addLike(body: $body) {
      username
      createdAt
      updatedAt
    }
  }
`;
