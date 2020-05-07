import gql from 'graphql-tag';

export const getAllUsers = gql`
  query {
    getAllUsers{
        id,
        nick,
        password,
        email,  
        urlImage,
        phone,
        role,
        createdAt,
        updatedAt
    }
  }
`;
export const getAllUsersDeleted = gql`
  query {
    getAllUsersDeleted{
        id,
        nick,
        password,
        email,  
        urlImage,
        phone,
        role,
        createdAt,
        updatedAt
    }
  }
`;