const inquirer = require('inquirer');
const {
  viewDepartments,
  departmentNames,
  employeeRoles,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  idFinder,
  addEmployee,
  employeeList,
  updateRole } = require('../index');

// Starting menu
const applicationMenu = () => {

  console.log(`
======================================
Initializing Employee Database Manager
======================================
`);
  // initialize inqurirer to gather user input
  return inquirer
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
    ]);
};

const menuHandler = (selection) => {
  console.log(selection);
  switch (selection) {
    case 'View Department':
      viewDepartments();
      break;
    case 'View Roles':
      viewRoles();
      break;
    case 'View Employees':
      viewEmployees();
      break;
    case 'Add Department':
      departmentPrompt();
      break;
    case 'Add Role':
      departmentNames()
        .then(departments => rolePrompt(departments));
      break;
    case 'Add Employee':
      employeeRoles()
        .then(roles => employeePrompt(roles));
      break;
    case 'Update Employee Role':
      employeeRoles()
        .then(roles => employeeList(roles))
        .then(data => updatePrompt(data));
      break;
  }
};

const departmentPrompt = () => {
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
    .then(department => {
      return addDepartment(department.name);
    })
};

const rolePrompt = (departments) => {
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
    .then(selection => {
      const columnName = "name";
      const table = "department";
      return idFinder(selection, columnName, table);
    })
    .then(({ id, name, salary }) => {
      console.log(id, name, salary);
      return addRole(id, name, salary);
    })
};

const employeePrompt = (roles) => {
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
        name: 'choice',
        message: `What is the role of the new employee?`,
        choices: roles
      },
    ])
    .then(selection => {
      const columnName = "title";
      const table = "role";
      console.log(selection);
      return idFinder(selection, columnName, table);
    })
    .then(({ id, firstName, lastName }) => {
      console.log(id, firstName, lastName);
      return addEmployee(id, firstName, lastName);
    })
};

const updatePrompt = (data) => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee',
        message: `Which employee would you like to update?`,
        choices: data.employees
      },
      {
        type: 'list',
        name: 'choice',
        message: `What role would you like to apply to this employee?`,
        choices: data.roles
      },
    ])
    .then(selection => {
      const columnName = "title";
      const table = "role";
      return idFinder(selection, columnName, table);
    })
    .then(data => {
      return updateRole(data.id, data.employee.split(" ", 1)[0]);
    })
};

applicationMenu()
  .then(selection => {
    return menuHandler(selection.menu);
  })
  .catch(err => {
    console.log(err);
  });