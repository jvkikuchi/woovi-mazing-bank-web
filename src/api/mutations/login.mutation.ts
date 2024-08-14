import { graphql } from 'react-relay';

export const LoginMutation = graphql`
  mutation loginMutation(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;