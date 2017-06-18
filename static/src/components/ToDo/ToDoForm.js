import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

export class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: -1,
            name: '',
            description: '',
            listId: 1,
            name_error_text: null,
            description_error_text: null,
        }
    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state);
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.submit(e);
        }
    }

    submit(e) {
        e.preventDefault();
        this.props.upsertToDo(this.state.id, this.state.name, this.state.description, this.state.listId);
    }

    render() {
        return (
            <div className="col-md-12" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper style={style}>
                    <div className="text-center">
                        <h2>Add a new to do item:</h2>
                        <div className="col-md-12">
                            <TextField
                              hintText="Title"
                              floatingLabelText="Title"
                              onChange={(e) => this.changeValue(e, 'name')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                              hintText="Description"
                              floatingLabelText="Description"
                              onChange={(e) => this.changeValue(e, 'description')}
                            />
                        </div>

                        <RaisedButton
                          disabled={this.state.disabled}
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
