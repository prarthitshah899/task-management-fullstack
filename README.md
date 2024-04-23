# FullStack Tutorial

In this fullstack tutorial, I will implement a simple CRUD App, including:

- A [Frontend](https://jiangyiqun.github.io/fullstack_tutorial/) using [JavaScript(React)](https://reactjs.org/)
- A [Backend](./docs/README.md) using [Python(Flask)](https://flask.palletsprojects.com/en/1.1.x/)

This CRUD App can manipulate a database which resides in MongoDB

## Implementation

One of the fancy part of web app is that it is separated by layers.

- The top layer is [frontend](./task-management-frontend), which utilizes the [APIs](./task-management-backend) provided by backend. When implementing [frontend](./task-management-frontend), we can assume that all the [APIs](./task-management-backend) has already been implemented.
- The bottom layer is [Backend layer](./task-management-backend), which includes the implementation of manipulating database. I have provided a few implementations, they all have the same function interface.

You may start from any layer you prefer. If not sure, I recommend you to look at [APIs] first.
