from index import db

class ToDoModel(db.Model):
    __tablename__ = 'todos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    description = db.Column(db.String(150))

    list_id = db.Column(db.Integer, db.ForeignKey('todolists.id'))
    todo_list = db.relationship('ToDoListModel')

    def __init__(self, name, description, list_id):
        self.name = name
        self.description = description
        self.list_id = list_id

    def json(self):
        return {
            'id': self.id,
            'name': self.name, 
            'description': self.description,
            'listId': self.list_id
        }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.get(_id)

    @classmethod
    def delete_by_list_id(cls, _id):
        cls.query.filter_by(list_id=_id).delete()
        db.session.commit()
        
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
