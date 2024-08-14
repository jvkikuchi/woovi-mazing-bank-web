import { graphql } from 'react-relay';

export const CreateUserMutation = graphql`
  mutation createUserMutation(
    $name: String!
    $surname: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      name: $name
      surname: $surname
      email: $email
      password: $password
    ) {
      token
    }
  }
`;
