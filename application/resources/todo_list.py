from flask_restful import Resource, reqparse
from application.models.todo_list import ToDoListModel
from application.models.todo import ToDoModel

class ToDoList(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', 
        required=True,
        help="To Do list needs a name!"
    )

    def get(self, name):
        if (name == 'lists'):
            return {'data': list(map(lambda x: x.json(), ToDoListModel.query.all()))}
        else:
            return {'data': ToDoListModel.find_by_name(name)}

    def post(self, name):
        data = ToDoList.parser.parse_args()

        if ToDoListModel.find_by_name(data.name):
            return {'message': 'ToDoList {} already exists'.format(data.name)}, 400

        todo_list = ToDoListModel(data.name)
        try:
            todo_list.save_to_db()
        except:
            return {'message': 'Saving list:{} error.'.format(data.name)}, 500

        return todo_list.json(), 201

    def put(self, name):
        data = ToDoList.parser.parse_args()

        todo_list = ToDoListModel.find_by_name(name)

        if todo_list:
            todo_list.name = todo_list.name
        else:
            todo_list = ToDoModel(name)
        
        todo_list.save_to_db()

        return todo_list.json()


    def delete(self, name):
        todo_list = ToDoListModel.find_by_name(name)
        if todo_list:
            todo_list.delete_from_db()

        return {'message': 'To do list deleted'}
