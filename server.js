const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// routes
const apiRoutes = require('./routes/apiRoutes');


// express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// url defined
app.use('/api', apiRoutes);

// comman line questions

const promptUser = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'How would you like to proceed?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ])
    .then((answers) => {

        const { choices } = answers;

        if (choices === "View all departments") {
            getDepartments();
        }
        if (choices === "View all roles") {
            getRoles();
        }
        if (choices === "View all employees") {
            getEmployees();
        }
        if (choices === "Add a department") {
            addDepartment();
        }
        if (choices === "Add a role") {
            addRole();
        }
        if (choices === "Add an employee") {
            addEmployee();
        }
        if (choices === "Update an employee role") {
            updateEmployee();
        }
    })
        
}


        getDepartments = () => {
            console.log("Showing all departments");

        
                const sql = `SELECT * FROM departments`;
                db.query(sql, (err, rows) => {
                    if (err) throw err;
                    console.table(rows);
                    promptUser();
                });

            };   
        
        getRoles = () => {
            console.log("Showing all roles");
    
           
                const sql = `SELECT r.id, r.title, r.salary, d.name AS department_name
                             FROM roles r 
                             LEFT JOIN departments d 
                             ON r.department_id = d.id;`;
                db.query(sql, (err, rows) => {
                    if (err) throw err;
                    console.table(rows);
                    promptUser();
                });
    
            }; 
            
        getEmployees = () => {
        console.log("Showing all employees");

       
            const sql = `SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary
                         FROM employees e 
                         LEFT JOIN roles r 
                         ON e.role_id = r.id
                         LEFT JOIN departments d
                         ON r.department_id = d.id`;
            db.query(sql, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                promptUser();
            });

        };       

        addDepartment = () => {
            inquirer.prompt([
                {
                type:'input',
                name: 'newDepartment',
                message: 'What department would you like to add?',
                validate : newDepartment => {
                    if (newDepartment) {
                        return true;
                    } else {
                        console.log("Please enter a valid department");
                        return false;
                    }
                }

                }
            ])
            .then(answer => {

                const sql = `INSERT INTO departments (name)
                VALUES (?)`;
                db.query(sql, answer.newDepartment, (err, result) => {
                    if (err) { 
                        res.status(400).json({ error: err.message });
                    return;
                    }

                    console.log("Added " + answer.newDepartment + " to departments")

                    getDepartments();
            });
        }
      )
    };
            
        
    addRole = () => {
        inquirer.prompt([
            {
            type:'input',
            name: 'newRole',
            message: 'What role would you like to add?',
            validate : newRole => {
                if (newRole) {
                    return true;
                } else {
                    console.log("Please enter a valid role");
                    return false;
                }
            }

            },
            {
                type:'input',
                name: 'newSalary',
                message: 'What is the salary for this role?',
                validate : newSalary => {
                    if (newSalary) {
                        return true;
                    } else {
                        console.log("Please enter a valid salary");
                        return false;
                    }
                }
    
                },
            {
            type:'input',
            name: 'newDepId',
            message: `What department does this role belong to?

  1. Engineering
  2. Sales
  3. Finance
  4. Legal
                              
  Please enter the NUMBER of the department listed next to it!
  
  `,

            validate : newDepId => {
            if (newDepId) {
              return true;
            } else {
             console.log("Please choose a department");
             return false;
              }
           }
        
        }
        ])
        .then (answer => {
            const params = [answer.newRole, answer.newSalary, answer.newDepId];

            const sql = `INSERT INTO roles (title, salary, department_id)
                 VALUES (?,?,?)`;

                 db.query(sql, params, (err, result) => {
                    if (err) { 
                        res.status(400).json({ error: err.message });
                    return;
                    }

                    console.log("Added " + answer.newRole+ " to roles")

                    getRoles();
                })
          })
    };


    addEmployee = () => {
        inquirer.prompt([
            {
            type:'input',
            name: 'firstName',
            message: 'What is the employees First Name',
            validate : firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log("Please enter a valid name");
                    return false;
                }
            }

            },
            {
                type:'input',
                name: 'lastName',
                message: 'What is the employees last name?',
                validate : lastName => {
                    if (lastName) {
                        return true;
                    } else {
                        console.log("Please enter a valid name");
                        return false;
                    }
                }
    
                },
            {
            type:'input',
            name: 'newRoleId',
            message: `What is this employees role?

  1. 
  2. Sales
  3. Finance
  4. Legal
                              
  Please enter the NUMBER of the department listed next to it!
  
  `,

            validate : newDepId => {
            if (newDepId) {
              return true;
            } else {
             console.log("Please choose a department");
             return false;
              }
           }
        
        }
        ])
        .then (answer => {
            const params = [answer.newRole, answer.newSalary, answer.newDepId];

            const sql = `INSERT INTO roles (title, salary, department_id)
                 VALUES (?,?,?)`;

                 db.query(sql, params, (err, result) => {
                    if (err) { 
                        res.status(400).json({ error: err.message });
                    return;
                    }

                    console.log("Added " + answer.newRole+ " to roles")

                    getRoles();
                })
          })
    }
    
            
    
  




    promptUser();




app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`);
});
