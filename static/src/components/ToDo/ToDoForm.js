import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const style = {
    formBody: {
        marginTop: 50,
        paddingBottom: 50,
        paddingTop: 25,
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
    },
    formTitle: { 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    error: {
        color: "red"
    }
};

export class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            name: '',
            description: '',
            list: null,
            disabled: true,
            errorText: '',
        }
    }

    handleChange(value) {
        return e => this.changeValue(e, value)
    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state);
    }

    componentWillReceiveProps(nextProps) {
        const list = nextProps.todoLists[0];
        this.setState({list});
    }

    getChangeListHandler() {
        return (e, idx, value) => {
            const list = this.props.todoLists.filter(todoList => todoList.name === value)[0]
            this.setState({list})
        }
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.submit(e);
        }
    }

    submit(e) {
        e.preventDefault();
        if (this.state.name === '' || this.state.description === '') {
            this.setState({errorText: 'Name and description must not be empty'})
        } else {
            this.setState({errorText: ''})
            this.props.upsertToDo(this.state.id, this.state.name, this.state.description, this.state.list.id);
        }
    }

    render() {
        return (
            <div className="col-md-12" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper style={style.formBody}>
                    <div className="text-center">
                        <div style={style.formTitle}>
                            <h3>Add a new</h3>
                            <DropDownMenu 
                                    value={this.state.list ? this.state.list.name : ''}
                                    onChange={this.getChangeListHandler()}>
                                    { this.props.todoLists.map(todoList => (
                                        <MenuItem key={todoList.id} value={todoList.name} primaryText={todoList.name} />
                                    ))}
                            </DropDownMenu>
                            <h3>item:</h3>
                        </div>
                        <div className="col-md-12">
                            <TextField
                                hintText="Title"
                                floatingLabelText="Title"
                                onChange={this.handleChange('name')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                                hintText="Description"
                                floatingLabelText="Description"
                                onChange={this.handleChange('description')}
                            />
                        </div>
                        <div className="col-md-12">
                            <small style={style.error}>{this.state.errorText}</small>
                        </div>
                        <RaisedButton
                            style={{ marginTop: 50 }}
                            label="Submit"
                            onClick={(e) => this.submit(e)}
                        />
                    </div>
                </Paper>

            </div>
        );
    }
}
