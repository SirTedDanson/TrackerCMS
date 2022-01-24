const inquirer = require('inquirer')
const {
  viewDepartments,
  departmentNames,
  createRoleInfo,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee } = require('../index')

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
    ])
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
      employeePrompt();
      break;
    case 'Update Employee Role':
      updatePrompt();
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
}

const rolePrompt = (departments) => {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: `Enter the name of the role you would like to add.`,
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
        message: `Enter the role's salary.`,
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
        name: 'department',
        message: `What department is the role associated with?`,
        choices: departments
      },
    ])
    .then(selection => {
      return (createRoleInfo(selection));
    })
    .then((data) => {
      addRole(data.roleName, data.roleSalary, data.departmentId);
    })
};

applicationMenu()
  .then(selection => {
    return menuHandler(selection.menu);
  })
  .catch(err => {
    console.log(err);
  });