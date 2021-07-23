const inquirer = require('inquirer');

const connection = require('./Connection/employeeMgmtSystemConnection');

const table = require ('console.table');

const figlet = require('figlet');


figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

connection.connect(async (err)=>{
    if (err) throw err;

    try {
        const userOptions = await inquirer.prompt ([
            {
                name: 'startMenu',
                type: 'list',
                message: 'Welcome, please select an item to continue',
                choices: [
                    new inquirer.Separator('───────────────────── Add ──────────────────────'),
                    'Add Department',
                    'Add Employee',
                    'Add Role',
                    new inquirer.Separator('──────────────────── Delete ────────────────────'),
                    'Delete Department',
                    'Delete Employee',
                    'Delete Role',
                    new inquirer.Separator('───────────────────── View ─────────────────────'),
                    'View All Departments',
                    'View All Employees',
                    'View All Roles',
                    'View Employees by Manager',
                    'View Department\'s Utilized Budget',
                    new inquirer.Separator('──────────────────── Update ────────────────────'),
                    'Update Employee Manager',
                    'Update Employee Role',
                    new inquirer.Separator('───────────────────── Exit ─────────────────────'),
                    'Exit Node.js'
                ],
            },
        ]);

        selectedItem(userOptions.startMenu);
    } catch (e) {
        console.log(e);   
    };
});

    const selectedItem = async (userSelection) => {
    if (userSelection === 'Add Department'){
        addDepartment();
    };
    if (userSelection === 'Add Employee'){
        addEmployee();
    };
    if (userSelection === 'Add Role'){
        addRole();
    };
    if (userSelection === 'Delete Department'){
        deleteDepartment();
    };
    /*if (userSelection === 'Delete Employee'){
        deleteEmployee();
    };
    if (userSelection === 'Delete Role'){
        deleteRole();
    };
    if (userSelection === 'View All Departments'){
        viewDepartment();
    };
    if (userSelection === 'View All Employees'){
        viewEmployee();
    };
    if (userSelection === 'View All Roles'){
        viewRoles();
    };
    if (userSelection === 'View Employees by Manager'){
        viewEmployeeByManager();
    };
    if (userSelection === 'View Department\'s Utilized Budget'){
        viewTotalUsedBudget();
    };
    if (userSelection === 'Update Employee Role'){
        updateRole();
    };
    if (userSelection === 'Update Employee Manager'){
        updateManager();
    };
    if (userSelection === 'Exit Node.js'){
        exitMenu();
    }*/
};

const addDepartment = async ()=> {
    try {
        const  userResponse = await inquirer.prompt ([
            {
                name: 'department',
                type: 'input',
                message: 'What is the name of the deparment?',
            },
        ]);
        
        const query = `INSERT INTO department VALUES ('${userResponse.department}')`;

        connection.query(query, userResponse, (err, result)=>{
            if (err) throw err;
            console.log('YOUR ADDED DEPARTMENT IS', result);
            connection.end();
        })

    } catch (e) {
        connection.end();
    }
}

const addEmployee = async ()=>{
    try {

        const {firstName, lastName, rolesId, managerId} = await inquirer.prompt ([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of the employee?',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of the employee?',
            },
            {
                name: 'rolesId',
                type: 'list',
                message: 'What is the employee\'s title?',
                choices: [
                    {name: 'Accountant', value: 1},
                    {name: 'Software Engineer', value: 2},
                    {name: 'Lawyer', value: 3},
                    {name: 'Lead Engineer', value: 4},
                    {name: 'Legal Team Lead', value: 5},
                    {name: 'Sales Leader', value: 6},
                    {name: 'Salesperson', value: 7},
                ]
            },
            {
                name: 'managerId',
                type: 'list',
                message: 'What is the name of the employee\'s manager?',
                choices: [
                    {name: 'Ashley Rodriguez', value: 8},
                    {name: 'John Doe', value: 9},
                    {name: 'Sarah Lourd', value: 10},
                    {name: 'none', value: null},
                ]
            },
        ]);

        const query = 'INSERT INTO employee (firstName, lastName, rolesId, managerId) VALUES (?, ?, ?, ?)';

        connection.query (query, [firstName, lastName, rolesId, managerId], (err, result)=>{
            if (err) throw err;
            console.log(`${firstName} ${lastName} was successfully added to the database`, result);
            connection.end();
            
        });

    } catch (e) {
        connection.end();
    }
};

const addRole = async () => {
    try {
        const {title, salary} = await inquirer.prompt ([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the role you would like to add?',
            },
            {
                name: 'salary',
                type: 'number',
                message: 'Enter the salary for this role?',
            },
        ]);

        const query = 'INSERT INTO roles (title, salary) VALUES (?, ?)';

        connection.query (query, [title, parseFloat(salary)], (err, result)=>{
            if (err) throw err;
            console.log(`the role ${title} with a salary of ${salary} has been successfully added to the database`, result);
            connection.end();
        })
    } catch (e) {
        connection.end();
    }
}

const deleteDepartment = () => {
    connection.query('SELECT departmentName FROM department', async (err, names) => {
        if (err) throw err;

        try {
            const departmentToDelete = await inquirer.prompt ([
                {
                    name: 'departmentName',
                    type: 'list',
                    message: 'Which department would you like to delete?',
                    choices: names.map (departmentName => departmentName.departmentName),
                }
            ]);

            connection.query('DELETE FROM department WHERE departmentName = ?', departmentToDelete.departmentName, (err, result) => {
                if (err) throw err;
                console.log(`the department ${departmentName} has been successfully deleted from database`, result);
                connection.end();
            });
        } catch (e) {
            connection.end();
        }
    })
}