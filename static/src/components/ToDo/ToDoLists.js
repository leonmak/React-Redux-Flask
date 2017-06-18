import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';

export const ToDoLists = (props) => (
    <div className="col-md-12">
    { props.todoLists && props.todoLists.map((todoList, idx) => (
        <ToDoList key={idx} todoList={todoList} deleteToDo={props.deleteToDo} />
    ))}
    </div>
)

const ToDoList = (props) => (
    <div className="col-md-4">
    <h1>{ props.todoList.name }</h1>
    <List>
    <Paper>
    { props.todoList.todos.map((todo, idx) => (
        <ListItem key={idx}
            primaryText={todo.name}
            secondaryText={todo.description}
            onClick={() => props.deleteToDo(todo.id)} 
        />
    ))}
    </Paper>
    </List>
    </div>
)
