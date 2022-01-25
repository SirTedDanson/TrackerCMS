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
// READ: Find id of data selection
const idFinder = (data, column, table) => {
  return db.promise().query(`SELECT id FROM ${table} WHERE ${column} = "${data.choice}"`)
    .then(([rows, fields]) => {
      const id = rows[0];
      const newRole = {...id, ...data};
      return (newRole);
 })
};

// READ: Returns array of all department names
const departmentNames = () => {
  return db.promise().query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      const departments = (rows.map(({ name }) => name));
      return departments;
 })
};
// READ: Returns array of all employee roles
const employeeRoles = () => {
  return db.promise().query(`SELECT * FROM role`)
    .then(([rows, fields]) => {
      const roles = (rows.map(({ title }) => title));
      return roles;
 })
};
// READ: Returns array of all employees
const employeeList = (roles) => {
  return db.promise().query(`SELECT id, first_name, last_name FROM employee`)
  .then(([rows, fields]) => {
    const employees = rows.map(({ id, first_name, last_name }) => (id +" "+ first_name +" "+ last_name));
    return({employees, roles});
})
};

// READ: View all departments
const viewDepartments = () => {
  return db.promise().query(`SELECT * FROM department`)
    .then(([rows, fields]) => {
      console.log(rows);
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
const addRole = (department, name, salary) => {
  console.log(department, name, salary);
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
const addEmployee = (id, firstName, lastName) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
  const params = [`${firstName}`, `${lastName}`, `${id}`, null]; //body.first_name, body.last_name, body.role_id, body.manager_id
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
};

// UPDATE: Update an employee role
const updateRole = (roleId, employeeId) => {
  const sql = 
    `
    UPDATE employee SET role_id = ?
    WHERE id = ?;
    `;
  const params = [`${roleId}`, `${employeeId}`]; //req.body.role_id, req.params.id
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.log(rows);
  });
};

// UPDATE: Update an employee role
const updateRole = () => {
  const sql = 
    `
    UPDATE employee SET role_id = ?
    WHERE id = ?;
    `;
  const params = ['10', '4']; //req.body.role_id, req.params.id
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
  idFinder,
  employeeRoles,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
  employeeList
};