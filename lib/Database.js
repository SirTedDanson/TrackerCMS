const db = require('../db/connection');

class Database {

  // READ: Returns array of all department names
  departmentNames() {
    return db.promise().query(`SELECT id, name FROM department`)
      .then(([rows, fields]) => {
        const departments = (rows.map(({ id, name }) => (id + ": " + name)));
        return departments;
      });
  };
  // READ: Returns array of all employee roles
  employeeRoles() {
    return db.promise().query(`SELECT id, title FROM role`)
      .then(([rows, fields]) => {
        const roles = (rows.map(({ id, title }) => (id + ": " + title)));
        return roles;
      });
  };
  // READ: Returns array of all employees
  employeeList(roles) {
    return db.promise().query(`SELECT id, first_name, last_name FROM employee`)
      .then(([rows, fields]) => {
        const employees = rows.map(({ id, first_name, last_name }) => (id + ": " + first_name + " " + last_name));
        return ({ employees, roles });
      });
  };

  // READ: View all departments
  viewDepartments() {
    return db.promise().query(`SELECT * FROM department`)
      .then(([rows, fields]) => {
        console.log(rows);
      });
  };

  // READ: View all departments
  viewRoles() {
    return db.promise().query(`
      SELECT role.id, role.title AS role, role.salary, department.name AS department_name
      FROM role
      LEFT JOIN department ON role.department_id = department.id;
      `)
      .then(([rows, fields]) => {
        console.log(rows);
      });
  };

  // READ: View all departments
  viewEmployees() {
    return db.promise().query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, role.salary, employee.manager_id AS manager
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id;
      `)
      .then(([rows, fields]) => {
        console.log(rows);
      });
  };

  // CREATE: Add a department
  addDepartment(name) {
    const sql = `INSERT INTO department (name)
      VALUES (?)`;
    const params = [name];
    return db.promise().query(sql, params)
      .then(([rows, fields]) => {
        console.log(`Added ${name} to the database`);
      });
  };
  // CREATE: Add a role
  addRole(department, name, salary) {
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [name, salary, department];
    return db.promise().query(sql, params)
      .then(([rows, fields]) => {
        console.log(`Added ${name} to the database`);
      });
  };

  // CREATE: Add a employee
  addEmployee(id, firstName, lastName) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [firstName, lastName, id, null]; //body.first_name, body.last_name, body.role_id, body.manager_id
    return db.promise().query(sql, params)
      .then(([rows, fields]) => {
        console.log(`Added ${firstName} ${lastName} to the database`);
      });
  };

  // UPDATE: Update an employee role
  updateRole(roleId, employeeId) {
    const sql =
      `
    UPDATE employee SET role_id = ?
    WHERE id = ?;
    `;
    const params = [roleId, employeeId];
    return db.promise().query(sql, params)
      .then(([rows, fields]) => {
        console.log(`Employee role updated`);
      });
  };
}

module.exports = Database;