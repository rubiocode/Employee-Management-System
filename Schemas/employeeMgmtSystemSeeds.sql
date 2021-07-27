-- Drops the employee_mgmt_systemDB if it already exists --
DROP DATABASE IF EXISTS employee_mgmt_systemDB;

-- Creates the employee_mgmt_systemDB --
CREATE DATABASE employee_mgmt_systemDB;

-- Selecting correct db --
USE employee_mgmt_systemDB;


-- Creating department table -- 
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    departmentName VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);


-- Creating roles table --
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    departmentId INT,
    title VARCHAR(30),
    salary DECIMAL (10,2) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (departmentId) REFERENCES department
);


-- Creating employee table --
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    rolesId INT,
    managerId INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (rolesId) REFERENCES roles
);


-- Selecting tables --
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;


-- Joining certain shared columns in each table --
SELECT departmentName, title, salary
FROM roles
INNER JOIN department ON roles.departmentId = department.id;

SELECT title, salary, firstName, lastName
FROM employee
INNER JOIN roles ON employee.rolesId = roles.id;  


