-- FILE USED FOR TESTING SQL CALLS --
SELECT e.id, e.first_name 'First Name', e.last_name 'Last Name', role.title 'Job Title', department.name'Department', role.salary 'Salary', CONCAT(m.first_name," ", m.last_name) AS Manager 
FROM employee e
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN department on role.department_id = department.id
LEFT JOIN employee m ON (e.manager_id = m.id);

