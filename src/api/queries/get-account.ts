import { graphql } from 'react-relay';

export const GetAccountQuery = graphql`
  query getAccountQuery($accountNumber: String!) {
    getAccount(number: $accountNumber) {
      id
      number
      ledger {
        value
        createdAt
      }
      transactions {
        senderAccountNumber
        receiverAccountNumber
        value
        createdAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;