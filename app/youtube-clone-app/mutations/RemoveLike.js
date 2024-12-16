import { gql } from "@apollo/client";
export const RemoveLike = gql`
  mutation Mutation($body: LikeForm) {
    disLike(body: $body)
  }
`;
