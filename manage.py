from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from application.app import app, db
from application.models.todo_list import ToDoListModel

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()
    db.session.add(ToDoListModel('To Do'))
    db.session.add(ToDoListModel('Pending'))
    db.session.add(ToDoListModel('Done'))
    db.session.commit()

if __name__ == '__main__':
    manager.run()
