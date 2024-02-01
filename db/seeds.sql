INSERT INTO department(name)
VALUES ("HR"), ("Sales"), ("Accounting"), ("Legal");
SELECT * FROM department;

INSERT INTO role(title, salary, department_id)
VALUES ("Sales Director", 95000, 2), ("Salesperson", 70000, 2),
("Account Manager", 125000, 3), ("Accountant", 88000, 3),
("Legal Operations Manager", 230000, 4), ("Paralegal", 150000, 4),
("HR Director", 80000, 1), ("HR Generalist", 63000, 1);