const inquirer = require('inquirer');
const Database = require('./lib/Database');
const Prompts = require('./lib/Prompts');
const employeeDb = new Database;
const prompt = new Prompts;

// Starting menu
class Application {
  applicationStart() {
    console.log(`
    ======================================
    Initializing Employee Database Manager
    ======================================
    `);
    this.applicationMenu();
  }
  applicationMenu() {
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
      ]).then(selection => {
        this.menuHandler(selection.menu);
      })
  };


  menuHandler = async selection => {
      switch (selection) {
        case 'View Department':
          await employeeDb.viewDepartments()
          break;
        case 'View Roles':
          await employeeDb.viewRoles();
          break;
        case 'View Employees':
          await employeeDb.viewEmployees();
          break;
        case 'Add Department':
          await prompt.departmentPrompt()
            .then(department => {
              return employeeDb.addDepartment(department.name);
            })
          break;
        case 'Add Role':
          await employeeDb.departmentNames()
            .then(departments => prompt.rolePrompt(departments))
            .then(input => {
              const departmentId = input.choice.split(":", 1)[0];
              return employeeDb.addRole(departmentId, input.name, input.salary);
            })
          break;
        case 'Add Employee':
          await employeeDb.employeeRoles()
            .then(roles => prompt.employeePrompt(roles))
            .then(input => {
              const employeeId = input.choice.split(":", 1)[0];
              return employeeDb.addEmployee(employeeId, input.firstName, input.lastName);
            })
          break;
        case 'Update Employee Role':
          await employeeDb.employeeRoles()
            .then(roles => employeeDb.employeeList(roles))
            .then(data => prompt.updatePrompt(data))
            .then(input => {
              const employeeId = input.employee.split(":", 1)[0];
              const roleId = input.role.split(":", 1)[0];
              return employeeDb.updateRole(roleId, employeeId);
            })
          break;

      };
    this.applicationMenu();
  };
};

new Application().applicationStart();