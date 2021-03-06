// Required Dependencies 
const inquirer = require('inquirer');

const connection = require('./Connection/employeeMgmtSystemConnection');

require('console.table');

const figlet = require('figlet');


// Stablishing initial connection
connection.connect(async (err) => {
    if (err) throw err;
    console.log(`Welcome to Employee Management System ${connection.threadId}\n`);
    start();

});


// Terminal styling (not needed for functionality of the main app)
figlet('Employee Tracker', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});


// Initianing user prompts, storing it in a function for multiple use 
const start = async () => {
    try {
        const userOptions = await inquirer.prompt([
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
                    //'Delete Employee',
                    'Delete Role',
                    new inquirer.Separator('───────────────────── View ─────────────────────'),
                    'View All Departments',
                    'View All Employees',
                    'View All Roles',
                    //'View Employees by Manager',
                    //'View Department\'s Utilized Budget',
                    new inquirer.Separator('──────────────────── Update ────────────────────'),
                    //'Update Employee Manager',
                    'Update Employee Role',
                    new inquirer.Separator('───────────────────── Exit ─────────────────────'),
                    'Exit Menu'
                ],
            },
        ]);

        selectedItem(userOptions.startMenu);
    } catch (e) {
        console.log(e);
    };
};


// Using IF statement block to move through user selection options in prompts. 
const selectedItem = async (userSelection) => {
    if (userSelection === 'Add Department') {
        addDepartment();
    };
    if (userSelection === 'Add Employee') {
        addEmployee();
    };
    if (userSelection === 'Add Role') {
        addRole();
    };
    if (userSelection === 'Delete Department') {
        deleteDepartment();
    };
    if (userSelection === 'Delete Role') {
        deleteRole();
    };
    if (userSelection === 'View All Departments') {
        viewDepartment();
    };
    if (userSelection === 'View All Employees') {
        viewEmployee();
    };
    if (userSelection === 'View All Roles') {
        viewRoles();
    };
    if (userSelection === 'Update Employee Role') {
        updateRole();
    };
    if (userSelection === 'Exit Node.js') {
        process.exit();
    }
};


// *************************Add functions*****************************

// Add department async function 
const addDepartment = async () => {
    try {
        const { departmentName } = await inquirer.prompt([
            {
                name: 'departmentName',
                type: 'input',
                message: 'What is the name of the deparment?',
            },
        ]);
        const query = `INSERT INTO department (departmentName) VALUES (?)`;

        connection.query(query, [departmentName], (err, result) => {
            if (err) throw err;
            console.log(`${departmentName} has been successfully added to the database`, result);
        });

        start();

    } catch (e) {

        console.log(e);
        connection.end();
    }
}

//Add employee async function 
const addEmployee = async () => {

    connection.query(`SELECT title, id FROM roles`, async (err, positions) => {
        if (err) throw err;
        try {

            const { firstName, lastName, rolesId, managerId } = await inquirer.prompt([
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
                        { name: 'Accountant', value: 1 },
                        { name: 'Software Engineer', value: 2 },
                        { name: 'Lawyer', value: 3 },
                        { name: 'Lead Engineer', value: 4 },
                        { name: 'Legal Team Lead', value: 5 },
                        { name: 'Sales Leader', value: 6 },
                        { name: 'Salesperson', value: 7 },
                    ]
                },
                {
                    name: 'managerId',
                    type: 'list',
                    message: 'What is the name of the employee\'s manager?',
                    choices: [
                        { name: 'Ashley Rodriguez', value: 8 },
                        { name: 'John Doe', value: 9 },
                        { name: 'Sarah Lourd', value: 10 },
                        { name: 'none', value: null },
                    ]
                },
            ]);

            const query = 'INSERT INTO employee (firstName, lastName, rolesId, managerId) VALUES (?, ?, ?, ?)';

            connection.query(query, [firstName, lastName, rolesId, managerId], (err, result) => {
                if (err) throw err;
                console.log(`${firstName} ${lastName} was successfully added to the database`, result);

            });

            start();

        } catch (e) {

            console.log(e);

            connection.end();
        }

    })
};


// Add role function 
const addRole = async () => {

    try {
        const { title, salary } = await inquirer.prompt([
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

        connection.query(query, [title, parseFloat(salary)], (err, result) => {
            if (err) throw err;
            console.log(`the role ${title} with a salary of ${salary} has been successfully added to the database`, result);

            start();
        });

    } catch (e) {
        console.log(e);
        connection.end();
    }
};

// *************************Bonus: Delete Functions *****************************

// Delete department function 
const deleteDepartment = () => {
    connection.query('SELECT departmentName FROM department', async (err, names) => {
        if (err) throw err;

        try {
            const departmentToDelete = await inquirer.prompt([
                {
                    name: 'departmentName',
                    type: 'list',
                    message: 'Which department would you like to delete?',
                    choices: names.map(departmentName => departmentName.departmentName),
                }
            ]);

            connection.query('DELETE FROM department WHERE departmentName = ?', departmentToDelete.departmentName, (err, result) => {
                if (err) throw err;
                console.log(`the department ${departmentToDelete} has been successfully deleted from database`, result);

            });

            start();

        } catch (e) {
            console.log(e);
            connection.end();
        }
    })
};

// Delete role function 
const deleteRole = () => {
    connection.query('SELECT title FROM roles', async (err, roles) => {
        if (err) throw err;

        try {
            const roleToDelete = await inquirer.prompt([
                {
                    name: 'title',
                    type: 'list',
                    message: 'Which role would you like to delete?',
                    choices: roles.map(roles => roles.title),
                }
            ]);

            connection.query('DELETE FROM roles WHERE title = ?', roleToDelete.title, (err, result) => {
                if (err) throw err;
                console.log(`the role ${roleToDelete} has been successfully deleted from database`, result);

            });

            start();

        } catch (e) {
            console.log(e);
            connection.end();
        }
    })
};


// *************************View functions*****************************

//View department function 
const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, department) => {
        if (err) throw err;
        console.table(department);

        start();
    });
};


// View employee function 
const viewEmployee = () => {
    connection.query('SELECT * FROM employee', (err, employee) => {
        if (err) throw err;
        console.table(employee);

        start();
    });
};


//View roles function
const viewRoles = () => {
    connection.query('SELECT * FROM roles', (err, roles) => {
        if (err) throw err;
        console.table(roles);

        start();
    });
};


// *************************Updating function *****************************

//Update employee role async function 
const updateRole = async () => {

    try {

        connection.query('SELECT title, id FROM roles', (err, roles) => {
            if (err) throw err;

            console.table(roles);
            roles = roles.map(row => {
                console.log(row)
                const presentRole = { name: row.title, value: row.id };
                return presentRole;
            });
            console.log(roles);
            connection.query('SELECT id, firstName, lastName FROM employee', (err, employee) => {

                if (err) throw err;

                employee = employee.map(each => {
                    return `${each.id} ${each.firstName} ${each.lastName}`
                });

                inquirer.prompt([
                    {
                        name: 'employeeChoice',
                        type: 'list',
                        message: 'Select the employee you would like to update',
                        choices: employee,
                    },
                    {
                        name: 'updatedRole',
                        type: 'list',
                        message: 'Select new role for this employee',
                        choices: roles,
                    }
                ])
                    .then(answer => {

                        const employeeId = answer.employeeChoice[0].split(' ');
                        const query = (`UPDATE employee SET rolesId = ${answer.updatedRole} WHERE id =${employeeId[0]}`);

                        connection.query(query, (err, result) => {
                            if (err) throw err;
                            console.log(`Employee ${answer.employeeChoice} was successfully updated in the database`, result);
                        })

                        start();
                    });
            });
        });
    } catch (e) {

        console.log(e);
        connection.end();
    };
};
