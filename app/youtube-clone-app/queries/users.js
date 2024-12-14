import { gql } from "@apollo/client";
export const SEARCH_USER = gql`
  query SearchUser($search: String) {
    searchUser(search: $search) {
      _id
      name
      username
      email
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      _id
      name
      username
      email
    }
  }
`;

export const GET_PROFILE = gql`
  query Users($id: ID) {
    user(_id: $id) {
      user {
        _id
        name
        username
        email
      }
      followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        user {
          _id
          name
          username
          email
        }
      }
      following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        user {
          _id
          name
          username
          email
        }
      }
    }
  }
`;
