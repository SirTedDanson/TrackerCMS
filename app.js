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
              'View Managers',
              'View Employees by ID',
              'View Employees by Manager',
              'View Employees by Department',
              'Add Department',
              'Add Role',
              'Add Employee',
              'Update Employee Role',
              'Update Employee Manager',
              'Delete Employee',
              'Delete Role',
              'Delete Department'
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
      case 'View Managers':
        await employeeDb.viewManagers()
          .then(data => {
            return console.table(data);
          });
        break;
      case 'View Employees by ID':
        await employeeDb.viewEmpsId()
          .then(data => {
            return console.table(data);
          });
        break;
      case 'View Employees by Manager':
        await employeeDb.viewEmpsManager()
          .then(data => {
            return console.table(data);
          });
        break;
      case 'View Employees by Department':
        await employeeDb.viewEmpsDept()
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
            const deptArray = data.map(({ ID, Department }) => (ID + ": " + Department));
            return prompt.rolePrompt(deptArray)
          })
          .then(input => {
            const deptId = input.choice.split(":", 1)[0];
            return employeeDb.addRole(deptId, input.name, input.salary);
          })
        break;
      case 'Add Employee':
        await employeeDb.viewRoles()
          .then(data => {
            const managerArray = data.filter(data => data.Title === 'Manager').map(({ ID, Title, Department }) => (ID + ": " + Title + " " + "| " + Department));
            const roleArray = data.filter(data => data.Title !== 'Manager').map(({ ID, Title, Department }) => (ID + ": " + Title + " " + "| " + Department));
            return prompt.employeePrompt(roleArray, managerArray.push(null));
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
            return employeeDb.viewEmpsId(data);
          })
          .then(data => {
            const roleArray = data.promiseData.map(({ ID, Title, Department }) => (ID + ": " + Title + " " + "| " + Department));
            const employeeArray = data.rows.map(({ ID, First_Name, Last_Name }) => (ID + ": " + First_Name + " " + Last_Name));
            return prompt.updateEmployee(roleArray, employeeArray)
          })
          .then(input => {
            const employeeId = input.employee.split(":", 1)[0];
            const roleId = input.role.split(":", 1)[0];
            return employeeDb.updateRole(roleId, employeeId);
          })
        break;
      case 'Update Employee Manager':
        await employeeDb.viewManagers()
          .then(data => {
            return employeeDb.viewEmpsId(data);
          })
          .then(data => {
            const managerArray = data.promiseData.map(({ ID, Manager, Department }) => (ID + ": " + Manager + " | " + Department));
            const employeeArray = data.rows.filter(data => data.Title !== 'Manager').map(({ ID, First_Name, Last_Name, Title }) => (ID + ": " + First_Name + " " + Last_Name + " | " + Title));
            return prompt.updateManager(managerArray, employeeArray);
          })
          .then(input => {
            const employeeId = input.employee.split(":", 1)[0];
            const managerId = input.manager.split(":", 1)[0];
            return employeeDb.updateManager(managerId, employeeId);
          })
        break;
      case 'Delete Employee':
        await employeeDb.viewEmpsId()
          .then(data => {
            const employeeArray = data.map(({ ID, First_Name, Last_Name, Title }) => (ID + ": " + First_Name + " " + Last_Name + " | " + Title));
            return prompt.deleteEmp(employeeArray);
          })
          .then(input => {
            return employeeDb.deleteEmp(input.employee.split(":", 1)[0]);
          })
        break;
      case 'Delete Role':
        await employeeDb.viewRoles()
          .then(data => {
            const roleArray = data.map(({ ID, Title, Department }) => (ID + ": " + Title + " " + "| " + Department));
            return prompt.deleteRole(roleArray);
          })
          .then(input => {
            return employeeDb.deleteRole(input.role.split(":", 1)[0]);
          })
        break;
      case 'Delete Department':
        await employeeDb.viewDepartments()
          .then(data => {
            const deptArray = data.map(({ ID, Department }) => (ID + ": " + Department));
            return prompt.deleteDept(deptArray);
          })
          .then(input => {
            return employeeDb.deleteDept(input.role.split(":", 1)[0]);
          })
        break;
    };
    this.applicationMenu();
  };
};

new Application().applicationStart();