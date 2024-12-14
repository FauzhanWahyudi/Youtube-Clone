import { gql } from "@apollo/client";
export const AddPost = gql`
  mutation AddPost($body: PostForm!) {
    addPost(body: $body) {
      _id
      content
      tags
      imgUrl
      authorId
      createdAt
      updatedAt
    }
  }
`;
