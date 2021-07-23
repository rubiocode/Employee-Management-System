const inquirer = require('inquirer');

const connection = require('./Connection/employeeMgmtSystemConnection');

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
                    'Update Employee Role',
                    'Update Employee Manager',
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
    /*if (userSelection === 'Add Employee'){
        addEmployee();
    };
    if (userSelection === 'Add Role'){
        addRole();
    };
    if (userSelection === 'Delete Department'){
        deleteDepartment();
    };
    if (userSelection === 'Delete Employee'){
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
    
    } catch (e) {
    
    }
}

/*{
            name: 'addEmployeeFirst',
            type: 'input',
            message: 'What is the first name of the employee?',
        },
        {
            name: 'addEmployeeLast',
            type: 'input',
            message: 'What is the last name of the employee?',
        },
        {
            name: 'addManager',
            type: 'input',
            message: 'What is the name of the employee\'s manager?',
        },
        {
            name: 'addTitle',
            type: 'input',
            message: 'What is the employee\'s title?',
        },
        {
            name: 'addSalary',
            type: 'input',
            message: 'What is the employee\'s salary?',
        },

    ]);*/
    