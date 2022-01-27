INSERT INTO department(name)
VALUES 
  ('Production'),
  ('Quality Assurance'),
  ('Safety'),
  ('Accounting'),
  ('Human Resources');

INSERT INTO role(title, salary, department_id)
VALUES
  ('Manager', '120000', 1),
  ('Manager', '100000', 2),
  ('Manager', '110000', 3),
  ('Manager', '900000', 5),
  ('Production Lead', '80000', 1),
  ('Production Associate', '60000', 1),
  ('QA Lead', '60000', 2),
  ('QA Technician', '48000', 2),
  ('Safety Coordinator', '68000', 3),
  ('Compliance Officer', '65000', 3),
  ('Auditor', '80000', 4),
  ('Budget Analyst', '70000', 4),
  ('Tax Accountant', '85000', 4),
  ('Human Resources Coordinator', '70000', 5),
  ('Employment Specialist', '60000', 5),
  ('Administrative Assistant', '44000', 3),
  ('Administrative Assistant', '51000', 4),
  ('Administrative Assistant', '50000', 5);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
  ('Mia', 'Yang', 4),
  ('Joanna', 'Smith', 12),
  ('Leonie', 'Green', 9),
  ('Ashley', 'Miller', 15),
  ('Peter', 'White', 7),
  ('Bob', 'Lee', 1),
  ('Marty', 'Wood', 17),
  ('Angel', 'Hill', 11),
  ('Sandra', 'Foster', 10),
  ('Ruby', 'Clark', 8);

UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 1 WHERE id = 3;
UPDATE employee SET manager_id = 1 WHERE id = 4;

UPDATE employee SET manager_id = 6 WHERE id = 7;
UPDATE employee SET manager_id = 6 WHERE id = 8;
UPDATE employee SET manager_id = 6 WHERE id = 9;
UPDATE employee SET manager_id = 6 WHERE id = 10;