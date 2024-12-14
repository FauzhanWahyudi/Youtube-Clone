import { gql } from "@apollo/client";
export const AddFollowing = gql`
  mutation AddFollowing($body: FollowingInput!) {
    addFollowing(body: $body) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;
