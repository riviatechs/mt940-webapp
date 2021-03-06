import { gql } from "@apollo/client"

export const GET_TRANSACTION = gql`
  query GetStmtLineGroupDate {
    getStmtLineGroupedByDate {
      ValueDate
      Sls {
        custStmtMsgID
        valueDate
        entryDate
        mark
        amount
        ttic
        refOwner
        refAsi
        iao
      }
    }
  }
`
