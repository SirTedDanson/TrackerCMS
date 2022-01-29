INSERT INTO department(name)
VALUES 
  ('Production'),
  ('Quality Assurance'),
  ('Safety'),
  ('Accounting'),
  ('Human Resources');

INSERT INTO role(title, salary, department_id)
VALUES
  ('Manager', '120000', 1), -- Production
  ('Manager', '100000', 2), -- QA
  ('Manager', '110000', 4), -- Accounting
  ('Manager', '110000', 5), -- Human Resources
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
  ('Administrative Assistant', '44000', 4),
  ('Administrative Assistant', '50000', 5);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
  ('Mia', 'Yang', 1), -- Production Manager
  ('Joanna', 'Smith', 5), -- Production
  ('Leonie', 'Green', 6), -- Production
  ('Ashley', 'Miller', 2), -- QA Manager
  ('Peter', 'White', 7), -- QA
  ('Bob', 'Lee', 8), -- QA
  ('Marty', 'Wood', 9), -- Safety (no manager)
  ('Angel', 'Hill', 10), -- Compliance (no manager)
  ('Sandra', 'Foster', 3), -- Accounting Manager
  ('Ruby', 'Clark', 12), -- Accounting
  ('Alfredo', 'Li', 13), -- Accounting
  ('Aleah', 'Ramirez', 16), -- Accounting, AA
  ('Campbell', 'Pena', 4), -- HR Manager
  ('Kai', 'Best', 14), -- HR
  ('Makenzie', 'Perez', 15), -- HR
  ('Noah', 'Harper', 17), -- HR, AA
  ('Lawrence', 'Stone', 11); -- Auditor (no manager)

-- Assign Production Manager
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 1 WHERE id = 3;
-- Assign QA Manager
UPDATE employee SET manager_id = 2 WHERE id = 5;
UPDATE employee SET manager_id = 2 WHERE id = 6;
-- Assign Accounting Manager
UPDATE employee SET manager_id = 4 WHERE id = 10;
UPDATE employee SET manager_id = 4 WHERE id = 11;
UPDATE employee SET manager_id = 4 WHERE id = 12;
-- Assign HR Manager
UPDATE employee SET manager_id = 5 WHERE id = 14;
UPDATE employee SET manager_id = 5 WHERE id = 15;
UPDATE employee SET manager_id = 5 WHERE id = 16;