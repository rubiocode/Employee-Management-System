DROP DATABASE IF EXISTS employee_mgmt_systemDB;

CREATE DATABASE employee_mgmt_systemDB;

USE employee_mgmt_systemDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    departmentName VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    departmentId INT,
    title VARCHAR(30),
    salary DECIMAL (10,2) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (departmentId) REFERENCES department
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    rolesId INT,
    managerId INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (rolesId) REFERENCES roles
);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

SELECT departmentName, title, salary
FROM roles
INNER JOIN department ON roles.departmentId = department.id;

SELECT title, salary, firstName, lastName
FROM employee
INNER JOIN roles ON employee.rolesId = roles.id;  


