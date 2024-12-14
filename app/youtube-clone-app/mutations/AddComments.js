import { gql } from "@apollo/client";
export const AddComment = gql`
  mutation AddComment($body: CommentForm!) {
    addComment(body: $body) {
      content
      username
      createdAt
      updatedAt
    }
  }
`;
