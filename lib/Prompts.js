const inquirer = require('inquirer');

class Prompt {
  departmentPrompt () {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `Enter the name of the department you would to add?`,
          validate: department => {
            if (department) {
              return true;
            } else {
              console.log(`Please enter a department!`);
              return false;
            }
          }
        }
      ])
  };

  rolePrompt (departments) {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `Enter the name of the role you would like to add:`,
          validate: role => {
            if (role) {
              return true;
            } else {
              console.log(`Please enter a role!`);
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'salary',
          message: `Enter the role's salary:`,
          validate: role => {
            if (role) {
              return true;
            } else {
              console.log(`Please enter a role salary!`);
              return false;
            }
          }
        },
        {
          type: 'list',
          name: 'choice',
          message: `What department is the role associated with?`,
          choices: departments
        },
      ])
  };

  employeePrompt (roles, managers) {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: `Enter the first name of the new employee:`,
          validate: role => {
            if (role) {
              return true;
            } else {
              console.log(`Please enter a first name!`);
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'lastName',
          message: `Enter the last name of the new employee:`,
          validate: role => {
            if (role) {
              return true;
            } else {
              console.log(`Please enter a last name!`);
              return false;
            }
          }
        },
        {
          type: 'list',
          name: 'role',
          message: `What is the role of the new employee?`,
          choices: roles
        },
        {
          type: 'list',
          name: 'manager',
          message: `Who is the manager of the new employee?`,
          choices: managers
        },
      ])
  };

  updatePrompt (roles, employees) {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee',
          message: `Which employee would you like to update?`,
          choices: employees
        },
        {
          type: 'list',
          name: 'role',
          message: `What role would you like to apply to this employee?`,
          choices: roles
        },
      ])
  };
};

module.exports = Prompt;