import { gql } from 'graphql-tag';

export const GET_ME = gql`
    query GET_ME {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                # _id
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }
`

