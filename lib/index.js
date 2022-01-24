const inquirer = require('inquirer')

// App initialization message
const initializeApp = () => {
  console.log(`
======================================
Initializing Employee Database Manager
======================================
`);
  startingPrompt();
};

// Method for creating a new team member, creates a newTeamMember object from the lib/ classes
const startingPrompt = () => {
  // initialize inqurirer to gather user input, basic employee info
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu',
        message: 'Would you like to to do?',
        choices:
          [
            'View Department',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role'
          ]
      },
    ])
};

initializeApp();