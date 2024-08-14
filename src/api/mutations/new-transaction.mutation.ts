import { graphql } from 'react-relay';

export const NewTransactionMutation = graphql`
  mutation newTransactionMutation(
    $receiverAccountNumber: String!
    $senderAccountNumber: String!
    $value: Int!
  ) {
    newTransaction(
      receiverAccountNumber: $receiverAccountNumber
      senderAccountNumber: $senderAccountNumber
      value: $value
    ) {
      id
      value
      createdAt
    }
  }
`;