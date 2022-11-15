const {gql}=require('apollo-server-express')


const typeDefs=gql`

#Crear tipo de dato llamado Employee
type Employee{
    id:ID,
    name:String, 
    lastName: String,
    email:String,
    nationality:String,
    phone: String,
    civilStatus:String,
    birthday:String 
}

#Input
input EmployeeInput{
    name: String, 
    lastName: String,
    email: String,
    nationality: String,
    phone: String,
    civilStatus: String,
    birthday: String
}

#Querys
type Query{
    hello:String
    getAllEmployees:[Employee] 
    #getEmployees
}



type Mutation{
    createEmployee(employee:EmployeeInput!): Employee
    deleteEmployee(id:ID!):String
    updateEmployee(id:ID!, employee:EmployeeInput):Employee
}

`



module.exports={typeDefs}