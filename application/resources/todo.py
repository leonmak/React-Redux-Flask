from flask_restful import Resource, reqparse
from application.models.todo import ToDoModel

class ToDo(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', 
        required=True,
        help="ToDo needs a name!"
    )
    parser.add_argument('description',
        required=True,
        help="ToDo needs a description!"
    )
    parser.add_argument('list_id', 
        required=True,
        help="ToDo needs a list name!"
    )

    def get(self, _id):
        todo = ToDoModel.find_by_id(_id)
        return todo.json() if todo else {'message': 'ToDo not found.'}, 404

    def post(self, _id):
        data = ToDo.parser.parse_args()
        todo = ToDoModel(data['name'], data['description'], data['list_id'])
        try:
            todo.save_to_db()
        except:
            return {'message': 'An error occured inserting the todo'}, 500

        return todo.json(), 201

    def put(self, _id):
        data = ToDo.parser.parse_args()
        todo = ToDoModel.find_by_id(_id)

        if todo:
            todo.name = data.name
            todo.description = data.description
            todo.list_id = data.list_id
        else:
            todo = ToDoModel(data.name, data.description, data.list_id)
        
        todo.save_to_db()
        return todo.json()


    def delete(self, _id):
        todo = ToDoModel.find_by_id(_id)
        if todo:
            todo.delete_from_db()

        return {'message': 'To do deleted'}
