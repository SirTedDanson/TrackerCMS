const mysql = require('mysql2');

// SQL CONNECTION: Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'V&LVt*Qjp5d]7yp',
    database: 'employeedb'
  },
  console.log('Connected to the employee database.')
);

// READ: Array of all departmen tnames
const departmentNames = () => {
  return db.promise().query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      const departments = (rows.map(({ name }) => name))
      return departments;
 })
};

// READ: Return an object containing the data from the user created role
const createRoleInfo = (selection) => {
  return db.promise().query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      const departmentId = (rows.filter(({ name }) => name === selection.department).map(({ id }) => id)[0])
      const roleName = selection.name;
      const roleSalary = selection.salary;
      return({roleName, roleSalary, departmentId});
    })
};

// READ: View all departments
const viewDepartments = () => {
  return db.promise().query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      console.log(rows)
    })
};

// READ: View all roles
const viewRoles = () => {
  db.query(
    `SELECT
      role.id, role.title AS role, role.salary, department.name AS department_name
    FROM role
    LEFT JOIN department ON role.department_id = department.id;
    `, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
};
// READ: View all employees
const viewEmployees = () => {
  db.query(
    `SELECT 
    employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, employee.manager_id AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id;
    `, (err, rows) => {
    if (err) {
      FF
      console.log(err);
    }
    console.log(rows);
  });
};

// CREATE: Add a department
const addDepartment = (name) => {
  const sql = `INSERT INTO department (name)
    VALUES (?)`;
  const params = [name]; //body.name
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
};
// CREATE: Add a role
const addRole = (name, salary, department) => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
  const params = [name, salary, department]; //body.title, body.salary, body.department_id
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
};

// CREATE: Add a employee
const addEmployee = () => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
  const params = ['Tom', 'Williams', '8', '2']; //body.first_name, body.last_name, body.role_id, body.manager_id
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
};

module.exports = {
  viewDepartments,
  departmentNames,
  createRoleInfo,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee
}