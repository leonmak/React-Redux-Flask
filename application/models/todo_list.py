from index import db
from application.models.todo import ToDoModel

class ToDoListModel(db.Model):
    __tablename__ = 'todolists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    todos = db.relationship('ToDoModel', lazy='dynamic')

    def __init__(self, name):
        self.name = name

    def json(self):
        return {'name': self.name, 'todos': [item.json() for item in self.todos.all()]}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        ToDoModel.delete_by_list_id(self.id)
        db.session.commit()
