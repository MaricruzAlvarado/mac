const { gql } = require("apollo-server-express");

const typeDefs = gql`
  #
  #
  #   Types
  #
  #

  #Crear tipo de dato llamado Employee
  type Employee {
    id: ID
    name: String
    lastName: String
    email: String
    nationality: String
    phone: String
    civilStatus: String
    birthday: String
  }
  #Crear tipo de dato llamado Admin
  type Admin {
    id: ID
    name: String
    password: String
  }

  #
  #
  #   Inputs
  #
  #

  input EmployeeInput {
    name: String
    lastName: String
    email: String
    nationality: String
    phone: String
    civilStatus: String
    birthday: String
  }

  input EmployeeEditInput {
    name: String
    lastName: String
    email: String
    phone: String
  }

  #
  #
  #   Querys
  #
  #

  type Query {
    getAllEmployees: [Employee]
    getAdminByName(name: String!): Admin
    login(name: String!, password: String!): Admin
    getEmployeesByAny(filter: String!): [Employee]
  }

  #
  #
  #   Mutations
  #
  #

  type Mutation {
    createAdmin(name: String!, password: String!): Admin
    createEmployee(employee: EmployeeInput!): Employee
    deleteEmployee(id: ID!): String
    updateEmployee(id: ID!, employee:EmployeeEditInput): Employee
  }
`

module.exports = { typeDefs };
