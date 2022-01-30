const inquirer = require('inquirer');

// Prompt class for initiating user input prompts
class Prompt {
  // CREATE: ADD department prompt
  departmentPrompt() {
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
  // CREATE: ADD role prompt
  rolePrompt(departments) {
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
            if (isNaN(role)) {
              console.log(' Must be a number only!');
              return false;
            } else if (!role) {
              console.log(`Please enter a role salary!`);
              return false;
            } else {
              return true;
            }
          }
        },
        {
          type: 'list',
          name: 'choice',
          message: `What department is the role associated with?`,
          choices: departments // List formulated by a DB query
        },
      ])
  };
  // CREATE: Add employee prompt
  employeePrompt(roles, managers) {
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
          choices: roles // List formulated by a DB query
        },
        {
          type: 'list',
          name: 'manager',
          message: `Who is the manager of the new employee?`,
          choices: managers // List formulated by a DB query
        },
      ])
  };
  // UPDATE: Update department prompt
  updateEmployee(roles, employees) {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee',
          message: `Which employee would you like to update?`,
          choices: employees // List formulated by a DB query
        },
        {
          type: 'list',
          name: 'role',
          message: `What role would you like to apply to this employee?`,
          choices: roles // List formulated by a DB query
        }, 
      ])
  };
  // UPDATE: Update manager prompt
  updateManager(managers, employees) {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee',
          message: `Which employee would you like to update?`,
          choices: employees // List formulated by a DB query
        },
        {
          type: 'list',
          name: 'manager',
          message: `What role would you like to apply to this employee?`,
          choices: managers // List formulated by a DB query
        },
      ])
  };
  // DELETE: Remove employee prompt
  deleteEmp(employees) {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee',
          message: `Which employee would you like to remove?`,
          choices: employees // List formulated by a DB query
        }
      ])
  };
  // DELETE: Remove role prompt
  deleteRole(roles) {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'role',
          message: `Which role would you like to remove?`,
          choices: roles // List formulated by a DB query
        }
      ])
  };
  // DELETE: Remove deptartment prompt
  deleteDept(roles) {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'role',
          message: `Which department would you like to remove?`,
          choices: roles // List formulated by a DB query
        }
      ])
  };
};

module.exports = Prompt;