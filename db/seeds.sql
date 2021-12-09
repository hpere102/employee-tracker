INSERT INTO departments (name)
VALUES 
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Software Engineer', 120000.00, 1),
('Lead Engineer', 150000.00, 1),
('Salesperson', 80000.00, 2),
('Account Manager', 160000.00, 3),
('Accountant', 125000.00, 3),
('Lawyer', 190000.00, 4),
('Legal Team Lead', 250000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Daniel', 'Allen', 1, NULL),
('Ellie', 'Mack', 5, NULL),
('Gary', 'Lile', 7, NULL),
('Aaron', 'Smith', 4, NULL),
('Sam', 'Leichler', 3, NULL),
('Amanda', 'Peck', 2, NULL),
('David', 'Summers', 6, NULL);
