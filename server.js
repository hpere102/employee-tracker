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
        
    
            
    
  




    promptUser();




app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server now running on port ${PORT}`);
});
