import React from 'react';
import { List, ListItem } from 'material-ui/List';

export const ToDoLists = (props) => (
    <div className="col-md-12">
    { props.data && props.data.map((toDoList, idx) => (
        <ToDoList key={idx} toDoList={toDoList} destroyToDo={props.destroyToDo} />
    ))}
    </div>
)

const ToDoList = (props) => (
    <div className="col-md-4">
    <h1>{ props.toDoList.name }</h1>
    <List>
    { props.toDoList.todos.map((todo, idx) => (
        <ListItem key={idx}
            primaryText={todo.name}
            secondaryText={todo.description}
            onClick={() => props.destroyToDo(todo.id)} 
        />  
    ))}
    </List>
    </div>
)
