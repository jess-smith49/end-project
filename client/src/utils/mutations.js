import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SET = gql`
  mutation addSet($setName: String!){
    addSet(setName: $setName){
      _id
      setName
      setCard {
        cardId
        question
        answer

      }
    }
  }
`;

export const ADD_CARD = gql `



`