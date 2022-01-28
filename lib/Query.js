const db = require('../config/connection');

class Query {

  // READ: View all departments
  viewDepartments() {
    return db.promise().query(`SELECT id 'ID', name 'Department' FROM department`)
      .then(([rows, fields]) => {
        return rows;
      });
  };

  // READ: View all departments
  viewRoles() {
    return db.promise().query(`
      SELECT role.id 'ID', role.title AS Title, role.salary 'Salary', department.name 'Department'
      FROM role
      LEFT JOIN department ON role.department_id = department.id;
      `)
      .then(([rows, fields]) => {
        return rows;
      });
  };

  // READ: View all departments
  viewEmployees(roles) {
    return db.promise().query(`
      SELECT e.id 'ID', e.first_name AS 'First_Name', e.last_name AS 'Last_Name', role.title 'Title', department.name 'Department', role.salary 'Salary', CONCAT(m.first_name," ", m.last_name) AS Manager 
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department on role.department_id = department.id
      LEFT JOIN employee m ON (e.manager_id = m.id);
      `)
      .then(([rows, fields]) => {
        if (!roles) {
          return rows;
        }
        return ({roles, rows});
      });
  };

  // READ: View all managers
  viewManagers () {
    return db.promise().query(`
      SELECT e.id as ID, CONCAT(e.first_name," ", e.last_name) AS Manager, department.name AS Department 
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department on role.department_id = department.id
      LEFT JOIN employee m ON (e.manager_id = m.id)
      WHERE role.title = "Manager";
      `)
      .then(([rows, fields]) => {
        return (rows);
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
  addEmployee(firstName, lastName, roleId, managerId) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [firstName, lastName, roleId, managerId];
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

module.exports = Query;