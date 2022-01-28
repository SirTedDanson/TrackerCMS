const inquirer = require('inquirer');
const Query = require('./lib/Query');
const Prompts = require('./lib/Prompts');
const cTable = require('console.table');
const employeeDb = new Query;
const prompt = new Prompts;

// Starting menu
class Application {
  applicationStart() {
    console.log(`
    ======================================
    Initializing Employee Database Manager
    ======================================
              ================
              CTRL + C to EXIT
              ================
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
              'View Managers',
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
          .then(data => {
            return console.table(data);
          });
        break;
      case 'View Roles':
        await employeeDb.viewRoles()
          .then(data => {
            return console.table(data);
          });
        break;
      case 'View Employees':
        await employeeDb.viewEmployees()
          .then(data => {
            return console.table(data);
          });
        break;
      case 'View Managers':
        await employeeDb.viewManagers()
          .then(data => {
            return console.table(data);
          });
        break;
      case 'Add Department':
        await prompt.departmentPrompt()
          .then(department => {
            return employeeDb.addDepartment(department.name);
          })
        break;
      case 'Add Role':
        await employeeDb.viewDepartments()
          .then(data => {
            const departmentArray = data.map(({ ID, Department }) => (ID + ": " + Department));
            return prompt.rolePrompt(departmentArray)
          })
          .then(input => {
            const departmentId = input.choice.split(":", 1)[0];
            return employeeDb.addRole(departmentId, input.name, input.salary);
          })
        break;
      case 'Add Employee':
        await employeeDb.viewRoles()
          .then(data => {
            const managerArray = data.filter(data => data.Title === 'Manager').map(({ ID, Title, Department }) => (ID + ": " + Title + " " + "| " + Department));
            const roleArray = data.filter(data => data.Title !== 'Manager').map(({ ID, Title, Department }) => (ID + ": " + Title + " " + "| " + Department));
            return prompt.employeePrompt(roleArray, managerArray);
          })
          .then(input => {
            const roleId = input.role.split(":", 1)[0];
            const managerId = input.manager.split(":", 1)[0];
            return employeeDb.addEmployee(input.firstName, input.lastName, roleId, managerId);
          })
        break;
      case 'Update Employee Role':
        await employeeDb.viewRoles()
          .then(data => {
            return employeeDb.viewEmployees(data);
          })
          .then(data => {
            const roleArray = data.roles.filter(data => data.Title !== 'Manager').map(({ ID, Title, Department }) => (ID + ": " + Title + " " + "| " + Department));
            const employeeArray = data.rows.map(({ ID, First_Name, Last_Name }) => (ID + ": " + First_Name + " " + Last_Name));
            return prompt.updatePrompt(roleArray, employeeArray)
          })
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