import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToDoForm } from './ToDoForm'
import { ToDoLists } from './ToDoLists'

import * as actionCreators from '../../actions/todo';

function mapStateToProps(state) {
    return {
        todoLists: state.todoList.data,
        loaded: state.todoList.loaded,
        isFetching: state.todoList.isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class ToDo extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.fetchToDoLists();
    }

    render() {
        return (
            <div>
            <div className="col-md-8">
                <ToDoLists
                    isFetching={this.props.isFetching} 
                    loaded={this.props.loaded} 
                    todoLists={this.props.todoLists}
                    deleteToDo={this.props.deleteToDo}
                />
            </div>
            <div className="col-md-4">
                <ToDoForm
                    todoLists={this.props.todoLists}
                    upsertToDo={this.props.upsertToDo} 
                />
            </div>
            </div>
        );
    }
}

export default ToDo;
