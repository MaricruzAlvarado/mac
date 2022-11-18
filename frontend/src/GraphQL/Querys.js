import { gql } from "@apollo/client"

export const LOGIN = gql`
  query Login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      id
      name
    }
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
    id
    name
    lastName
    email
    nationality
    phone
    civilStatus
    birthday
  }
}
`;

