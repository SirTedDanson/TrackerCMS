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

// READ: View all departments
const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
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
    if (err) {FF
      console.log(err);
    }
    console.log(rows);
  });
};

// CREATE: Add a department
const addDepartment = () => {
  const sql = `INSERT INTO department (name)
    VALUES (?)`;
  const params = ['Customer Service']; //body.name
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
};
// CREATE: Add a role
const addRole = () => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
  const params = ['Process Auditor', '78000', '1']; //body.title, body.salary, body.department_id
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