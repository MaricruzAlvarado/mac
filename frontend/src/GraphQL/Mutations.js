import { gql } from "@apollo/client"

export const UPDATE_USER = gql`
  mutation UpdateEmployee( $name: String!, $lastName:String!, $email:String!, $phone:String!,$id: ID! ) {
    updateEmployee( employee: {name:$name, lastName:$lastName,email:$email, phone:$phone},id: $id, ) {
      name
    }
  }
`;
