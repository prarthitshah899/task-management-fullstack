from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource
from dotenv import load_dotenv
from pymongo import MongoClient
from helper import checkEmailValidation
import os
from uuid import uuid1
from flask import request

# Initialize Flask app
app = Flask(__name__)
CORS(app)
task_api = Api(app)

# loaded environment file
load_dotenv()

# Initialize Mongodb URI
MONGODB_URI = os.environ["MONGODB_URI"]

# Initialize the client in mongo and get the Database name
client = MongoClient(MONGODB_URI)
database = client["Pesto_tech"]


class TasksListCreate(Resource):
    ############################## Get All Task #############################
    def get(self):
        tasks = database.Tasks.find({})
        if not tasks:
            return {"message": "Tasks data is not found"}, 404

        return {"message": "Tasks fetched successfully", "data": list(tasks)}, 200

    ############################## Create Task #############################
    def post(self):
        _id = str(uuid1().hex)

        content = dict(request.json)
        if not content:
            return {"message": "Bad request. Please enter valid data"}, 400

        content.update({"_id": _id})

        # Added checks for title and status
        if not content.get("title", ""):
            return {"message": "Bad request. Please enter title for task"}, 400

        if content.get("status", "") not in (
            "To Do",
            "In Progress",
            "Done",
        ):
            return {
                "message": "Bad request. Please enter valid status for task - ('To Do','In Progress','Done')"
            }, 400

        result = database.Tasks.insert_one(content)
        if not result.inserted_id:
            return {"message": "Failed to insert"}, 500

        # task = database.Tasks.find({"_id": result.inserted_id})
        tasks = database.Tasks.find({})
        return {"message": "Task Inserted Successfully", "data": list(tasks)}, 200


class TasksRetrieveUpdateDelete(Resource):
    ############################## Get Single Task #############################
    def get(self, _id):
        query = {"_id": _id}
        task = database.Tasks.find_one(query)

        if not task:
            return {"message": "Task data is not found"}, 404

        return {"message": "Successfully fetched data", "data": task}, 200

    ############################## Update Single Task #############################
    def put(self, _id):
        query = {"_id": _id}
        content = {"$set": dict(request.json)}
        if content and query:
            # Added checks for title and status
            if not content.get("$set", dict()).get("title", ""):
                return {"message": "Bad request. Please enter title for task"}, 400

            if content.get("$set", dict()).get("status", "") not in (
                "To Do",
                "In Progress",
                "Done",
            ):
                return {
                    "message": "Bad request. Please enter valid status for task - ('To Do','In Progress','Done')"
                }, 400

            result = database.Tasks.update_one(query, content)

            if not result.matched_count:
                return {"message": "Failed to update. Record is not found"}, 409

            if not result.modified_count:
                return {"message": "No changes applied"}, 500
        else:
            return {
                "message": "No changes applied! Current and Requested both the objects are the same"
            }, 405

        tasks = database.Tasks.find({})
        return {"message": "Task Updated successfully", "data": list(tasks)}, 200

    ############################## Delete Single Task #############################
    def delete(self, _id):
        query = {"_id": _id}
        result = database.Tasks.delete_one(query)
        tasks = database.Tasks.find({})

        if not result.deleted_count:
            return {"message": "Task data is not found!"}, 500

        if not tasks:
            return {"message": "Tasks data is not found"}, 404

        return {"message": "Task Deleted successfully", "data": list(tasks)}, 200


class Register(Resource):
    ############################## Create Users #############################
    def post(self):
        email = request.json.get("email", "")
        password = request.json.get("password", "")

        if not email:
            return {"message": "Bad request. Please Enter email address"}, 400

        if not checkEmailValidation(email):
            return {"message": "Bad request. Please Enter valid email"}, 400

        if not password:
            return {"message": "Bad request. Please Enter password"}, 400

        if not len(password) >= 8:
            return {"message": "Bad request. Enter password with 8 character"}, 400

        # Check if the username already exists
        if database.Users.find_one({"username": email}):
            return {"message": "Username already exists. Choose a different one."}, 400
        else:
            database.Users.insert_one({"username": email, "password": password})

        return {"message": "Registration successful. You can now log in."}, 200


class Login(Resource):
    ############################## Check Login For Users #############################
    def post(self):
        email = request.json.get("email", "")
        password = request.json.get("password", "")

        if not email:
            return {"message": "Bad request. Please Enter email address"}, 400

        if not checkEmailValidation(email):
            return {"message": "Bad request. Please Enter valid email"}, 400

        if not password:
            return {"message": "Bad request. Please Enter password"}, 400

        if not len(password) >= 8:
            return {"message": "Bad request. Enter password with 8 character"}, 400

        # Check if the username and password match
        user = database.Users.find_one({"username": email, "password": password})
        if not user:
            return {"message": "Invalid username or password. Please try again."}

        return {"message": "Logged in Successfully"}, 200


# Initialize Endpoints
task_api.add_resource(TasksListCreate, "/tasks")
task_api.add_resource(TasksRetrieveUpdateDelete, "/tasks/<_id>")
task_api.add_resource(Register, "/register")
task_api.add_resource(Login, "/login")


if __name__ == "__main__":
    app.run(port=8887, debug=True)
