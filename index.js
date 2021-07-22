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
                message: 'Welcome, please select and item to continue',
                choices: [
                    'Department',
                    'Employee',
                    'Roles',
                    'Budget',
                ],
            },
        ]);

        selectedItem(userOptions.startMenu);
    } catch (e) {
        console.log(e);   
    };
});

const selectedItem = async (userSelection) => {
    if (userSelection === 'Department'){

    };
    if (userSelection === 'Employee'){

    };
    if (userSelection === 'Roles'){

    };
    if (userSelection === 'Budget'){

    };

}