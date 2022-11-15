const Employee = require('./models/Employee')

const resolvers={

    Query:{
        hello: ()=>'Hello world',
        getAllEmployees: async ()=>   {
            const employees= await Employee.find()
            return employees
        }
    }
    ,
    Mutation:{
        createEmployee: async (_, args) => {
            const {
                name, 
                lastName, 
                email, 
                nationality, 
                phone,  
                civilStatus, 
                birthday }= args.employee
            const newEmployee= new Employee({
                name, 
                lastName,
                email, 
                nationality, 
                phone, 
                civilStatus, 
                birthday})
            console.log(newEmployee)
            await newEmployee.save()
            return newEmployee   
        },
        //Para no utilizar todo el objeto args, usamos corchete para solo obtener el id
        async deleteEmployee(_,{id}){
            await Employee.findByIdAndDelete(id)
            return 'Employee deleted';
        },
        async updateEmployee(_,{employee, id }){
            const employeeUpdated= await Employee.findByIdAndUpdate(id,{
               $set:employee 
            },{new:true})
            console.log(employeeUpdated)
            return employeeUpdated
        }
    }
};

module.exports={resolvers};