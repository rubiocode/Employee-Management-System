<div align="center">

# Employee Management System    

Built with Node.js and MySQL

URL of the GitHub repository: https://github.com/rubiocode/Employee-Management-System

</div>

## Table of Contents 

* [Description](#description)
  * [User Story](#user-story)
  * [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Usage](#usage)
* [Built With](#built-with)
* [License](#license)

## Description

This command line application allows the user to view and interact with information stored in their database. The user can easily add, delete, and update departments, roles, and employees in their company.

### User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

### Acceptance Criteria

Design the following database schema containing three tables:

![Database Schema](Assets/img/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

## Installation 

To start using this _Employee Management System_ application you must follow these instructions:

* Fork and clone this repository and save it to your computer. For help how to fork and clone click [here](https://guides.github.com/activities/forking/) 

In order for the application to run properly make sure you have the following dependencies downloaded in your terminal:

* [Node.js](https://nodejs.org/en/download/)

* [MySQL](https://www.npmjs.com/package/mysql)

* [MySQL Workbench](https://www.mysql.com/products/workbench/)

* [Inquirer](https://www.npmjs.com/package/inquirer)

* Not required for main app functioning but used to style terminal: [Figlet](https://www.npmjs.com/package/figlet)

To install the dependencies, run the following command:
```
npm i
```

Once you have downloaded all dependencies make sure to invoke node.js, using the following command

```
node index.js
``` 

to get the prompts to populate. 
**Important: make sure you are in the same folder where 'index.js' is located when running this command.**
## Usage

Using this application, the user is able to do the following:
* Add departments, roles, employees 
* View departments, roles, employees 
* Update employee roles   
* Delete departments and roles  

Before running the command below, the [employeeMgmtSystemSeeds.sql](https://github.com/rubiocode/Employee-Management-System/blob/main/Schemas/employeeMgmtSystemSeeds.sql) script should be executed in [MySQL Workbench](https://www.mysql.com/products/workbench/) in order for the user to connect to the database. 

The application will be invoked with the following command:
```
node index.js
```

This [video](https://drive.google.com/file/d/1C1AnbC_v3KbKTbk8FiMxdCincfLcj-CL/view) demonstrates application functionality.

## Built With

* [Figlet](https://www.npmjs.com/package/figlet) - FIGlet is a program that creates large characters out of ordinary screen terminal.
* [Inquirer](https://www.npmjs.com/package/inquirer) - A collection of common interactive commands line user interfaces.
* [Node.js](https://nodejs.dev/learn/) - Node.js is an open-source, low-level, back-end JavaScript runtime platform that uses asynchronous programming and is a popular tool for almost any kind of project!. 
* [MySQL](https://www.mysql.com/) - MySQL is an open-source relational database management system based on SQL – Structured Query Language.
* [MySQL Workbench](https://www.mysql.com/products/workbench/) - MySQL Workbench enables a DBA, developer, or data architect to visually design, model, generate, and manage databases.

## License

Copyright 2021 Rubidia Rubio

Licensed under the [MIT License](https://opensource.org/licenses/MIT)