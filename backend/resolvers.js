const { PrismaClient } = require("@prisma/client");
const Employee = require("./models/Employee");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const resolvers = {
  /*
   *
   *  Querys
   *
   */
 
  Query: {
    login: async (parent, args) => {
      const { name, password } = args;
      const adminError= {name:"error", id:"error", password:"error"};
      const admin = await prisma.admins.findFirst({
        where: {
          name: {
            equals: name}
        }
      });
      if (admin){
          if ((await bcrypt.compare(password, admin.password)) && name == admin.name) {
            console.log("Hola Admin :)")
            return admin
          } else{
            console.log("Usuario y/o Contraseña incorrectos")
            return adminError
          }
      }
        else {
          console.log("Usuario y/o Contraseña incorrectos")
          return adminError
        }
    },
    getAdminByName: async (_, args) => {
      const admin = await prisma.admins.findFirst({
        where: {
          name: {
            equals: args.name}
        }})
      return admin
    },
    getAllEmployees: async (_, context) => {
      const employees = await prisma.employees.findMany({
        orderBy: [
          {
            name: "asc"
          }
        ]
      })
      return employees
    },
    getEmployeesByAny: async (_, args, context) => {
      const where = args.filter
        ? {
            OR: [
              { name: { contains: args.filter } },
              { lastName: { contains: args.filter } },
              { email: { contains: args.filter } },
              { nationality: { contains: args.filter } },
              { phone: { contains: args.filter } },
              { civilStatus: { contains: args.filter } },
              { birthday: { contains: args.filter } }
            ]
          }
        : {};
      const employees = await prisma.employees.findMany({
        where
      })
      return employees
    }
  },

  /*
   *
   *  Mutations
   *
   */

  Mutation: {
    createAdmin: async (_, { name, password }) => {
      const newAdmin = new Admin({
        name,
        password: await bcrypt.hash(password, 10)
      })
      await newAdmin.save()
      return newAdmin
    },
    createEmployee: async (_, args) => {
      const {
        name,
        lastName,
        email,
        nationality,
        phone,
        civilStatus,
        birthday
      } = args.employee;
      const newEmployee = new Employee({
        name,
        lastName,
        email,
        nationality,
        phone,
        civilStatus,
        birthday
      })
      console.log(newEmployee)
      await newEmployee.save()
      return newEmployee
    },
    async deleteEmployee(_, { id }) {
      await Employee.findByIdAndDelete(id)
      return "Employee deleted"
    },
    async updateEmployee(_, { employee, id }) {
      const employeeUpdated = await Employee.findByIdAndUpdate(
        id,
        {
          $set: employee
        },
        { new: true }
      )
      console.log(employeeUpdated)
      return employeeUpdated
    }
  }
}

module.exports = { resolvers };
