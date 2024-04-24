# Backend for task-management application

The Backend is written in Python-flask :sunglasses:, please follow the below steps

## [1] Create a Virtual Environment for the Project Below is the command for the same

```shell
python -m venv pesto_tech          # create python environment
source ./pesto_tech/bin/activate    # activate python environment
```

## [2] Install all the dependencies for the project from requirements file

```shell
python -m pip install -r requirement.txt
```

## [3] Now you have to add the .env file at the app.py file level to connect with mongodb database below is the command for the same. I have create a user for a week just to read the database for the evaluation.

```shell
export MONGODB_URI='mongodb+srv://pesto_tech:Wkria8SOvcGsgoTW@todo-clustor.skwuw4o.mongodb.net/'
```

It is easy right ? :smiley:
Now the only last steps which is pending is just to turn up the backend Flask server by running below command

```shell
flask run
```

I am attaching the postman collection as well here in the project only so you can also refer to that :innocent:
[Postman](../Task-management-collection.postman_collection.json)
