# FullStack Tutorial

In this fullstack tutorial, I will implement a simple CRUD App, including:

- A [Frontend](https://jiangyiqun.github.io/fullstack_tutorial/) using [JavaScript(React)](https://reactjs.org/)
- A [Backend](./docs/README.md) using [Python(Flask)](https://flask.palletsprojects.com/en/1.1.x/)

This CRUD App can manipulate a database which resides in MongoDB

## Implementation

One of the fancy part of web app is that it is separated by layers.

- The 1st layer is [Frontend](./task-management-frontend), which utilizes the [APIs](./task-management-backend) provided by backend. When implementing [Frontend](./task-management-frontend), we can assume that all the [APIs](./task-management-backend) has already been implemented.

- The 2nd layer is [Backend layer](./task-management-backend), which includes the implementation of manipulating database. I have provided a few implementations, they all have the same function interface.

- The 3rd layer is [Databse layer](https://www.mongodb.com/), Which includes the implementation of 2 tables which we are using in this project and those are tasks and users table.

You may start from any layer you prefer. If not sure, I recommend you to look at [APIs](./task-management-backend) first.
