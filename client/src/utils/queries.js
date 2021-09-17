import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query GET_ME {
        me {
            _id
            username
            email
            bookCount
            savedBooks
        }
    }
`